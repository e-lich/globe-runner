from backend import app, db
from flask import request, jsonify, redirect
from backend.database.models import Player, Cartographer, Admin, User

# dummy rjesenje za rjesiti nedostatak GET metode
@app.route('/updateUserLocation', methods=['GET'])
def hello():
    return

@app.route('/updateUserLocation', methods=['POST'])
def login():
    request_data = request.get_json()

    userID = request.form['userID']
    lat = request.form['lat']
    lng = request.form['lng']

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["User with this userID doesn't exist"]

    user.playerLocation = "{" + f"'latitude':{lat}, 'longitude':{lng}" + "}"
    db.session.commit()




