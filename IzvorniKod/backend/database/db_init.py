import geojson, sys, os, json, requests
import hashlib
from backend import db, app
from backend.database.models import Card

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
            "latitude": lokacija['geometry']["coordinates"][0],
            "longitude": lokacija['geometry']["coordinates"][1]
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
        authorUserId = None # neznam
        apporvedByUserID = None # isto 

        new_card = Card(cardID=card_id, cardLocation=card_location, locationPhoto=str(location_photo), title=title, description=description, cardStatus=card_status)
        print(card_id + "___________________")

        if db.session.query(Card.cardID).filter_by(cardID=card_id).first() is None:
            db.session.add(new_card)
            db.session.commit()

        print("Backend odrađen :)")

lokacije_json_path = os.path.join(sys.path[0], "backend\\database\\lokacije.geojson")

# adding all models to db
db.init_app(app)
with app.app_context():
    db.create_all()
    loadLokacije()