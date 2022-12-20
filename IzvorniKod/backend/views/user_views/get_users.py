from backend import app, db
from flask import request, jsonify
from backend.database.models import User

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

    return users_arr

@app.route('/users/all', methods=['GET'])
def get_all_users():

    users = db.session.query(User).all()
    
    return formattedReturn(users)