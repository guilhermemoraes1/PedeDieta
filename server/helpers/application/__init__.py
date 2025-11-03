from flask import Flask
from flask_restful import Api

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"
app.secret_key = "ff2ff23f2f2ewffewewf"
api = Api(app)