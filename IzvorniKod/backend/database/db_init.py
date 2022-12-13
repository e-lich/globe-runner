import geojson, sys, os, json, requests
import hashlib

def loadLokacije():
    with open(lokacije_json_path, 'r', encoding="utf8") as f:
        gj = geojson.load(f)

    lokacije = gj['features']

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

        title = lokacija['properties']['name']
        description = None # https://www.wikidata.org/w/api.php?action=wbgetentities&props=descriptions&ids=Q2350879&languages=en isto kao i gore, nez jel ima smisla

        card_status = 'verified'
        authorUserId = None # neznam
        apporvedByUserID = None # isto neznam

        # neradi mi nes import models
        # new_card = Card(cardID=card_id, cardLocation=card_location, locationPhoto=location_photo, title=title, description=description, cardStatus=card_status)


lokacije_json_path = os.path.join(sys.path[0], "lokacije.geojson")
loadLokacije()