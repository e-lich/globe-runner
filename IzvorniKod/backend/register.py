from flask import request, abort, jsonify, render_template, url_for
from backend import app, db
from backend.models import User
from itsdangerous import URLSafeTimedSerializer
from backend.send_email import send_email

# token for email confirmation
def generate_confirmation_token(email):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    return serializer.dumps(email, salt=app.config['SECURITY_PASSWORD_SALT'])

def confirm_token(token, expiration=3600):
    serializer = URLSafeTimedSerializer(app.config['SECRET_KEY'])
    try:
        email = serializer.loads(
            token,
            salt=app.config['SECURITY_PASSWORD_SALT'],
            max_age=expiration
        )
    except:
        return False
    return email

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
    confirm_url = "fer.unizg.hr"
    html = render_template('activate.html', confirm_url=confirm_url)
    subject = "Please confirm your email"
    send_email(new_user.email, subject, html)

    return jsonify({
        'name': new_user.username,
        'email': new_user.email
    })