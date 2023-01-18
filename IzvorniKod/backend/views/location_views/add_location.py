from backend import app, db
from flask import session, request, jsonify, redirect
from backend.database.models import Card, Player
import base64
import json

@app.route('/api/locations/add/', methods=['POST', 'GET'])
def add_location():

    if "userID" not in session:
        redirect('/login')
    
    user_type = session["userType"]

    if user_type != "Player":
        return ["User is not an player"]

    user = db.session.query(Player.advanced).filter_by(userID=session["userID"]).first()
    if not user.advanced:
        return ["User is not an advanced player"]

    if request.method == 'POST':
        lat = request.form["lat"]
        long = request.form["long"]
        photo = request.files.get("photo")
        description = request.form["description"]
        title = request.form["title"]

        location = json.dumps({
            "longitude":long,
            "latitude":lat
        })

        photo_string = base64.b64encode(photo.read()).decode('utf-8')

        new_card = Card(cardLocation=location, locationPhoto=photo_string, description=description, title=title, \
            authorUserID=session["userID"], cardStatus="submitted")

        db.session.add(new_card)
        db.session.commit()

        return jsonify(success=True)
    else:
        return ["Invalid request method"]