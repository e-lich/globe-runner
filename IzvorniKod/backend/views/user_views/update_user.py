from backend import app, db
from flask import session, request, jsonify, abort
from backend.database.models import Player, Cartographer
import base64

def update(userID):
    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        user = db.session.query(Cartographer).filter_by(userID=userID).first()
    if user is None:
        return abort(404, "User not found")

    if request.form.get('username') is not None:
        user.username = request.form['username']
    if request.form.get('password') is not None:
        user.password = request.form['password']
    if request.files.get('photo') is not None:
        user.profilePhoto =  base64.b64encode(request.files.get('photo').read()).decode('utf-8')

    db.session.commit()

    return jsonify(success=True)

@app.route('/api/users/update/<userID>', methods=['POST', 'GET'])
def update_user(userID):
    if "userID" not in session:
        return abort(403, "User not logged in")

    user_type = session["userType"]

    if user_type != "Admin":
        return abort(403, "User is not an admin")

    if request.method == 'POST':

        return update(userID)

    else:
        return abort(400, "Invalid request method")

@app.route('/api/users/update', methods=['POST', 'GET'])
def update_current_user():
    if "userID" not in session:
        return(['User not logged in'])
    currentUserID = session["userID"]

    if request.method == 'POST':

        return update(currentUserID)

    else:
        return ["Invalid request method"]

@app.route('/api/users/ban/<userID>', methods=['POST', 'GET'])
def ban_user(userID):
    if "userID" not in session:
        return(['User not logged in'])

    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]

    if request.method == 'POST':
        user = db.session.query(Player).filter_by(userID=userID).first()
        if user is None:
            user = db.session.query(Cartographer).filter_by(userID=userID).first()
        if user is None:
            return ["User not found"]

        if user.banned:
            user.banned = False
        else:
            user.banned = True

        db.session.commit()

        return jsonify(success=True)
    else:
        return ["Invalid request method"]

@app.route('/api/users/update-location', methods=['POST', 'GET'])
def update_user_location():
    if "userID" not in session:
        return ["User not logged in"]

    userID = session["userID"]
    
    request_data = request.get_json()
    lat = request_data['lat']
    lng = request_data['lng']

    if session["userType"] != "Player":
        return ["User is not a player"]

    user = db.session.query(Player).filter_by(userID=userID).first()
    user.playerLocation = "{" + f"\"latitude\": {lat}, \"longitude\": {lng}" + "}"
    db.session.commit()

    return jsonify(success=True)
