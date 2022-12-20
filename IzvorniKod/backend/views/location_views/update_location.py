from backend import app, db
from flask import session, request, jsonify
from backend.database.models import Player

@app.route('/locations/update', methods=['GET'])
def update_user_location():
    if "userID" not in session:
        return ["User not logged in"]

    userID = session["userID"]
    
    request_data = request.get_json()
    lat = request_data['lat']
    lng = request_data['lng']

    if session["userType"] != "Player":
        return ["User is not a player"]

    user = db.session.query(Player).filter_by(userID=userID).first()
    user.playerLocation = "{" + f"\"latitude\": {lat}, \"longitude\": {lng}" + "}"
    db.session.commit()

    return jsonify(success=True)




