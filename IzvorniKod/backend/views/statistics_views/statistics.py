from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Fight
from geopy import distance
import json
from sqlalchemy import or_, and_

@app.route('/stats/leaderboard', methods=['GET'])
def get_leaderboard_stats():
    num_of_players = db.session.query(Player).count()
    num_of_fights = db.session.query(Fight).count()

    topPlayers = db.session.query(Player).order_by(Player.eloScore.desc()).limit(10)
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
    

    if 'userID' not in session:
        return ["User not logged in."]

    userID = session['userID']

    if session['userType'] != "Player" and session['userType'] != "advancedPlayer":
        return ["Only players can get stats"]

    count = 1
    players_ordered = db.session.query(Player).order_by(Player.eloScore.desc())

    for player in players_ordered:
        if player.userID == session['userID']:
            break

        count += 1

    wonClause = or_(and_(Fight.player1UserID==userID, Fight.points1 > Fight.points2),\
                    and_(Fight.player2UserID==userID, Fight.points2 > Fight.points1))

    lostClause = or_(and_(Fight.player1UserID==userID, Fight.points2 > Fight.points1),\
                     and_(Fight.player2UserID==userID, Fight.points1 > Fight.points2))

    fightsWon = db.session.query(Fight).filter(and_(Fight.points1!=0, Fight.points2!=0))\
        .filter(wonClause).count()

    fightsLost = db.session.query(Fight).filter(and_(Fight.points1!=0, Fight.points2!=0))\
        .filter(lostClause).count()

    fightsNum = db.session.query(Fight).filter(and_(Fight.points1!=0, Fight.points2!=0)).count()

    return jsonify({
        "fightsNum": fightsNum,
        "fightsWon": fightsWon,
        "fightsLost": fightsLost,
        "rank": count
    })