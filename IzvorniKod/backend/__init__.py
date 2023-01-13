from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS
from flask_mail import Mail
from flask_session import Session
from dotenv import load_dotenv
import os
import redis
from OpenSSL import SSL

app = Flask(__name__)

context = SSL.Context(SSL.SSLv23_METHOD)
context.use_privatekey_file('IzvorniKod/backend/server.key')
context.use_certificate_file('IzvorniKod/backend/server.crt')   

load_dotenv()

app.config['SQLALCHEMY_DATABASE_URI'] = f"postgresql://{os.getenv('POSTGRES_USER')}:{os.getenv('POSTGRES_PASSWORD')}@{os.getenv('POSTGRES_HOST')}/{os.getenv('POSTGRES_DB')}"
app.config['SQLALCHEMY_ECHO'] = True
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

app.config['SECRET_KEY'] = os.getenv('SECRET_KEY')
app.config['SECURITY_PASSWORD_SALT'] = os.getenv('SECURITY_PASSWORD_SALT')

app.config['SESSION_TYPE'] = 'redis'
app.config['SESSION_REDIS'] = redis.from_url(os.getenv('REDIS_URL'))
app.config['SESSION_PERMANENT'] = False
app.config['SESSION_USE_SIGNER'] = True

app.config['SESSION_COOKIE_SECURE'] = True
app.config['SESSION_COOKIE_SAMESITE'] = 'None'

app.config['MAIL_SERVER'] = 'smtp.googlemail.com'
app.config['MAIL_PORT'] = 465
app.config['MAIL_USE_TLS'] = False
app.config['MAIL_USE_SSL'] = True

app.config['MAIL_USERNAME'] = os.getenv('DEFAULT_FROM_EMAIL')
app.config['MAIL_PASSWORD'] = os.getenv('DEFAULT_FROM_EMAIL_PASSWORD')

app.config['MAIL_DEFAULT_SENDER'] = os.getenv('DEFAULT_FROM_EMAIL')

app.config['ALLOWED_HOSTS'] = ['localhost', '164.92.200.63', 'www.globerunner.games', 'globerunner.games']

db = SQLAlchemy(app)
mail = Mail(app)
server_session = Session(app)

CORS(app)

@app.after_request
def creds(response):
    response.headers.add('Access-Control-Allow-Credentials', 'true')
    # response.headers.add('Access-Control-Allow-Origin', 'http://localhost:3000')
    response.headers.add('Access-Control-Allow-Origin', 'globerunner.games, www.globerunner.games')
    response.headers.add('Access-Control-Allow-Headers', 'content-type')
    response.headers.add('Access-Control-Allow-Methods', 'GET, POST, DELETE, OPTIONS, PUT, HEAD')
    return response
    
if __name__ == '__main__':
    app.run(debug=False, host="0.0.0.0", ssl_context=context)

# import all views (+ db models?)
import backend.database.models
import backend.database.db_init
import backend.views.login_register_views.register
import backend.views.login_register_views.email_confirmation
import backend.views.login_register_views.login
import backend.views.login_register_views.logout
import backend.views.location_views.update_location
import backend.views.location_views.get_locations
import backend.views.location_views.add_location
import backend.views.player_views.get_players
import backend.views.user_views.get_users
import backend.views.user_views.update_user
import backend.views.user_views.delete_user
import backend.views.admin_views.get_cartographers
import backend.views.admin_views.update_cartographers
import backend.views.statistics_views.statistics
import backend.views.fight_views.get_challenges
import backend.views.fight_views.get_fight
import backend.views.fight_views.update_challenge
import backend.views.fight_views.update_fight
import backend.views.fight_views.delete_challenge
