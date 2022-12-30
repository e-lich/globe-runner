from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Cartographer

def delete(userID):
    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        user = db.session.query(Cartographer).filter_by(userID=userID).first()
    if user is None:
        return ["User not found"]

    db.session.delete(user)
    db.session.commit()

    return jsonify(success=True)

## za admina
@app.route('/users/delete/<userID>', methods=['DELETE', 'GET'])
def delete_user(userID):
    if "userID" not in session:
        redirect('/login')

    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Admin" or currentUserID != userID:
        return ["Current user does not have the authority to delete this user"]

    if request.method == 'DELETE':
        return delete(userID)
    else:
        return ["Invalid request method"]

## za korisnika, brisanje vlastitog profila
@app.route('/users/delete', methods=['DELETE', 'GET'])
def delete_current_user():
    if "userID" not in session:
        redirect('/login')

    currentUserID = session["userID"]

    if request.method == 'DELETE':
        return delete(currentUserID)
    else:
        return ["Invalid request method"]
