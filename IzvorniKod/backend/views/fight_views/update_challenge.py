from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Challenge


@app.route('/fights/challenges/<userID>', methods=['POST', 'GET'])
def create_challenge(userID):
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players challenge other players"]

    if request.method == 'POST':

        challenge = Challenge(currentUserID, userID)

        db.session.add(challenge)
        db.session.commit()
    
    else:
        return ["Invalid request method"]

@app.route('/fights/challenges/response/<challengeID>', methods=['POST', 'GET'])
def respond_to_challenge(challengeID):
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players can respond to challenges"]

    if request.method == 'POST': 

        request_data = request.get_json()
        response = request_data['response']

        challenge = db.session.query(Challenge).filter(challengeID=challengeID).filter(victimUserID=currentUserID).first()
        if challenge is None:
            return ["Challenge not found"]

        if response == "accept":
            challenge.challengeStatus = "accepted"
        elif response == "decline":
            challenge.challengeStatus = "declined"
        else:
            return ["Invalid response"]

        db.session.commit()

        return jsonify(success=True)
    
    else:
        return ["Invalid request method"]