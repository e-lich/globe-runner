from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
from pathlib import Path
import os
import time

time.sleep(5)

app = Flask(__name__)

path_to_env = Path('../.env')
load_dotenv(dotenv_path=path_to_env)

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://postgres:{os.getenv('POSTGRES_PASSWORD')}@postgres:5432/{os.getenv('POSTGRES_DB')}"
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
    app.run(debug=True, host="0.0.0.0")

# import all views (+ db models?)
import models
import views.register
import views.email_confirmation
import views.login
