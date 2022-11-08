from backend import app, db
from flask import request, jsonify
from backend.models import Player, Cartographer

@app.route('/signIn', methods=['POST'])
def login():
    request_data = request.get_json()

    # checking if email or username was entered
    if '@' in request_data['username_or_email']:
        email = request_data['username_or_email']

        user = db.session.query(Player).filter_by(email=email).first()
        if user is None:
            user = db.session.query(Cartographer).filter_by(email=email).first()
    else:
        username = request_data['username_or_email']
        
        user = db.session.query(Player).filter_by(username=username).first()
        if user is None:
            user = db.session.query(Cartographer).filter_by(username=username).first()

    if user is None:
        return jsonify({
            'result': 'not found'
        })
    elif user.password != request_data['password']:
        return jsonify({
            'result': 'incorrect password'
        })
    else:
        # login user ??
        return jsonify({
            'result': 'succeded'
        })
