import json
from flask import request, jsonify, render_template, url_for, redirect
from backend import app, db
from backend.database.models import Player, Cartographer
from backend.send_email import send_email
from backend.views.email_confirmation import generate_confirmation_token, confirm_email
import base64

@app.route('/register', methods=['GET'])
def helloRegister():
    return "Hello!"

# geting rid of 403 error    
@app.route('/register/basic', methods=['GET'])
def helloRegisterBasic():
    return "Hello!"

# geting rid of 403 error
@app.route('/register/cartographer', methods=['GET'])
def helloRegisterCartographer():
    return "Hello!"

# register basic user
@app.route('/register', methods=['POST'])
def register_user():
    # input variables validity
    username_valid = True
    email_valid = True
    iban_valid = True

    files = request.files

    name = request.form['name']
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    iban = request.form.get('iban')
    id = files.get('id')
    photo = files.get('photo')

    # iban will be an emtpy string if not provided 
    if iban:

        # checking iban format
        if iban[0:2] != 'HR' or len(iban[2:]) != 19 or not iban[2:].isnumeric():
            iban_valid = False

        photo_string = base64.b64encode(photo.read()).decode('utf-8')
        id_string = base64.b64encode(id.read()).decode('utf-8')
        new_user = Cartographer(username=username, name=name, email=email, password=password, photo=photo_string, iban=iban, id=id_string)

    else:
        photo_string = base64.b64encode(photo.read()).decode('utf-8')
        new_user = Player(username=username, email=email, password=password, photo=photo_string, name=name)

    # checking username and email
    if db.session.query(Player.username).filter_by(username=username).first() is not None or db.session.query(Cartographer.username).filter_by(username=username).first() is not None:
        username_valid = False
    if db.session.query(Player.username).filter_by(email=email).first() is not None or db.session.query(Cartographer.username).filter_by(email=email).first() is not None:
        email_valid = False

    # return if input is invalid
    # TODO: imena polja
    if not username_valid or not email_valid or not iban_valid:
        errors = []
        if not username_valid:
            errors.append("User with this username already exists")
        if not email_valid:
            errors.append("User with this email already exists")
        if not iban_valid:
            errors.append("Iban is not valid. Expected HR + 19 digits.")

        return errors

    db.session.add(new_user)
    db.session.commit()

    token = generate_confirmation_token(email)
    confirm_url = url_for('confirm_email', token=token, _external=True)
    html = render_template('activate.html', confirm_url=confirm_url, username=new_user.username)
    subject = "Please confirm your email for GlobeRunner"
    send_email(new_user.email, subject, html)
    
    return jsonify({
        'username': new_user.username,
        'email': new_user.email,
        'photo': new_user.profilePhoto
    }) 