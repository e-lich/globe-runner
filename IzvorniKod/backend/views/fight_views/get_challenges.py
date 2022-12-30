from backend import db, app
from flask import request, jsonify, session
from backend.database.models import Player, Challenge
from datetime import datetime
import json
from geopy.distance import distance

def get_distance(challenger, victim):
    challenger_location = json.loads(challenger.playerLocation)
    challenger_lat = challenger_location['latitude']
    challenger_lng = challenger_location['longitude']

    victim_location = json.loads(victim.playerLocation)
    victim_lat = victim_location['latitude']
    victim_lng = victim_location['longitude']

    victim_loc = (victim_lat, victim_lng)
    challenger_loc = (challenger_lat, challenger_lng)

    return distance(victim_loc, challenger_loc).m


@app.route('/fights/challenges', methods=['GET'])
def get_challenges(userID):
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player ":
        return ["Only players can be challenged"]

    if request.method == 'GET': 

        challenges = db.session.query(Challenge).filter(victimUserID=currentUserID).filter(challengeStatus="pending").all()

        formatted_challenges = []

        for challenge in challenges:

            formatted_challenges.append({
                "challengeID": challenge.challengeID,
                "challenger": challenge.challenger.username
            })

        return formatted_challenges

    else:
        return ["Invalid request method"]


@app.route('/fights/response', methods=['GET'])
def get_challenge_response():
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    currentUser = db.session.query(Player).filter(userID=currentUserID).first()

    if user_type != "Player":
        return ["Only players can challenge other players"]

    if request.method == 'GET': 

        challenge = db.session.query(Challenge).filter(challengerUserID=currentUserID).first()


        victim = db.session.query(Player).filter(userID=challenge.victimUserID).first()

        if challenge.challengeStatus == "pending" and get_distance(currentUser, victim) > 200:
            challenge.challengeStatus = "went_too_far"
            db.session.commit()

        result = {
                "challengeID": challenge.challengeID,
                "victim": challenge.victim.username,
                "challengeStatus": challenge.challengeStatus
                }

        if challenge.status != "pending":
            db.session.delete(challenge)
            db.session.commit()

        return result

    else:
        return ["Invalid request method"]
