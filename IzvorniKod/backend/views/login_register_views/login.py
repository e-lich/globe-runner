from backend import app, db
from flask import request, jsonify, redirect, session
from backend.database.models import Player, Cartographer, Admin

@app.route('/login', methods=['POST', 'GET'])
def login():

    if request.method == 'POST':
        request_data = request.get_json()

        # checking if email or username was entered
        if '@' in request_data['username_or_email']:
            email = request_data['username_or_email']

            user = db.session.query(Player).filter_by(email=email).first()
            
            if user is None:
                user = db.session.query(Cartographer).filter_by(email=email).first()
            if user is None:
                user = db.session.query(Admin).filter_by(email=email).first()
        else:
            username = request_data['username_or_email']
        
            user = db.session.query(Player).filter_by(username=username).first()

            if user is None:
                user = db.session.query(Cartographer).filter_by(username=username).first()
            if user is None:
                user = db.session.query(Admin).filter_by(username=username).first()

        errors = []
        if user is None:
            errors.append("User not found")
            return errors
        elif user.password != request_data['password']:
            errors.append("Incorrect password")
            return errors
        elif type(user) != Admin and user.signedIn:
            errors.append("User can't be signed in on two locations.")
            return errors
        elif type(user) != Admin and not user.confirmed:
            errors.append("Email not confirmed")
            return errors
        elif type(user) == Cartographer and user.verifiedStatus == "unverified":
            errors.append("Cartographer not verified yet.")
            return errors
        elif type(user) == Cartographer and user.verifiedStatus == "rejected":
            errors.append("Cartographer has been rejected.")
            return errors
        else:
            if type(user) == Admin:
                photo = None
                session['userID'] = user.adminID
            else:
                photo = user.profilePhoto
                session['userID'] = user.userID
            
            session['userType'] = user.__class__.__name__
            user_type = session['userType']

            if user_type == 'Player':
                user.deleteChallenges()

            if session['userType'] == 'Player' and user.advanced:
                user_type = 'advancedPlayer'

            user.signedIn = True
            db.session.commit()

            return jsonify({
                'username': user.username,
                'email': user.email,
                'photo': photo,
                'userID': session['userID'],
                'userType': user_type
            })
    else:
        return ['Invalid request method']