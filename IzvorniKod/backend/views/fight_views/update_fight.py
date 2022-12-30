from backend import db, app
from backend.database.models import Card, Player, Fight
from flask import request, jsonify, session

@app.route('/fight/cards/<fightID>', methods=['POST', 'GET'])
def choose_cards(fightID):
    if "userID" not in session:
        return(['User not logged in'])
    
    user_type = session["userType"]
    currentUserID = session["userID"]

    if user_type != "Player":
        return ["Only players can choose cards"]

    if request.method == 'POST': 

        request_data = request.get_json()
        cardID1 = request_data['cardID1']
        cardID2 = request_data['cardID2']
        cardID3 = request_data['cardID3']

        fight = db.session.query(Fight).filter(fightID=fightID).first()
        if fight is None:
            return ["Fight not found"]

        if fight.player1ID != currentUserID and fight.player2ID != currentUserID:
            return ["User is not part of this fight"]

        if fight.player1ID == currentUserID:
            if fight.cardID11 is not None:
                return ["Player has already chosen cards"]
            
            fight.cardID11 = cardID1
            fight.cardID12 = cardID2
            fight.cardID13 = cardID3
        else:
            if fight.cardID21 is not None:
                return ["Player has already chosen cards"]
            
            fight.cardID21 = cardID1
            fight.cardID22 = cardID2
            fight.cardID23 = cardID3

        db.session.commit()

        return jsonify(success=True)

    else:
        return ["Invalid request method"]
