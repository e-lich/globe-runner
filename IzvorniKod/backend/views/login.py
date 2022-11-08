from backend import app, db
from flask import request, jsonify
from backend.models import User

@app.route('/signIn', methods=['POST'])
def login():
    user = db.session.query(User).filter_by(email=request.form['email']).first()
    if user is None:
        return jsonify({
            'result': 'not found'
        })
    elif user.password != request.form['password']:
        return jsonify({
            'result': 'incorrect password'
        })
    else:
        # login user ??
        return jsonify({
            'result': 'succeded'
        })
