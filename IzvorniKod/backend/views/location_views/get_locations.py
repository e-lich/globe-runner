from backend import app, db
from flask import session, redirect
from backend.database.models import Card, Player, Cartographer, Inventory, getUserByID, query
import json
from geopy import distance
from sqlalchemy import MetaData

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
        return(['User not logged in'])

    userID = session["userID"]
    user_type = session["userType"]

    user = getUserByID(user_type, userID)

    if user.isPlayer() and not user.isAdvanced():
        return ["Player is not advanced and cannot submit locations"]

    if user.isPlayer():
        return Card().formatted(authorUserID=userID, cardStatus="submitted")
    elif user.isCartographer():
        return Card().formatted(cartographerID=userID, cardStatus="submitted")
    else:
        return ["This shouldn't happen."]
    


@app.route('/locations/approved', methods=['GET'])
def get_approved_locations():
    if "userID" not in session:
        return(['User not logged in'])

    userID = session["userID"]
    user_type = session["userType"]

    user = getUserByID(user_type, userID)

    if user.isPlayer() and not user.isAdvanced():
        return ["Player is not advanced and cannot submit locations"]

    if user.isPlayer():
        return Card().formatted(authorUserID=userID, cardStatus="verified")
    elif user.isCartographer():
        return Card().formatted(cartographerID=userID, cardStatus="verified")
    else:
        return ["This shouldn't happen."]


@app.route('/locations/unclaimed', methods=['GET'])
def get_on_site_check_locations():
    if "userID" not in session:
        return(['User not logged in'])
    
    if session["userType"] != "Cartographer":
        return ["User is not a cartographer"]

    locations = Card().formatted(cardStatus="unclaimed")
    
    if len(locations) == 0:
        return ["No unclaimed locations found"]
    else:
        return locations


@app.route('/locations/claimed', methods=['GET'])
def get_on_site_check_claimed_locations():
    if "userID" not in session:
        return(['User not logged in'])
    
    if session["userType"] != "Cartographer":
        return ["User is not a cartographer"]

    cartographerID = session["userID"]

    locations = Card().formatted(cartographerID=cartographerID, cardStatus="claimed")

    if len(locations) == 0:
        return ["No claimed locations found for this cartographer"]
    else:
        return locations

@app.route('/locations/all', methods=['GET'])
def get_all_locations():
    if "userID" not in session:
        return(['User not logged in'])

    if session["userType"] != "Admin":
        return ["User is not an admin"]

    locations = Card().formatted()

    if len(locations) == 0:
        return ["No locations found"]
    else:
        return locations


# vraca sve kartice unutar odredjene udaljenosti od igrača
# distance je u kilometrima
def get_within_distance(player_loc, dist):
    closeByLocations = []

    for card in query(Card).filter_by(cardStatus="verified").all():
        card_location = json.loads(card.cardLocation)
        card_lat = card_location['latitude']
        card_lng = card_location['longitude']

        card_loc = (card_lat, card_lng)

        if distance.distance(player_loc, card_loc).km <= dist:
            closeByLocations.append({
                'cardId': card.cardID,
                'photo': card.locationPhoto,
                'description': card.description,
                'latitude': card_lat,
                'longitude': card_lng,
                'title': card.title
            })
    
    return closeByLocations


# vraca sve kartice u blizini
@app.route('/locations/close-by', methods=['GET'])
def get_close_by_locations():

    if "userID" not in session:
        return(['User not logged in'])

    userID = session["userID"]

    if session["userType"] != "Player":
        return ["User is not a player"]

    user = query(Player).filter_by(userID=userID).first()

    lat = json.loads(user.playerLocation)['latitude']
    lng = json.loads(user.playerLocation)['longitude']

    player_loc = (lat, lng)

    closeByLocations = get_within_distance(player_loc, 2)

    if len(closeByLocations) == 0:
        return ["No locations found close by"]
    else:
        return closeByLocations

# vraca sve kartice u blizini
@app.route('/locations/closest', methods=['GET'])
def get_closest_locations():

    if "userID" not in session:
        return(['User not logged in'])

    userID = session["userID"]

    if session["userType"] != "Player":
        return ["User is not a player"]

    user = db.session.query(Player).filter_by(userID=userID).first()

    lat = json.loads(user.playerLocation)['latitude']
    lng = json.loads(user.playerLocation)['longitude']

    player_loc = (lat, lng)

    closeByLocations = get_within_distance(player_loc, 0.5)

    if len(closeByLocations) == 0:
        return ["No locations found close by"]
    else:
        return closeByLocations

# vraca sve kartice koje igrac moze sakupiti
@app.route('/locations/collectable', methods=['GET'])
def get_collectable_locations():
    if "userID" not in session:
        return(['User not logged in'])

    userID = session["userID"]

    if session["userType"] != "Player":
        return ["User is not a player"]

    user = getUserByID("Player", userID)

    lat = json.loads(user.playerLocation)['latitude']
    lng = json.loads(user.playerLocation)['longitude']

    player_loc = (lat, lng)

    # collectable su one unutar 300m
    closeByLocations = get_within_distance(player_loc, 0.3)

    if len(closeByLocations) == 0:
        return ["No locations found close by"]
    else:
        return closeByLocations

@app.route('/locations/owned', methods=['GET'])
def get_owned_locations():
    if "userID" not in session:
        return(['User not logged in'])

    userID = session["userID"]

    if session["userType"] != "Player":
        return ["User is not a player"]

    inventory = query(Inventory).filter_by(userID=userID).all()

    owned_cards = []
    for card in inventory:
        location = query(Card).filter_by(cardID=card.cardID).first()
        owned_cards.append({
            "cardID":location.cardID,
            "cardStatus":location.cardStatus,
            "latitude":json.loads(location.cardLocation).get("latitude"),
            "longitude":json.loads(location.cardLocation).get("longitude"),
            "photo":location.locationPhoto,
            "description":location.description,
            "title":location.title
        })
    return owned_cards