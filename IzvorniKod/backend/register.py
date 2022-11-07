from flask import request, abort, jsonify, render_template, url_for
from backend import app, db
from backend.models import User
from backend.send_email import send_email
from backend.email_confirmation import generate_confirmation_token, confirm_email

@app.route('/')
def registered():
    return "WOOOO"

# register basic user
@app.route('/register', methods=['POST'])
def register_user(): 
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']

    # korisnik_exists = Korisnik.query.filter_by(username=username).first() is not None

    # if korisnik_exists:
    #     abort(409)

    # hashed_lozinka = Bcrypt.generate_password_hash(password)
    new_user = User(username=username, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    token = generate_confirmation_token(email)
    confirm_url = url_for('confirm_email', token=token, _external=True)
    html = render_template('activate.html', confirm_url=confirm_url)
    subject = "Please confirm your email"
    send_email(new_user.email, subject, html)

    return jsonify({
        'name': new_user.username,
        'email': new_user.email
    })