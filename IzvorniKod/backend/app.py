from flask import Flask, request, abort, jsonify
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_bcrypt import Bcrypt
from models import db, Korisnik

app = Flask(__name__)
# ovaj link morate urediti u 'postgresql://postgres:<insert-password>@localhost/<insert-ime-baze>'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:bazepodataka@localhost/globe-runner'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db.init_app(app)
with app.app_context():
    db.create_all()

CORS(app)

@app.route('/')
def hello():
    return "Hello Backend!"

@app.route('/register', methods=["POST"])
def register_korisnik():
    ime = request.json["korisnickoIme"]
    email = request.json["email"]
    fotografija = request.json["fotografija"]
    lozinka = request.json["lozinka"]
    lokacija = request.json["lokacija"]

    korisnik_exists = Korisnik.query.filter_by(ime=ime).first() is not None

    if korisnik_exists:
        abort(409)

    hashed_lozinka = Bcrypt.generate_password_hash(lozinka)
    novi_korisnik = Korisnik(korisnickoIme=ime, email=email, fotografija=fotografija, lozinka=lozinka, lokacija=lokacija)

    db.session.add(novi_korisnik)
    db.session.commit()

    return jsonify({
        "ime": novi_korisnik.korisnickoIme,
        "email": novi_korisnik.email
    })

if __name__ == '__main__':
    app.run()
