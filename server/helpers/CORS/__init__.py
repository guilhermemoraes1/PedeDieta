from flask_cors import CORS

cors = CORS()

def init_app(app):
    cors.init_app(app, resources={r"/*": {"origins": ["http://localhost:3000", "http://127.0.0.1:3000"]}}, supports_credentials=True)