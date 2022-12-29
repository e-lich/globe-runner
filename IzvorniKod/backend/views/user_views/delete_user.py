from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Cartographer

@app.route('/users/delete/<userID>', methods=['DELETE', 'GET'])
def delete_user(currentUserID):
    if "userID" not in session:
        redirect('/login')

    user_type = session["userType"]
    userID = session["userID"]

    if user_type != "Admin" or userID != currentUserID:
        return ["Current user does not have the authority to delete this user"]

    if request.method == 'DELETE':
        user = db.session.query(Player).filter_by(userID=currentUserID).first()
        if user is None:
            user = db.session.query(Cartographer).filter_by(userID=currentUserID).first()
        if user is None:
            return ["User not found"]

        db.session.delete(user)
        db.session.commit()

        return jsonify(success=True)
    else:
        return ["Invalid request method"]