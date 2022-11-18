import enum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from backend import db, app


# User db model
class User(db.Model):
    __tablename__ = "Users"

    __abstract__ = True

    userID = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(32), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(345), unique=True)
    profilePhoto = db.Column(db.String(100))
    password = db.Column(db.String(30))
    confirmed = db.Column(db.Boolean)
    

# Cartographer db model
class Cartographer(User):
    __tablename__ = "Cartographers"

    IBAN = db.Column(db.String(21))
    document = db.Column(db.String(100))
    verified = db.Column(db.Boolean)

    def __init__(self, username, name, email, password, photo, iban, id):
        self.username = username
        self.name = name
        self.email = email
        self.profilePhoto = photo
        self.password = password
        self.IBAN = iban
        self.confirmed = False
        self.verified = False
        self.document = id

# Player db model
class Player(User):
    __tablename__ = "Players"

    advanced = db.Column(db.Boolean)
    eloScore = db.Column(db.Integer)
    banned = db.Column(db.Boolean)
    playerLocation = db.Column(db.String(100))
    signedIn = db.Column(db.Boolean)

    def __init__(self, username, name, email, password, photo):

        self.username = username
        self.name = name
        self.email = email
        self.password = password
        self.profilePhoto = photo
        self.playerLocation = None
        self.advanced = False
        self.eloScore = 0
        self.banned = False
        self.confirmed = False
        self.signedIn = False

# Admin db model
class Admin(db.Model):
    __tablename__ = "Admins"

    adminID = db.Column(db.Integer, primary_key=True, unique=True)
    username = db.Column(db.String(32), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(345), unique=True)
    password = db.Column(db.String(30))

    def __init__(self, username, name, email, password, photo):
        self.username = username
        self.name = name
        self.email = email
        self.password = password

# Card db model
class Card(db.Model):
    __tablename__ = "Cards"

    cardID = db.Column(db.Integer, primary_key=True, unique=True)
    cardLocation = db.Column(db.String(100))
    locationPhoto = db.Column(db.String(100))
    title = db.Column(db.String(50))
    description = db.Column(db.String(250))
    cardStatus = db.Column(db.Enum("submitted", "unclaimed", "claimed", "verified", name="card_status_type"))
    authorUserID = db.Column(db.Integer, db.ForeignKey("Players.userID"))
    approvedByUserID = db.Column(db.Integer, db.ForeignKey("Cartographers.userID"))

# Inventory db model
class Inventory(db.Model):
    __tablename__ = "Inventories"

    userID = db.Column(db.Integer, db.ForeignKey("Players.userID"), primary_key=True)
    cardID = db.Column(db.Integer, db.ForeignKey("Cards.cardID"), primary_key=True)
    strength = db.Column(db.Integer)

# Challenge db model
class Challenge(db.Model):
    __tablename__ = "Challenges"

    challengeID = db.Column(db.Integer, primary_key=True, unique=True)
    challengerUserID = db.Column(db.Integer, db.ForeignKey("Players.userID"))
    victimUserID = db.Column(db.Integer, db.ForeignKey("Players.userID"))
    challengeTimestamp = db.Column(db.DateTime)
    challengeStatus = db.Column(db.Enum("pending", "accepted", "rejected", name="challenge_status_type"))

# Fight db model   
class Fight(db.Model):
    __tablename__ = "Fights"
    
    fightID = db.Column(db.Integer, primary_key=True, unique=True)
    player1UserID = db.Column(db.Integer, db.ForeignKey("Players.userID"))
    player2UserID = db.Column(db.Integer, db.ForeignKey("Players.userID"))
    cardID11 = db.Column(db.Integer, db.ForeignKey("Cards.cardID"))
    cardID12 = db.Column(db.Integer, db.ForeignKey("Cards.cardID"))
    cardID13 = db.Column(db.Integer, db.ForeignKey("Cards.cardID"))
    cardID21 = db.Column(db.Integer, db.ForeignKey("Cards.cardID"))
    cardID22 = db.Column(db.Integer, db.ForeignKey("Cards.cardID"))
    cardID23 = db.Column(db.Integer, db.ForeignKey("Cards.cardID"))
    points1 = db.Column(db.Float)
    points2 = db.Column(db.Float)
    fightTimestamp = db.Column(db.DateTime)
    challengeID = db.Column(db.Integer, db.ForeignKey("Challenges.challengeID"))

# adding all models to db
db.init_app(app)
with app.app_context():
    db.create_all()
        