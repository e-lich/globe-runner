from backend import db, app
from backend.database.models import Fight, Card, Inventory, Player
from flask import request, jsonify, session, abort
import json
from geopy.distance import distance

def probabilty_playerA_wins(playerB_elo, playerA_elo):
    return 1 / (1 + 10 ** ((playerB_elo - playerA_elo) / 400))

def calculate_new_elo(playerA_elo, playerB_elo, playerA_wins):
    k = 32
    
    if playerA_wins == None:
        win_coef = 0.5
    elif playerA_wins:
        win_coef = 1
    else:
        win_coef = 0

    playerA_new_elo = playerA_elo + k * (win_coef - probabilty_playerA_wins(playerB_elo, playerA_elo))
    return playerA_new_elo


def calculate_surface(card1, card2, card3):

    card1_location = (json.loads(card1.cardLocation)['latitude'], json.loads(card1.cardLocation)['longitude'])
    card2_location = (json.loads(card2.cardLocation)['latitude'], json.loads(card2.cardLocation)['longitude'])
    card3_location = (json.loads(card3.cardLocation)['latitude'], json.loads(card3.cardLocation)['longitude'])

    a = distance(card1_location, card2_location).m
    b = distance(card2_location, card3_location).m
    c = distance(card3_location, card1_location).m

    s = (a + b + c) / 2

    surface = (s * (s - a) * (s - b) * (s - c)) ** 0.5

    return surface

def calculate_strength_factor(card1, card2, card3):

    card1_strength = card1.cardStrength
    card2_strength = card2.cardStrength
    card3_strength = card3.cardStrength

    strength_factor = (card1_strength + card2_strength + card3_strength) / 3

    return strength_factor / 10

@app.route('/fight/result', methods=['GET'])
def get_fight():
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players can get fights"]

    if request.method == 'GET': 
        fight = db.session.query(Fight).filter_by(player1UserID=currentUserID).filter_by(points1=None).filter_by(points2=None).first()
        current_player1 = True
        if fight is None:
            fight = db.session.query(Fight).filter_by(player2UserID=currentUserID).filter_by(points1=None).filter_by(points2=None).first()
            current_player1 = False
            if fight is None:
                return abort("No fight found", 404)
        
        if not fight.player1Ready or not fight.player2Ready:
            return ["Other player has not chosen cards yet"]

        if current_player1:
            current_player = db.session.query(Player).filter_by(playerID=fight.player1UserID).first()
            other_player = db.session.query(Player).filter_by(playerID=fight.player2UserID).first()
        else:
            current_player = db.session.query(Player).filter_by(playerID=fight.player2UserID).first()
            other_player = db.session.query(Player).filter_by(playerID=fight.player1UserID).first()

        player1_card1 = db.session.query(Card).filter_by(cardID=fight.cardID11).first()
        player1_card2 = db.session.query(Card).filter_by(cardID=fight.cardID12).first()
        player1_card3 = db.session.query(Card).filter_by(cardID=fight.cardID13).first()

        player2_card1 = db.session.query(Card).filter_by(cardID=fight.cardID21).first()
        player2_card2 = db.session.query(Card).filter_by(cardID=fight.cardID22).first()
        player2_card3 = db.session.query(Card).filter_by(cardID=fight.cardID23).first()

        fight.points1 = calculate_surface(player1_card1, player1_card2, player1_card3) * calculate_strength_factor(player1_card1, player1_card2, player1_card3)
        fight.points2 = calculate_surface(player2_card1, player2_card2, player2_card3) * calculate_strength_factor(player2_card1, player2_card2, player2_card3)

        # breaking cards
        if current_player1:
            cards = [player1_card1, player1_card2, player1_card3]
        else:
            cards = [player2_card1, player2_card2, player2_card3]

        broken_cards = []

        for card in cards:
            card.cardStrength -= 1
            if card.cardStrength == 0:
                inventory = db.session.query(Inventory).filter_by(cardID=card.cardID).filter_by(userID=currentUserID).first()
                db.session.delete(inventory)
                broken_cards.append(card.cardID)

        # check if player is still challangeable
        number_of_owned_cards = db.session.query(Inventory).filter_by(userID=currentUserID).count()
        if number_of_owned_cards < 3:
            current_player.challengeable = False

        db.session.commit()

        winner = None

        if current_player1:
            winner = fight.points1 > fight.points2
        else:
            winner = fight.points2 > fight.points1

        return jsonify({
            "points1": fight.points1,
            "points2": fight.points2,
            "winner": winner,
            "brokenCards": broken_cards,
            "newElo": calculate_new_elo(current_player.eloScore, other_player.eloScore, winner)
            })

    else:
        return ["Invalid request method"]
