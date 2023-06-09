from backend import app, db
from itsdangerous import URLSafeTimedSerializer
from flask import flash, redirect, url_for
from backend.database.models import Player, Cartographer
import datetime

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

# zamjena za home page dok se nemre redirectat na njega 
@app.route('/')
def home():
    return

@app.route('/confirm/<token>', methods=['GET'])
def confirm_email(token):
    try:
        email = confirm_token(token)
    except:
        return 'The confirmation link is invalid or has expired.', 'danger'
    user = Player.query.filter_by(email=email).first()
    if user is None:
        user = Cartographer.query.filter_by(email=email).first_or_404()
    if user.confirmed:
        return '''<html>
                        <body>
                            <center style="display:flex; justifyContent:center; alignItems:center; flex-direction:column">
                                <div style="padding-top: 250px; display:flex; justifyContent:center; alignItems:center; flex-direction:column">
                                    <h1 style="color:#ADD8E6; textAlign:center">
                                     Email Verification
                                  </h1>
                                    <h3 style="color:gray; textAlign:center ">
                                        Your account is already confirmed.
                                    </h3>
                                </div>
                            </center>
                        </body>
                    </html>
                ''', 'success'
    else:
        user.confirmed = True
        db.session.commit()
        return '''<html>
                        <body>
                            <center style="display:flex; justifyContent:center; alignItems:center; flex-direction:column">
                                <div style="padding-top: 250px; display:flex; justifyContent:center; alignItems:center; flex-direction:column">
                                    <h1 style="color:#ADD8E6; textAlign:center">
                                     Email Verification
                                  </h1>
                                    <h3 style="color:gray; textAlign:center ">
                                         Your email was verified.
                                    </h3>
                                    <h3 style="color:gray; textAlign:center ">
                                          You can continue using the application.
                                    </h3>
                                </div>
                            </center>
                        </body>
                    </html>
                ''', 'success'