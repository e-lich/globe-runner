import geojson, sys, os, json, requests
import hashlib
from backend import db, app
from backend.database.models import Card, Player
import json
from flask import jsonify
from sqlalchemy import update

def loadLokacije():
    with open(lokacije_json_path, 'r', encoding="utf8") as f:
        gj = geojson.load(f)

    lokacije = gj['features']

    for lokacija in lokacije:
        card_id = lokacija['properties']['@id'].split('/')[1]

        print(card_id)

    for lokacija in lokacije:
        card_id = lokacija['properties']['@id'].split('/')[1]
        card_location = json.dumps({
            "longitude": lokacija['geometry']["coordinates"][0],
            "latitude": lokacija['geometry']["coordinates"][1]
        })
        
        location_photo = None # nezz, nema u GeoJSON-u, dolje sam nes probo iz wikipedije izvuc slike, cak i funkcionira
        if "wikidata" in lokacija['properties']:
            wikidata = requests.get('https://www.wikidata.org/w/api.php?action=wbgetclaims&property=P18&format=json&entity=' + lokacija['properties']['wikidata']).json()
            if "P18" in wikidata['claims']:
                img_name = wikidata['claims']['P18'][0]['mainsnak']['datavalue']['value']
                img_md5 = hashlib.md5(img_name.replace(" ", "_").encode("utf8")).hexdigest()
                img_name = img_name.replace(" ", "_")
                img_url = f"https://upload.wikimedia.org/wikipedia/commons/{img_md5[0]}/{img_md5[0]}{img_md5[1]}/{img_name}"
                location_photo = img_url

        title = "no_name(clock, podsjeti lovru da makne)"
        if "name" in lokacija["properties"]:
            title = lokacija['properties']['name']
        description = None # https://www.wikidata.org/w/api.php?action=wbgetentities&props=descriptions&ids=Q2350879&languages=en isto kao i gore, nez jel ima smisla

        card_status = 'verified'
        authorUserId = None # ne znam
        apporvedByUserID = None # isto 

        new_card = Card(cardID=card_id, cardLocation=card_location, locationPhoto=str(location_photo), title=title, description=description, cardStatus=card_status)
        # print(card_id + "___________________")

        if db.session.query(Card.cardID).filter_by(cardID=card_id).first() is None:
            db.session.add(new_card)
            db.session.commit()
        else:
            break

def switchLongAndLat():

    cards = db.session.query(Card.cardLocation).all()
    for location in cards:
        json_location = json.loads(location[0])

        lat = json_location["longitude"]
        
        json_location["longitude"] = json_location["latitude"]
        json_location["latitude"] = lat

        upd = update(Card).values(cardLocation=json.dumps(json_location)).where(Card.cardLocation == location[0])
        db.session.execute(upd)

    db.session.commit()


def loadDummyPlayers():
    player1 = Player(username='video_lovro',name='Lovro',password='backendsucks', email="lovro@lovro.lovro", photo=None)
    player2 = Player(username='tech_lovro',name='Lovro 2',password='frontendrocks', email="lovro1@lovro.lovro", photo=None)
    player3 = Player(username='foto_ela',name='Lovro 3',password='backendsucks', email="lovro2@lovro.lovro", photo=None)
    player4 = Player(username='???_pero',name='Lovro 4',password='frontenddrocks', email="lovro3@lovro.lovro", photo=None)

    if db.session.query(Player.username).filter_by(username=player1.username).first():
        return

    db.session.add(player1)
    db.session.add(player2)
    db.session.add(player3)
    db.session.add(player4)
    db.session.commit()

# za win: lokacije_json_path = os.path.join(sys.path[0], "backend\\database\\lokacije.geojson")
# za unix: lokacije_json_path = os.path.join(sys.path[0], "backend/database/lokacije.geojson")
lokacije_json_path = os.path.join(sys.path[0], "backend/database/lokacije.geojson")

# adding all models to db
db.init_app(app)
with app.app_context():
    db.create_all()
    loadLokacije()

    loadDummyPlayers()

    # switchLongAndLat()