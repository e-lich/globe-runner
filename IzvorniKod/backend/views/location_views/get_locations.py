from backend import app, db
from flask import request, jsonify
from backend.database.models import Card
import json

def formattedReturn(locations):
    locations_arr = []
    for location in locations:
        locations_arr.append({
            "cardID":location.cardID,
            "cardStatus":location.cardStatus,
            "latitude":json.loads(location.cardLocation).get("latitude"),
            "longitude":json.loads(location.cardLocation).get("longitude"),
            "locationPhoto":location.locationPhoto,
            "description":location.description,
            "title":location.title
        })

    return locations_arr

@app.route('/getUserSubmittedLocations', methods=['POST', 'GET'])
def get_user_submitted_locations():
    userID = request.get_json()['userID']

    locations = db.session.query(Card).filter_by(authorUserID=userID, cardStatus="submitted").all()
    
    return formattedReturn(locations)
 
@app.route('/getUserAcceptedLocations', methods=['POST', 'GET'])
def get_user_accepted_locations():
    userID = request.get_json()['userID']

    locations = db.session.query(Card).filter_by(authorUserID=userID, cardStatus="unclaimed").all()
    
    return formattedReturn(locations)
 
@app.route('/getAllSubmittedLocations', methods=['POST', 'GET'])
def get_all_submitted_locations():
    locations = db.session.query(Card).filter_by(cardStatus="submitted").all()
    
    return formattedReturn(locations)

@app.route('/getCartographerAcceptedLocations', methods=['POST', 'GET'])
def get_cartographer_accepted_locations():
    cartographerID = request.get_json()['cartographerID']

    locations = db.session.query(Card).filter_by(approvedByUserID=cartographerID, cardStatus="claimed").all()
    
    return formattedReturn(locations)
 
@app.route('/getOnSiteCheckLocations', methods=['POST', 'GET'])
def get_on_site_check_locations():
    cartographerID = request.get_json()['cartographerID']

    locations = db.session.query(Card).filter_by(approvedByUserID=cartographerID, cardStatus="verified")
    
    return formattedReturn(locations)