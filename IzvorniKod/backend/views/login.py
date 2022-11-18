from backend import app, db
from flask import request, jsonify, redirect
from backend.models import Player, Cartographer, Admin

@app.route('/signIn', methods=['GET'])
def hello():
    return "Hello!"

@app.route('/signIn', methods=['POST'])
def login():
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
    elif type(user) != Admin and not user.confirmed:
        errors.append("Email not confirmed")
        return errors
    else:
        return jsonify({
            'username': user.username,
            'email': user.email,
            'photo': user.profilePhoto
        })
