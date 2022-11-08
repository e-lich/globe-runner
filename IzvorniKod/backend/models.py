from flask_sqlalchemy import SQLAlchemy
from backend import db, app

# defining all db models

# User db model
class User(db.Model):
    __tablename__ = "Users"

    name = db.Column(db.String(50))
    username = db.Column(db.String(32), primary_key=True, unique=True)
    email = db.Column(db.String(345), unique=True)
    photo = db.Column(db.String(100))
    password = db.Column(db.String(30))
    location = db.Column(db.String(50))
    confirmed = db.Column(db.Boolean)

    def __init__(self, username, email, password, photo, name):
        self.username = username
        self.email = email
        self.password = password
        self.photo = photo
        self.name = name
        self.location = None
        self.confirmed = False

# adding all models to db
db.init_app(app)
with app.app_context():
    db.create_all()
        