from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Cartographer

def formattedReturn(users):
    users_arr = []
    for user in users:
        users_arr.append({
            "userID": user.userID,
            "username": user.username,
            "email": user.email,
            "confirmed": user.confirmed,
            "userType": user.__class__.__name__
        })

    if len(users_arr) == 0:
        return ["No users found"]
    else:
        return users_arr

@app.route('/users/all', methods=['GET'])
def get_all_users():
    if "userID" not in session:
        redirect('/login')

    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]

    players = db.session.query(Player).all()
    cartographers = db.session.query(Cartographer).all()
    users = players + cartographers

    if len(users) == 0:
        return ["No users found"]
    else:
        return formattedReturn(users)