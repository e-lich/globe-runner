from backend import app, db
from flask import request, jsonify
from backend.database.models import Player, Card
from geopy import distance

# vraca sve igrace koji su u blizini
@app.route('/getCloseByPlayers', methods=['POST', 'GET'])
def get_close_by_players():
    request_data = request.get_json()

    userID = request.form['userID']
    lat = request.form['lat']
    lng = request.form['lng']

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["User with this userID doesn't exist"]

    closeByPlayers = []

    for player in db.session.query(Player).all():
        if player.userID != userID:
            player_lat = player.playerLocation['latitude']
            player_lng = player.playerLocation['longitude']

            player1_loc = (lat, lng)
            player2_loc = (player_lat, player_lng)

            if distance.distance(player1_loc, player2_loc).km <= 50:
                closeByPlayer = jsonify({
                    'username': player.username,
                    'userId': player.userID,
                    'photo': player.profilePhoto,
                })
                closeByPlayers.append(closeByPlayer)

    return closeByPlayers

# vraca sve kartice u blizini
@app.route('/getCloseByLocations', methods=['POST'])
def get_close_by_locations():
    request_data = request.get_json()

    userID = request.form['userID']
    lat = request.form['lat']
    lng = request.form['lng']

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["User with this userID doesn't exist"]

    closeByLocations = []

    for card in db.session.query(Card).filter_by(cardStatus="verified").all():
        card_lat = card.cardLocation['latitude']
        card_lng = card.cardLocation['longitude']

        player_loc = (lat, lng)
        card_loc = (card_lat, card_lng)

        if distance.distance(player_loc, card_loc).km <= 50:
            closeByLocation = jsonify({
                'cardId': card.cardID,
                'photo': card.locationPhoto,
                'description': card.description,
                'latitude': card.cardLocation['latitude'],
                'longitude': card.cardLocation['longitude'],
                'title': card.title
            })
            closeByLocations.append(closeByLocation)

    return closeByLocations