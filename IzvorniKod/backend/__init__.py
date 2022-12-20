from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail
from dotenv import load_dotenv
import os

app = Flask(__name__)

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}/{os.getenv('POSTGRES_DB')}"
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SECURITY_PASSWORD_SALT'] = os.getenv('SECURITY_PASSWORD_SALT')

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config['MAIL_USERNAME'] = os.getenv('DEFAULT_FROM_EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('DEFAULT_FROM_EMAIL_PASSWORD')

app.config['MAIL_DEFAULT_SENDER'] = os.getenv('DEFAULT_FROM_EMAIL')

db = SQLAlchemy(app)
mail = Mail(app)

CORS(app)

if __name__ == '__main__':
    app.run(debug=True, host="0.0.0.0")

# import all views (+ db models?)
import backend.database.models
import backend.database.db_init
import backend.views.login_register_views.register
import backend.views.login_register_views.email_confirmation
import backend.views.login_register_views.login
import backend.views.location_views.update_location
import backend.views.location_views.get_locations
import backend.views.player_views.get_players
import backend.views.user_views.get_users

