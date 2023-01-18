from backend import db, app
from flask import request, jsonify, session
from backend.database.models import Fight

@app.route('/api/fight/delete', methods=['DELETE', 'GET'])
def delete_fight():
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players can delete fights"]

    if request.method == 'DELETE':
        fight = db.session.query(Fight).filter_by(player1UserID=currentUserID).first()
        if fight is None:
            fight = db.session.query(Fight).filter_by(player2UserID=currentUserID).first()
            if fight is None:
                return ["No fight found"]

        db.session.delete(fight)
        db.session.commit()
        return jsonify(success=True)
    else:
        return ["Invalid request method"]