# from flask import Flask
# from flask_cors import CORS
# from flask_sqlalchemy import SQLAlchemy
# from flask_login import LoginManager
# from os import path

# db = SQLAlchemy()

# def create_app():
#     app = Flask(__name__)
#     app.config['SECRET_KEY'] = "ofwOOb39439-=wq327FDEU>,f./aem2d92JGBRW93"
#     db.init_app(app)

#     CORS(app, supports_credentials=True)

#     from .api_gemini import api_gemini
#     from .auth import auth
#     from .models import User

#     with app.app_context():
#         create_database()

#     app.register_blueprint(auth, url_prefix='/')
#     app.register_blueprint(api_gemini, url_prefix='/')

#     login_manager = LoginManager()
#     login_manager.login_view = 'auth.login'
#     login_manager.init_app(app)

#     @login_manager.user_loader
#     def load_user(id):
#         return User.query.get(int(id))

#     return app

# def create_database():
#     if not path.exists('server/' + DB_NAME):
#         db.create_all()
#         print('Created Database!')