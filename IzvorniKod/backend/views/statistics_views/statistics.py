from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Fight
from geopy import distance
import json
from sqlalchemy import inspect

@app.route('/stats/leaderboard', methods=['GET'])
def get_leaderboard_stats():
    num_of_players = db.session.query(Player).count()
    num_of_fights = db.session.query(Fight).count()

    topPlayers = db.session.query(Player).order_by(Player.eloScore.desc()).limit(15)
    topPlayersArray = [{"userID":player.userID, "eloScore":player.eloScore, "username":player.username} for player in topPlayers]    

    return jsonify({
        "topPlayers": topPlayersArray,
        "numberOfPlayers": num_of_players,
        "numberOfFights": num_of_fights
    })

@app.route('/stats/global-match', methods=['GET'])
def get_matches_stats():
    return ['Request not implemented']

@app.route('/stats/collected-locations', methods=['GET'])
def get_collected_locations_stats():
    return ['Request not implemented']

@app.route('/users/stats', methods=['GET'])
def get_user_stats():
    return ['Request not implemented']