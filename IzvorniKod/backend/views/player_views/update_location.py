from backend import app, db
from flask import request, jsonify, redirect
from backend.database.models import Player, Cartographer, Admin, User

# dummy rjesenje za rjesiti nedostatak GET metode
@app.route('/updateUserLocation', methods=['GET'])
def update_location_hello():
    return

@app.route('/updateUserLocation', methods=['POST'])
def update_user_location():
    request_data = request.get_json()

    userID = request_data['userID']
    lat = request_data['lat']
    lng = request_data['lng']

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["User with this userID doesn't exist"]

    user.playerLocation = "{" + f"\"latitude\": {lat}, \"longitude\": {lng}" + "}"
    db.session.commit()

    return ["Location updated successfully"]




