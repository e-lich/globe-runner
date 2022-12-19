from backend import app, db
from flask import request, jsonify, redirect
from backend.database.models import Player, Cartographer, Admin, User
from sqlalchemy import inspect

def object_as_dict(obj):
    return {c.key: getattr(obj, c.key)
            for c in inspect(obj).mapper.column_attrs}

@app.route('/getUserInfo/', defaults={'user_id': ''})
@app.route('/<path:user_id>', methods=['POST', 'GET'])
def post_user_info(user_id):
    user = db.session.query(Player).filter_by(userID=user_id.split("/")[1]).first()

    if user is None:
        return ["User with specified id doesn't exits."]

    #vrati statistiku, popis kartica, rang na globalnoj ljestvici // NIJE IMPLEMENTIRANA STATISTIKA
    return object_as_dict(user)