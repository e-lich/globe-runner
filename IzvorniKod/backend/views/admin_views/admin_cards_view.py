from backend import app, db
from flask import jsonify
from backend.database.models import Card
import json

# dummy rjesenje za rjesiti nedostatak GET metode
@app.route('/getAllLocations', methods=['GET'])
def get_all_locations_hello():
    return 

# vraca sve kartice
@app.route('/getAllLocations', methods=['POST'])
def get_all_locations():
    locations = []

    for card in db.session.query(Card).all():

        locations.append({
                'cardId': card.cardID,
                'photo': card.locationPhoto,
                'description': card.description,
                'latitude': json.loads(card.cardLocation)['latitude'],
                'longitude': json.loads(card.cardLocation)['longitude'],
                'title': card.title,
                'cardStatus': card.cardStatus
            })

    return locations