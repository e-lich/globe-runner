from backend import db, app
from flask import request, jsonify, session
from backend.database.models import Challenge

@app.route('/fight/challenges/delete', methods=['DELETE', 'GET'])
def delete_challenge():
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players can delete challenges"]

    if request.method == 'POST':
        db.session.query(Challenge).filter_by(challengerUserID=currentUserID).delete()
        db.session.commit()
        return jsonify(success=True)
    else:
        return ["Invalid request method"]