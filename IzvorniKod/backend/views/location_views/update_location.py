from backend import app, db
from flask import session, request, jsonify, redirect
from backend.database.models import Card, Inventory
import base64

def update(location):

    if location is None:
        return ["Card not found"]
    
    if request.form.get('title') is not None:
        location.title = request.form['title']
    if request.form.get('description') is not None:
        location.description = request.form['description']
    if request.form.get('locationPhoto') is not None:
        location.locationPhoto =  base64.b64encode(request.files.get('locationPhoto').read()).decode('utf-8')
    
    db.session.commit()

    return jsonify(success=True)

## ovo je za admina, moze editat sve
@app.route('/locations/update/<cardID>', methods=['POST', 'GET'])
def update_location(cardID):

    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]

    if request.method == 'POST':
        location = db.session.query(Card).filter_by(cardID=cardID).first()
        return update(location)
    else:
        return ["Invalid request method"]

## ovo je za kartografa, moze editat samo one koje su submitted
@app.route('/locations/update/submitted/<cardID>', methods=['POST', 'GET'])
def update_submitted_location(cardID):
        if "userID" not in session:
            return(['User not logged in'])
        
        user_type = session["userType"]
    
        if user_type != "Cartographer":
            return ["User is not a cartographer"]
    
        if request.method == 'POST':
            location = db.session.query(Card).filter_by(cardID=cardID).first()

            if location.cardStatus != "submitted":
                return ["Card cannot be modified"]

            return update(location)
        else:
            return ["Invalid request method"]

@app.route('/locations/verify/<cardID>', methods=['POST', 'GET'])
def approve_location(cardID):
    
        if "userID" not in session:
            return(['User not logged in'])
        
        user_type = session["userType"]
    
        if user_type != "Cartographer":
            return ["User is not a cartographer"]
    
        if request.method == 'POST':
            location = db.session.query(Card).filter_by(cardID=cardID).first()
    
            if location is None:
                return ["Card not found"]
            
            location.cardStatus = "verified"
    
            db.session.commit()
    
            return jsonify(success=True)
        else:
            return ["Invalid request method"]

@app.route('/locations/unclaim/<cardID>', methods=['POST', 'GET'])
def unclaim_location(cardID):
    
        if "userID" not in session:
            return(['User not logged in'])
        
        user_type = session["userType"]
    
        if user_type != "Cartographer":
            return ["User is not a cartographer"]
    
        if request.method == 'POST':
            location = db.session.query(Card).filter_by(cardID=cardID).first()
    
            if location is None:
                return ["Card not found"]
            
            location.cardStatus = "unclaimed"
    
            db.session.commit()
    
            return jsonify(success=True)
        else:
            return ["Invalid request method"]

@app.route('/locations/collect/<cardID>', methods=['POST', 'GET'])
def collect_location(cardID):
        
        if "userID" not in session:
            return(['User not logged in'])
        
        user_type = session["userType"]
        userID = session["userID"]

        user = db.session.query(User).filter_by(userID=userID).first()
    
        if user_type != "Player":
            return ["User is not a player"]

        ## mozda provjeru blizine dodati ali ne bi se smijelo nikad dogoditi da se pozove ova metoda ako nije dovljno blizu
    
        if request.method == 'POST':
            location = db.session.query(Card).filter_by(cardID=cardID).first()
    
            if location is None:
                return ["Card not found"]

            # check if user has already collected this card
            inventory = db.session.query(Inventory).filter_by(userID=userID, cardID=cardID).first()
            if inventory is not None:
                inventory.strength = 10

            else:
                new_inventory = Inventory(userID, cardID, 10)

                number_of_cards = db.session.query(Inventory).filter_by(userID=userID).count()
                if number_of_cards >= 3:
                    user.challangeable = True

                db.session.add(new_inventory)   
                
            db.session.commit()
    
            return jsonify(success=True)
        else:
            return ["Invalid request method"]