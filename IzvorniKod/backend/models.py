from flask_sqlalchemy import SQLAlchemy
from backend import db, app

class User(db.Model):
    __tablename__ = "Users"

    username = db.Column(db.String(32), primary_key=True, unique=True)
    email = db.Column(db.String(345), unique=True)
    photo = db.Column(db.String(100))
    password = db.Column(db.String(30))
    location = db.Column(db.String(50))

    def __init__(self, username, email, password):
        self.username = username
        self.email = email
        self.password = password
        self.photo = None
        self.location = None

db.init_app(app)
with app.app_context():
    db.create_all()
        