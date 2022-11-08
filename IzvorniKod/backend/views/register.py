from flask import request, jsonify, render_template, url_for
from backend import app, db
from backend.models import User
from backend.send_email import send_email
from backend.views.email_confirmation import generate_confirmation_token, confirm_email

# register basic user
@app.route('/register', methods=['POST'])
def register_user():
    # input variables validity
    username_valid = True
    email_valid = True
    iban_valid = True

    name = request.form['name']
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    photo = request.form['photo']

    if 'iban' in request.form:
        iban = request.form['iban']

        # checking iban format
        if iban[0:1] != 'HR' or len(iban[2:]) != 19 or not iban[2:].isnumeric():
            iban_valid = False

    # checking username and email
    if db.session.query(User).filter_by(username=username).first() is not None:
        username_valid = False
    if db.session.query(User).filter_by(email=email).first() is not None:
        email_valid = False

    # return if input is invalid
    # TODO: imena polja
    if not username_valid or not email_valid or not iban_valid:
        return  jsonify({
            'username_valid': username_valid,
            'email_valid': email_valid,
            'iban_valid': iban_valid
        })

    new_user = User(username=username, email=email, password=password)

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