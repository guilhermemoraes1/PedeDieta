from helpers.application import app, api
from helpers.CORS import init_app
from helpers.database import db
from flask_login import LoginManager
from models.Pessoa import Pessoa

from resources.UsuarioResource import UsuarioResource, UsuariosResource
from resources.NutricionistaResource import NutricionistaResource, NutricionistasResource
from resources.DietaResource import DietaResource, DietasResource
from resources.CalculoNutricionalResource import CalculoNutricionalResource
from resources.GeminiResource import GeminiResource
from resources.AuthLoginResource import AuthLoginResource, AuthLogoutResource, AuthSignupResource, AuthStatusResource
from resources.AuthRegisterResource import AuthRegisterResource

init_app(app) 

login_manager = LoginManager()
login_manager.init_app(app)
login_manager.login_view = "auth/login"

@login_manager.user_loader
def load_user(user_id):
    return Pessoa.query.get(int(user_id))

api.add_resource(GeminiResource, '/gemini')

api.add_resource(UsuarioResource, '/usuarios')
api.add_resource(UsuariosResource, '/usuarios/<int:id>')

api.add_resource(NutricionistaResource, '/nutricionistas')
api.add_resource(NutricionistasResource, '/nutricionistas/<int:id>')

api.add_resource(AuthRegisterResource, "/auth/register")

api.add_resource(AuthLoginResource, "/auth/login")
api.add_resource(AuthLogoutResource, "/auth/logout")
api.add_resource(AuthSignupResource, "/auth/signup")
api.add_resource(AuthStatusResource, "/auth/status")

api.add_resource(DietaResource, '/dietas')
api.add_resource(DietasResource, '/dietas/<int:id>')

api.add_resource(CalculoNutricionalResource, '/calculo')

with app.app_context():
    db.create_all()