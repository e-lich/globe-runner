from backend import app, db
from flask import request, jsonify, redirect, session
from backend.database.models import Player, Cartographer, Admin

@app.route('/api/logout', methods=['POST', 'GET'])
def logout():
    if "userID" not in session:
        return(['User not logged in'])
    
    user = None
    user_type = session['userType']
    userID = session['userID']

    if user_type == 'Player':
        user = db.session.query(Player).filter_by(userID=userID).first()
        user.deleteChallenges()
    elif user_type == 'Cartographer':
        user = db.session.query(Cartographer).filter_by(userID=userID).first()
    elif user_type == 'Admin':
        user = db.session.query(Admin).filter_by(adminID=userID).first()
    
    if user is None:
        return ['User not found'] # ovo se nikad ne bi trebalo dogoditi, nadamo se da i nece xD
    
    user.signedIn = False
    db.session.commit()
    session.pop('userID', None)
    session.pop('userType', None)
    
    return jsonify(success=True)