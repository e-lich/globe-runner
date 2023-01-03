from backend import app, db
from flask import session, jsonify, request
from backend.database.models import Cartographer

@app.route('/cartographers/verify/<userID>', methods=['POST', 'GET'])
def verify_cartographer(userID):
    if "userID" not in session:
        return(['Admin not logged in'])

    adminID = session["userID"]
    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]
    
    cartographer = db.session.query(Cartographer).filter_by(userID=userID).first()

    if cartographer is None:
        return ['No cartographer with specified ID']
    
    if cartographer.verified:
        return ['Cartographer already verified']

    if request.method == 'POST':
        cartographer.verified = True
        db.session.commit()
        return jsonify(success=True)
    else:
        return ["Invalid request method"]