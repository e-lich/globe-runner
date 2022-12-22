from backend import app, db
from flask import request, jsonify, session
from backend.database.models import Player, Cartographer

@app.route('/users/delete/<userID>', methods=['DELETE', 'GET'])
def delete_user(userID):
    if "userID" not in session:
        return ["User not logged in"]

    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]

    if request.method == 'DELETE':
        user = db.session.query(Player).filter_by(userID=userID).first()
        if user is None:
            user = db.session.query(Cartographer).filter_by(userID=userID).first()
        if user is None:
            return ["User not found"]

        db.session.delete(user)
        db.session.commit()

        return jsonify(success=True)
    else:
        return ["Invalid request method"]