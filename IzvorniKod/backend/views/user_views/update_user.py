from backend import app, db
from flask import session, request, jsonify
from backend.database.models import Player, Cartographer
import base64


@app.route('/users/update/<userID>', methods=['POST', 'GET'])
def update_user(userID):
    if "userID" not in session:
        return ["User not logged in"]

    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]

    if request.method == 'POST':
        user = db.session.query(Player).filter_by(userID=userID).first()
        if user is None:
            user = db.session.query(Cartographer).filter_by(userID=userID).first()
        if user is None:
            return ["User not found"]
    
        if request.form.get('username') is not None:
            user.username = request.form['username']
        if request.form.get('password') is not None:
            user.email = request.form['password']
        if request.form.get('photo') is not None:
            user.profilePhoto =  base64.b64encode(request.files.get('photo').read()).decode('utf-8')

        db.session.commit()

        return jsonify(success=True)
    else:
        return ["Invalid request method"]

@app.route('/users/ban/<userID>', methods=['POST', 'GET'])
def ban_user(userID):
    if "userID" not in session:
        return ["User not logged in"]

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
