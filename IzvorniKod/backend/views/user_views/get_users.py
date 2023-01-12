from backend import app, db
from flask import request, jsonify, session, redirect
from backend.database.models import Player, Cartographer, Inventory
from backend.views.player_views.get_players import object_as_dict

def formattedReturn(users):
    users_arr = []
    for user in users:
        users_arr.append({
            "userID": user.userID,
            "username": user.username,
            "email": user.email,
            "confirmed": user.confirmed,
            "userType": user.__class__.__name__,
            "profilePhoto": user.profilePhoto,
            "banned": user.banned
        })

    if len(users_arr) == 0:
        return ["No users found"]
    else:
        return users_arr

@app.route('/users/all', methods=['GET'])
def get_all_users():
    if "userID" not in session:
        return(['User not logged in'])

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

@app.route('/user/current', methods=['GET'])
def current_user_info():
    if "userID" not in session:
        return ['User not logged in']

    userID = session['userID']

    model = Player
    if session['userType'] == 'Cartographer':
        model = Cartographer
    user = db.session.query(model).filter_by(userID=session['userID']).first()

    if user is None:
        return ["User not found"]

    retVal = object_as_dict(user)
    retVal["numOfCards"] = db.session.query(Inventory).filter_by(userID=userID).count()
    retVal["userType"] = session['userType']
    retVal.pop("password")

    return retVal