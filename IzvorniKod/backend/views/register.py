from flask import request, jsonify, render_template, url_for
from backend import app, db
from backend.models import User
from backend.send_email import send_email
from backend.views.email_confirmation import generate_confirmation_token, confirm_email

# register basic user
@app.route('/register', methods=['POST'])
def register_user():
    name = request.form['name']
    username = request.form['username']
    email = request.form['email']
    password = request.form['password']
    photo = request.form['photo']

    if "iban" in request.form:
        iban = request.form["iban"]

    new_user = User(username=username, email=email, password=password)

    db.session.add(new_user)
    db.session.commit()

    token = generate_confirmation_token(email)
    confirm_url = url_for('confirm_email', token=token, _external=True)
    html = render_template('activate.html', confirm_url=confirm_url, username=new_user.username)
    subject = "Please confirm your email for GlobeRunner"
    send_email(new_user.email, subject, html)

    return jsonify({
        'name': new_user.username,
        'email': new_user.email
    })