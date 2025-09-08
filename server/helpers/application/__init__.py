from flask import Flask
from flask_restful import Api

app = Flask(__name__)

app.config['SQLALCHEMY_DATABASE_URI'] = "sqlite:///database.db"

api = Api(app)