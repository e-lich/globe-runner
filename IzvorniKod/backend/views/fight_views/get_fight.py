from backend import db, app
from backend.database.models import Fight, Card
from flask import request, jsonify, session
import json
from geopy.distance import distance

def calculate_surface(cardID1, cardID2, cardID3):
    card1 = db.session.query(Card).filter_by(cardID=cardID1).first()
    card2 = db.session.query(Card).filter_by(cardID=cardID2).first()
    card3 = db.session.query(Card).filter_by(cardID=cardID3).first()

    card1_location = (json.loads(card1.cardLocation)['latitude'], json.loads(card1.cardLocation)['longitude'])
    card2_location = (json.loads(card2.cardLocation)['latitude'], json.loads(card2.cardLocation)['longitude'])
    card3_location = (json.loads(card3.cardLocation)['latitude'], json.loads(card3.cardLocation)['longitude'])

    a = distance(card1_location, card2_location).m
    b = distance(card2_location, card3_location).m
    c = distance(card3_location, card1_location).m

    s = (a + b + c) / 2

    surface = (s * (s - a) * (s - b) * (s - c)) ** 0.5

    return surface

@app.route('/fight/result', methods=['GET'])
def get_fight():
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players can get fights"]

    if request.method == 'GET': 
        fight = db.session.query(Fight).filter(player1ID=currentUserID).filter(points1=None).filter(point2=None).first()
        if fight is None:
            fight = db.session.query(Fight).filter_by(player2ID=currentUserID).filter(points1=None).filter(point2=None).first()
            if fight is None:
                return ["No fight found"]
        
        if not fight.player1Ready or not fight.player2Ready:
            return ["Other player has not chosen cards yet"]

        player1_card1 = fight.cardID11
        player1_card2 = fight.cardID12
        player1_card3 = fight.cardID13

        player2_card1 = fight.cardID21
        player2_card2 = fight.cardID22
        player2_card3 = fight.cardID23

        fight.points1 = calculate_surface(player1_card1, player1_card2, player1_card3)
        fight.points2 = calculate_surface(player2_card1, player2_card2, player2_card3)

        if fight.points1 > fight.points2:
            winner = fight.player1UserID
        elif fight.points1 < fight.points2:
            winner = fight.player2UserID
        else:
            winner = None

        return jsonify({
            "points1": fight.points1,
            "points2": fight.points2,
            "winner": winner
            })

    else:
        return ["Invalid request method"]
