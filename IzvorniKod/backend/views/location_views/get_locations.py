from backend import app, db
from flask import request, jsonify
from backend.database.models import Card, Player, Cartographer, User
import json
from geopy import distance

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


@app.route('/locations/submitted', methods=['POST', 'GET'])
def get_submitted_locations():
    userID = request.get_json()["userID"]

    locations = []
    user = db.session.query(User).filter_by(userID=userID).first()

    if user is None:
        return ["User not found"]
    elif user.__class__.__name__ == "Cartographer":
        locations = db.session.query(Card).filter_by(cardStatus="submitted").all()
        
    elif user.__class__.__name__ == "Player":
        if user.advanced == False:
            return ["Player is not advanced and cannot submit locations"]

        locations = db.session.query(Card).filter_by(authorUserID=userID, cardStatus="submitted").all()
    
    if locations.length == 0:
        return ["No submitted locations found"]
    else:
        return formattedReturn(locations)


@app.route('/locations/approved', methods=['POST', 'GET'])
def get_approved_locations():
    userID = request.get_json()["userID"]

    locations = []
    user = db.session.query(User).filter_by(userID=userID).first()

    if user is None:
        return ["User not found"]
    elif user.__class__.__name__ == "Cartographer":
        locations = db.session.query(Card).filter_by(approvedByUserID=userID, cardStatus="verified").all()
    
    elif user.__class__.__name__ == "Player":
        if user.advanced == False:
            return ["Player is not advanced and cannot submit locations"]

        locations = db.session.query(Card).filter_by(authorUserID=userID, cardStatus="verified").all()

    if locations.length == 0:
        return ["No approved locations found"]
    else:
        return formattedReturn(locations)


@app.route('/locations/on-site/unclaimed', methods=['POST', 'GET'])
def get_on_site_check_locations():
    cartographerID = request.get_json()["cartographerID"]

    cartographer = db.session.query(Cartographer).filter_by(userID=cartographerID).first()

    if cartographer is None:
        return ["Cartographer not found"]

    locations = db.session.query(Card).filter_by(cardStatus="unclaimed").all()
    
    return formattedReturn(locations)

@app.route('/locations/on-site/claimed', methods=['POST', 'GET'])
def get_on_site_check_claimed_locations():
    cartographerID = request.get_json()["cartographerID"]

    cartographer = db.session.query(Cartographer).filter_by(userID=cartographerID).first()

    if cartographer is None:
        return ["Cartographer not found"]

    locations = db.session.query(Card).filter_by(approverByUserID=cartographerID, cardStatus="claimed").all()

    if locations.length == 0:
        return ["No claimed locations found"]
    else:
        return formattedReturn(locations)

# TODO: neki verification da li je admin
@app.route('/locations/admin', methods=['GET'])
def get_all_locations():
    locations = db.session.query(Card).all()

    return formattedReturn(locations)

# vraca sve kartice u blizini
@app.route('/locations/close-by', methods=['POST', 'GET'])
def get_close_by_locations():
    request_data = request.get_json()

    userID = request_data['userID']
    lat = request_data['lat']
    lng = request_data['lng']

    user = db.session.query(Player).filter_by(userID=userID).first()
    if user is None:
        return ["User with this userID doesn't exist"]

    closeByLocations = []

    for card in db.session.query(Card).filter_by(cardStatus="verified").all():
        card_location = json.loads(card.cardLocation)
        card_lat = card_location['latitude']
        card_lng = card_location['longitude']

        player_loc = (lat, lng)
        card_loc = (card_lat, card_lng)

        if distance.distance(player_loc, card_loc).km <= 2:
            closeByLocations.append({
                'cardId': card.cardID,
                'photo': card.locationPhoto,
                'description': card.description,
                'latitude': card_lat,
                'longitude': card_lng,
                'title': card.title
            })

    return closeByLocations