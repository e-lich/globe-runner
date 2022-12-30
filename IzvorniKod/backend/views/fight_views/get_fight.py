from backend import db, app
from backend.database.models import Fight
from flask import request, jsonify, session

@app.route('/fight', methods=['GET'])
def get_fight():
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players can get fights"]

    if request.method == 'GET': 
        fight = db.session.query(Fight).filter_by(player1ID=currentUserID).first()
        if fight is None:
            fight = db.session.query(Fight).filter_by(player2ID=currentUserID).first()
            if fight is None:
                return ["No fight found"]
        
        return jsonify({
            "fightID": fight.fightID
        })

    else:
        return ["Invalid request method"]