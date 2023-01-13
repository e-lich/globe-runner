from backend import db, app
from backend.database.models import Card, Player, Fight
from flask import request, jsonify, session

@app.route('/fight/cards', methods=['POST', 'GET'])
def choose_cards():
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

        fight = db.session.query(Fight).filter_by(player1UserID=currentUserID).filter_by(points1=0).filter_by(points2=0).first()
        if fight is None:
            fight = db.session.query(Fight).filter_by(player2UserID=currentUserID).filter_by(points1=0).filter_by(points2=0).first()
            if fight is None:
                return ["No fight found"]

        if fight.player1UserID == currentUserID:
            if fight.cardID11 is not None:
                return ["Player has already chosen cards"]
            
            fight.cardID11 = cardID1
            fight.cardID12 = cardID2
            fight.cardID13 = cardID3
            fight.player1Ready = True
        else:
            if fight.cardID21 is not None:
                return ["Player has already chosen cards"]
            
            fight.cardID21 = cardID1
            fight.cardID22 = cardID2
            fight.cardID23 = cardID3
            fight.player2Ready = True


        db.session.commit()

        return jsonify(success=True)

    else:
        return ["Invalid request method"]
