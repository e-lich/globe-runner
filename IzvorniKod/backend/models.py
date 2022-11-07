from enum import unique
from flask_sqlalchemy import SQLAlchemy
from backend import db, app

# defining all db models

# User db model
class User(db.Model):
    __tablename__ = "Users"

    username = db.Column(db.String(32), primary_key=True, unique=True)
    email = db.Column(db.String(345), unique=True)
    photo = db.Column(db.String(100))
    password = db.Column(db.String(30))
    location = db.Column(db.String(50))
    confirmed = db.Column(db.Boolean)

    __mapper_args__ = {
        "polymorphic_identity": "user",
        "polymorphic_on": type
    }

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.photo = None
        self.location = None
        self.confirmed = False

class Cartographer(User):
    __tablename__ = "Cartographers"

    username = db.Column(db.String(32), db.ForeignKey("Users.username"), primary_key=True)
    iban = db.Column(db.String(21), unique=True)#varchar(21) ili "HR"+integer(19)
    id = db.Column(db.String(100))
    verified = db.Column(db.Boolean)

    __mapper_args__ = {
        "polymorphic_identity": "cartographer",
    }

class Player(User):
    __tablename__ = "Players"

    username = db.Column(db.String(32), db.ForeignKey("Users.username"), primary_key=True)
    authority = db.Column(db.String(21), unique=True)#ordinary/advanced/admin
    eloScore = db.Column(db.Integer)
    banned = db.Column(db.Boolean)

    __mapper_args__ = {
        "polymorphic_identity": "player",
    }

class Card(db.Model):
    __tablename__ = "Cards"

    cipher = db.Column(db.Integer, primary_key=True, unique=True)
    address = db.Column(db.String(100))
    strength = db.Column(db.Integer)
    picture = db.Column(db.String(100))
    name = db.Column(db.String(50))
    description = db.Column(db.String(250))
    status = db.Column(db.String(10))#submitted, unclaimed, claimed, verified
    author = db.Column(db.String(32))
    approved_by = db.Column(db.String(32))

class Inventory(Player, Card):
    __tablename__ = "Inventory"

    username = db.Column(db.String(32), db.ForeignKey("Players.username"), primary_key=True, unique=True)
    cipher = db.Column(db.Integer, db.ForeignKey("Cards.cipher"), unique=True)
    
class Fight(Player):
    __tablename__ = "Fight"
    
    codeno = db.Column(db.Integer, primary_key=True, unique=True)
    player_one = username = db.Column(db.String(32), db.ForeignKey("Players.username"), unique=True)
    player_two = db.Column(db.String(32))
    winner = db.Column(db.String(32))
    #kartice???

# adding all models to db
db.init_app(app)
with app.app_context():
    db.create_all()
        