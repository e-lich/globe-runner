from backend import app, db
from flask import session, request, jsonify, redirect
from backend.database.models import Card
import base64

@app.route('/locations/update/<cardID>', methods=['POST', 'GET'])
def update_location(cardID):

    if "userID" not in session:
        redirect('/login')
    
    user_type = session["userType"]

    if user_type != "Cartographer":
        return ["User is not a cartographer"]

    if request.method == 'POST':
        location = db.session.query(Card).filter_by(cardID=cardID).first()

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
    else:
        return ["Invalid request method"]