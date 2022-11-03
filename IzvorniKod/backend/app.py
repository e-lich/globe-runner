import re
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_cors import CORS

app = Flask(__name__)
# ovaj link morate urediti u 'postgresql://postgres:<insert-password>@localhost/<insert-ime-baze>'
app.config['SQLALCHEMY_DATABASE_URI'] = 'postgresql://postgres:elajekul@localhost/globe-runner'
db = SQLAlchemy(app)
CORS(app)

@app.route('/')
def hello():
    return "Hello Backend!"

if __name__ == '__main__':
    app.run()
