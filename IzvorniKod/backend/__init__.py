from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail

app = Flask(__name__)
# ovaj link morate urediti u 'postgresql://postgres:<insert-password>@localhost/<insert-ime-baze>'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:elajekul@localhost/globe-runner'
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = 'secret'
app.config['SECURITY_PASSWORD_SALT'] = 'super_secret'

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config['MAIL_USERNAME'] = 'cdbreathers@gmail.com'
app.config['MAIL_PASSWORD'] = 'trtktpaxtmabsmsz'

app.config['MAIL_DEFAULT_SENDER'] = 'cdbreathers@gmail.com'

db = SQLAlchemy(app)
mail = Mail(app)

CORS(app)

if __name__ == '__main__':
    app.run()

# import all views (+ db models?)
import backend.models
import backend.views.register
import backend.views.email_confirmation
import backend.views.login
