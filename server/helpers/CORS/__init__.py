from flask_cors import CORS

cors = CORS()

def init_app(app):
    cors.init_app(app, resources={r"/*": {"origins": "http://localhost:3000"}}, supports_credentials=True)
