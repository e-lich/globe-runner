from backend import app, db
from flask import request, jsonify, session
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

    if len(users_arr) == 0:
        return ["No users found"]
    else:
        return users_arr

@app.route('/users/all', methods=['GET'])
def get_all_users():
    if "userID" not in session:
        return ["User not logged in"]

    if session["userType"] != "Admin":
        return ["User is not an admin"]
        
    users = db.session.query(User).all()
    
    return formattedReturn(users)