from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Challenge


@app.route('/fights/challenge/<userID>', methods=['POST', 'GET'])
def create_challenge(userID):
    if "userID" not in session:
        redirect('/login')
    
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