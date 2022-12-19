from backend import app, db
from flask import request, jsonify
from backend.database.models import Player, Card
from geopy import distance
import json

# vraca sve igrace koji su u blizini
@app.route('/getCloseByPlayers', methods=['POST', 'GET'])
def get_close_by_players():
    request_data = request.get_json()

    userID = request_data['userID']
    lat = request_data['lat']
    lng = request_data['lng']

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["User with this userID doesn't exist"]

    closeByPlayers = []

    for player in db.session.query(Player).all():
        if player.userID != userID:
            player_location = json.loads(player.playerLocation)
            player_lat = player_location['latitude']
            player_lng = player_location['longitude']

            player1_loc = (lat, lng)
            player2_loc = (player_lat, player_lng)

            if distance.distance(player1_loc, player2_loc).m <= 200:
                closeByPlayers.append({
                    'username': player.username,
                    'userId': player.userID,
                    'photo': player.profilePhoto,
                })

    return closeByPlayers

# vraca sve kartice u blizini
@app.route('/getCloseByLocations', methods=['POST', 'GET'])
def get_close_by_locations():
    request_data = request.get_json()

    userID = request_data['userID']
    lat = request_data['lat']
    lng = request_data['lng']

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["User with this userID doesn't exist"]

    closeByLocations = []

    for card in db.session.query(Card).filter_by(cardStatus="verified").all():
        card_location = json.loads(card.cardLocation)
        card_lat = card_location['latitude']
        card_lng = card_location['longitude']

        player_loc = (lat, lng)
        card_loc = (card_lat, card_lng)

        if distance.distance(player_loc, card_loc).km <= 2:
            closeByLocations.append({
                'cardId': card.cardID,
                'photo': card.locationPhoto,
                'description': card.description,
                'latitude': card_lat,
                'longitude': card_lng,
                'title': card.title
            })

    return closeByLocations