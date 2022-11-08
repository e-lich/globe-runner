import enum
from flask_sqlalchemy import SQLAlchemy
from sqlalchemy.orm import relationship
from backend import db, app

# defining all db models

# User db model
class User(db.Model):
    __tablename__ = "Users"

    __abstract__ = True

    username = db.Column(db.String(32), primary_key=True, unique=True)
    name = db.Column(db.String(50))
    email = db.Column(db.String(345), unique=True)
    photo = db.Column(db.String(100))
    password = db.Column(db.String(30))
    location = db.Column(db.String(50))
    confirmed = db.Column(db.Boolean)

# Cartographer db model
class Cartographer(User):
    __tablename__ = "Cartographers"

    iban = db.Column(db.String(21))
    id = db.Column(db.String(100))
    verified = db.Column(db.Boolean)

    def __init__(self, username, name, email, password, photo, iban, id):
        self.username = username
        self.name = name
        self.email = email
        self.photo = photo
        self.password = password
        self.iban = iban
        self.location = None
        self.confirmed = False
        self.verified = False
        self.id = id

# Player db model
class Player(User):
    __tablename__ = "Players"

    authority = db.Column(db.Enum("ordinary", "advanced", "admin", name="authority_type"))
    eloScore = db.Column(db.Integer)
    banned = db.Column(db.Boolean)
    cards = relationship("Card")

    def __init__(self, username, name, email, password, photo):
        self.username = username
        self.name = name
        self.email = email
        self.password = password
        self.photo = photo
        self.location = None
        self.authority = "ordinary"
        self.eloScore = 0
        self.banned = False
        self.confirmed = False

# Card db model
class Card(db.Model):
    __tablename__ = "Cards"

    cipher = db.Column(db.Integer, primary_key=True, unique=True)
    address = db.Column(db.String(100))
    strength = db.Column(db.Integer)
    picture = db.Column(db.String(100))
    name = db.Column(db.String(50))
    description = db.Column(db.String(250))
    status = db.Column(db.Enum("submitted", "unclaimed", "claimed", "verified", name="status_type"))
    author = db.Column(db.String(32), db.ForeignKey("Players.username"))
    approved_by = db.Column(db.String(32), db.ForeignKey("Cartographers.username"))
    owned_by = db.Column(db.String(32), db.ForeignKey("Players.username"))

# Fight db model   
class Fight(db.Model):
    __tablename__ = "Fight"
    
    codeno = db.Column(db.Integer, primary_key=True)
    player_one = username = db.Column(db.String(32), db.ForeignKey("Players.username"))
    player_two = db.Column(db.String(32), db.ForeignKey("Players.username"))
    winner = db.Column(db.String(32), db.ForeignKey("Players.username"))
    #kartice???

# adding all models to db
db.init_app(app)
with app.app_context():
    db.create_all()
        