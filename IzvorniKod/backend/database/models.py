import enum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from backend import db
from sqlalchemy import or_
import datetime
import uuid
import json


# User db model
class User(db.Model):
    __tablename__ = "Users"

    __abstract__ = True

    userID = db.Column(db.String(32), primary_key=True, unique=True)
    username = db.Column(db.String(32), unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(345), unique=True)
    profilePhoto = db.Column(db.Text)
    password = db.Column(db.String(30))
    confirmed = db.Column(db.Boolean)
    signedIn = db.Column(db.Boolean)
    banned = db.Column(db.Boolean)
    

# Cartographer db model
class Cartographer(User):
    __tablename__ = "Cartographers"

    IBAN = db.Column(db.String(21))
    document = db.Column(db.Text)
    verifiedStatus = db.Column(db.Enum("unverified", "verified", "rejected", name="verifiedStatus"))

    def __init__(self, username, name, email, password, photo, iban, id, confirmed=False):

        self.userID = uuid.uuid4().hex
        self.username = username
        self.name = name
        self.email = email
        self.profilePhoto = photo
        self.password = password
        self.IBAN = iban
        self.confirmed = confirmed
        self.verifiedStatus = "unverified"
        self.document = id
        self.banned = False
        self.signedIn = False

    def isPlayer(self):
        return False

    def isCartographer(self):
        return True

# Player db model
class Player(User):
    __tablename__ = "Players"

    advanced = db.Column(db.Boolean)
    eloScore = db.Column(db.Integer)
    playerLocation = db.Column(db.String(100))
    challengeable = db.Column(db.Boolean)

    def __init__(self, username, name, email, password, photo, advanced=False, confirmed=False):
        
        self.userID = uuid.uuid4().hex
        self.username = username
        self.name = name
        self.email = email
        self.password = password
        self.profilePhoto = photo
        self.playerLocation = None
        self.advanced = advanced
        self.eloScore = 0
        self.banned = False
        self.confirmed = confirmed
        self.signedIn = False
        self.challengeable = False

    def isAdvanced(self):
        return self.advanced

    def isPlayer(self):
        return True

    def isCartographer(self):
        return False

    def deleteChallenges(self):
        query(Challenge).filter(or_(Challenge.challengerUserID == self.userID, \
                                    Challenge.victimUserID == self.userID))\
                        .delete()
        db.session.commit()

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

    cardID = db.Column(db.BigInteger, primary_key=True, unique=True)
    cardLocation = db.Column(db.String(100)) # latitude i longitude JSON: {'latitude':'15.124', 'longitude':'45.1323'}
    locationPhoto = db.Column(db.Text)
    title = db.Column(db.String(100))
    description = db.Column(db.String(250))
    cardStatus = db.Column(db.Enum("submitted", "unclaimed", "claimed", "verified", name="card_status_type"))
    authorUserID = db.Column(db.String(32), db.ForeignKey("Players.userID"))
    cartographerID = db.Column(db.String(32), db.ForeignKey("Cartographers.userID")) 

    def formatted(cls, **filters):
        queryTmp = query(Card)
        for key, value in filters.items():
            queryTmp = queryTmp.filter_by(**{key: value})
        results = queryTmp.all()
        locations = []
        for location in results:
            locations.append({
                "cardID":location.cardID,
                "cardStatus":location.cardStatus,
                "latitude":json.loads(location.cardLocation).get("latitude"),
                "longitude":json.loads(location.cardLocation).get("longitude"),
                "locationPhoto":location.locationPhoto,
                "description":location.description,
                "title":location.title
            })
        return locations

# Inventory db model
class Inventory(db.Model):
    __tablename__ = "Inventories"

    userID = db.Column(db.String(32), db.ForeignKey("Players.userID"), primary_key=True)
    cardID = db.Column(db.BigInteger, db.ForeignKey("Cards.cardID"), primary_key=True)
    strength = db.Column(db.Integer)

    def __init__(self, userID, cardID, strength):
        self.userID = userID
        self.cardID = cardID
        self.strength = strength

# Challenge db model
class Challenge(db.Model):
    __tablename__ = "Challenges"

    challengeID = db.Column(db.String(32), primary_key=True, unique=True)
    challengerUserID = db.Column(db.String(32), db.ForeignKey("Players.userID"))
    victimUserID = db.Column(db.String(32), db.ForeignKey("Players.userID"))
    challengeTimestamp = db.Column(db.DateTime)
    challengeStatus = db.Column(db.Enum("pending", "accepted", "declined", "went_too_far", name="challenge_status_type"))

    def __init__(self, challengerUserID, victimUserID):
        self.challengeID = uuid.uuid4().hex
        self.challengerUserID = challengerUserID
        self.victimUserID = victimUserID
        self.challengeTimestamp = datetime.datetime.now()
        self.challengeStatus = "pending"

# Fight db model   
class Fight(db.Model):
    __tablename__ = "Fights"
    
    fightID = db.Column(db.Integer, primary_key=True, unique=True)
    player1UserID = db.Column(db.String(32), db.ForeignKey("Players.userID"))
    player2UserID = db.Column(db.String(32), db.ForeignKey("Players.userID"))
    player1Ready = db.Column(db.Boolean)
    player2Ready = db.Column(db.Boolean)
    cardID11 = db.Column(db.BigInteger, db.ForeignKey("Cards.cardID"))
    cardID12 = db.Column(db.BigInteger, db.ForeignKey("Cards.cardID"))
    cardID13 = db.Column(db.BigInteger, db.ForeignKey("Cards.cardID"))
    cardID21 = db.Column(db.BigInteger, db.ForeignKey("Cards.cardID"))
    cardID22 = db.Column(db.BigInteger, db.ForeignKey("Cards.cardID"))
    cardID23 = db.Column(db.BigInteger, db.ForeignKey("Cards.cardID"))
    points1 = db.Column(db.Float)
    points2 = db.Column(db.Float)
    fightTimestamp = db.Column(db.DateTime)

    def __init__(self, player1UserID, player2UserID):
        self.player1UserID = player1UserID
        self.player2UserID = player2UserID
        self.player1Ready = False
        self.player2Ready = False
        self.cardID11 = None
        self.cardID12 = None
        self.cardID13 = None
        self.cardID21 = None
        self.cardID22 = None
        self.cardID23 = None
        self.points1 = 0
        self.points2 = 0
        self.fightTimestamp = datetime.datetime.now()


def getUserByID(userType, userID):
    model = Player
    if userType == 'Cartographer':
        model = Cartographer
    return db.session.query(model).filter_by(userID=userID).first()

def query(model):
    return db.session.query(model)

def checkPrivilage(userType, privilages):
    if userType in privilages:
        return False
    return True