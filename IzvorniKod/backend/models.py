from flask_sqlalchemy import SQLAlchemy

db = SQLAlchemy()

class Korisnik(db.Model):
    __tablename__ = "korisnici"

    korisnickoIme = db.Column(db.String(32), primary_key=True, unique=True)
    email = db.Column(db.String(345), unique=True)
    fotografija = db.Column(db.String(100))
    lozinka = db.Column(db.String(30))
    lokacija = db.Column(db.String(50))
