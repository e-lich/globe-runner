from backend import app, db
from flask import session, redirect
from backend.database.models import Card, Player, Cartographer
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


@app.route('/locations/submitted', methods=['GET'])
def get_submitted_locations():
    if "userID" not in session:
        redirect('/login')

    userID = session["userID"]
    user_type = session["userType"]

    locations = []

    if user_type == "Player":
        user = db.session.query(Player).filter_by(userID=userID).first()

        if user.advanced == False:
            return ["Player is not advanced and cannot submit locations"]

        locations = db.session.query(Card).filter_by(authorUserID=userID, cardStatus="submitted").all()
    
    elif user_type == "Cartographer":
        user = db.session.query(Cartographer).filter_by(userID=userID).first()

        locations = db.session.query(Card).filter_by(cardStatus="submitted").all()
    
    if len(locations) == 0:
        return ["No submitted locations found"]
    else:
        return formattedReturn(locations)


@app.route('/locations/approved', methods=['GET'])
def get_approved_locations():
    if "userID" not in session:
        redirect('/login')

    userID = session["userID"]
    user_type = session["userType"]

    locations = []

    if user_type == "Player":
        user = db.session.query(Player).filter_by(userID=userID).first()

        if user.advanced == False:
            return ["Player is not advanced and cannot submit locations"]

        locations = db.session.query(Card).filter_by(authorUserID=userID, cardStatus="verified").all()
    
    elif user_type == "Cartographer":
        user = db.session.query(Cartographer).filter_by(userID=userID).first()

        locations = db.session.query(Card).filter_by(approvedByUserID=userID, cardStatus="verified").all()
    
    if len(locations) == 0:
        return ["No approved locations found"]
    else:
        return formattedReturn(locations)


@app.route('/locations/unclaimed', methods=['GET'])
def get_on_site_check_locations():
    if "userID" not in session:
        redirect('/login')
    
    if session["userType"] != "Cartographer":
        return ["User is not a cartographer"]

    locations = db.session.query(Card).filter_by(cardStatus="unclaimed").all()
    
    if len(locations) == 0:
        return ["No unclaimed locations found"]
    else:
        return formattedReturn(locations)


@app.route('/locations/claimed', methods=['GET'])
def get_on_site_check_claimed_locations():
    if "userID" not in session:
        redirect('/login')
    
    if session["userType"] != "Cartographer":
        return ["User is not a cartographer"]

    cartographerID = session["userID"]

    locations = db.session.query(Card).filter_by(approvedByUserID=cartographerID, cardStatus="claimed").all()

    if len(locations) == 0:
        return ["No claimed locations found for this cartographer"]
    else:
        return formattedReturn(locations)

@app.route('/locations/all', methods=['GET'])
def get_all_locations():
    if "userID" not in session:
        redirect('/login')

    if session["userType"] != "Admin":
        return ["User is not an admin"]

    locations = db.session.query(Card).all()

    if len(locations) == 0:
        return ["No locations found"]
    else:
        return formattedReturn(locations)

# vraca sve kartice u blizini
@app.route('/locations/close-by', methods=['GET'])
def get_close_by_locations():

    if "userID" not in session:
        redirect('/login')

    userID = session["userID"]

    if session["userType"] != "Player":
        return ["User is not a player"]

    user = db.session.query(Player).filter_by(userID=userID).first()

    lat = json.loads(user.playerLocation)['latitude']
    lng = json.loads(user.playerLocation)['longitude']

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

    if len(closeByLocations) == 0:
        return ["No locations found close by"]
    else:
        return closeByLocations