from backend import app, db
from flask import session, jsonify, request
from backend.database.models import Cartographer

@app.route('/api/cartographers/verify/<userID>', methods=['POST', 'GET'])
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
    
    if cartographer.verifiedStatus == "verified":
        return ['Cartographer already verified']

    if request.method == 'POST':
        cartographer.verifiedStatus = "verified"
        db.session.commit()
        return jsonify(success=True)
    else:
        return ["Invalid request method"]

@app.route('/api/cartographers/reject/<userID>', methods=['POST', 'GET'])
def reject_cartographer(userID):
    if "userID" not in session:
        return(['Admin not logged in'])

    adminID = session["userID"]
    user_type = session["userType"]

    if user_type != "Admin":
        return ["User is not an admin"]
    
    cartographer = db.session.query(Cartographer).filter_by(userID=userID).first()

    if cartographer is None:
        return ['No cartographer with specified ID']
    
    if cartographer.verifiedStatus == "rejected":
        return ['Cartographer already rejected']

    if request.method == 'POST':
        cartographer.verifiedStatus = "rejected"
        db.session.commit()
        return jsonify(success=True)
    else:
        return ["Invalid request method"]