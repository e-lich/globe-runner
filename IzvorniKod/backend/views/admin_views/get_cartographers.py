from backend import app, db
from flask import session, redirect
from backend.database.models import Card, Player, Cartographer, Inventory
import json
from geopy import distance

@app.route('/cartographers/unverified', methods=['GET'])
def get_unverified_cartographers():
    if "userID" not in session:
        return(['Admin not logged in'])

    adminID = session["userID"]
    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]
    
    cartographers = db.session.query(Cartographer).filter_by(verified=False).all()

    cartographers_list = []

    for cartographer in cartographers:
        cartographers_list.append({
            "username": cartographer.username,
            "userID": cartographer.userID,
            "name": cartographer.name,
            "email": cartographer.email,
            "photo": cartographer.profilePhoto
        })
    
    return cartographers_list