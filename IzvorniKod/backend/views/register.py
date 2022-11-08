from flask import request, jsonify, render_template, url_for
from backend import app, db
from backend.models import Player, Cartographer
from backend.send_email import send_email
from backend.views.email_confirmation import generate_confirmation_token, confirm_email

# register basic user
@app.route('/register', methods=['POST'])
def register_user():
    # input variables validity
    username_valid = True
    email_valid = True
    iban_valid = True

    request_data = request.get_json()

    name = request_data['name']
    username = request_data['username']
    email = request_data['email']
    password = request_data['password']
    photo = request_data['photo']

    if 'iban' in request_data:
        iban = request_data['iban']
        id = request_data['id']

        # checking iban format
        if iban[0:2] != 'HR' or len(iban[2:]) != 19 or not iban[2:].isnumeric():
            iban_valid = False

        new_user = Cartographer(username=username, name=name, email=email, password=password, photo=photo, iban=iban, id=id)

    else:
        new_user = Player(username=username, email=email, password=password, photo=photo, name=name)

    # checking username and email
    if db.session.query(Player.username).filter_by(username=username).first() is not None or db.session.query(Cartographer.username).filter_by(username=username).first() is not None:
        username_valid = False
    if db.session.query(Player.username).filter_by(email=email).first() is not None or db.session.query(Cartographer.username).filter_by(email=email).first() is not None:
        email_valid = False

    # return if input is invalid
    # TODO: imena polja
    if not username_valid or not email_valid or not iban_valid:
        return  jsonify({
            'username_valid': username_valid,
            'email_valid': email_valid,
            'iban_valid': iban_valid
        })

    db.session.add(new_user)
    db.session.commit()

    token = generate_confirmation_token(email)
    confirm_url = url_for('confirm_email', token=token, _external=True)
    html = render_template('activate.html', confirm_url=confirm_url, username=new_user.username)
    subject = "Please confirm your email for GlobeRunner"
    send_email(new_user.email, subject, html)
    
    # TODO: returnanje
    return jsonify({
        'username': new_user.username,
        'email': new_user.email
    })