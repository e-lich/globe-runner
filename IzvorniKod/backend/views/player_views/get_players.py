from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player
from geopy import distance
import json
from sqlalchemy import inspect

# vraca sve igrace koji su u blizini
@app.route('/players/close-by', methods=['GET'])
def get_close_by_players():

    if "userID" not in session:
        return(['User not logged in'])

    userID = session["userID"]

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["Player with this userID doesn't exist"] 

    user_location = json.loads(user.playerLocation)
    lat = user_location['latitude']
    lng = user_location['longitude']

    closeByPlayers = []

    for player in db.session.query(Player).filter(Player.userID!=userID).filter(Player.signedIn==True).all():
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

    if len(closeByPlayers) == 0:
        return ["No players found close by"]
    else:
        return closeByPlayers

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

@app.route('/players/info/<userID>', methods=['GET'])
def post_user_info(userID):
    user = db.session.query(Player).filter_by(userID=userID).first()

    if user is None:
        return ["User not found"]

    #vrati statistiku, popis kartica, rang na globalnoj ljestvici // NIJE IMPLEMENTIRANA STATISTIKA
    return object_as_dict(user)