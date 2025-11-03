from flask_restful import Resource
from flask import request, jsonify
from flask_login import login_user, logout_user, current_user, login_required
from helpers.database import db
from models.Pessoa import Pessoa

class AuthLoginResource(Resource):
    def post(self):
        data = request.get_json()
        email = data.get("email")
        password = data.get("password")

        pessoa = Pessoa.query.filter_by(email=email, password=password).first()
        if not pessoa:
            return {"message": "Email ou senha incorretos"}, 401
        
        login_user(pessoa, remember=True)

        return {"message": "Login realizado com sucesso!", "user": {"id": pessoa.id, "nome": pessoa.nome, "email": pessoa.email}}   

class AuthLogoutResource(Resource):
    @login_required
    def post(self):
        logout_user()
        return {"message": "Logout realizado com sucesso"}, 200

class AuthSignupResource(Resource):
    def post(self):
        data = request.get_json()
        nome = data.get("nome")
        email = data.get("email")
        password = data.get("password")

        if not all([nome, email, password]):
            return {"message": "Todos os campos são obrigatórios"}, 400

        if Pessoa.query.filter_by(email=email).first():
            return {"message": "Email já cadastrado"}, 409

        nova_pessoa = Pessoa(nome=nome, email=email, password=password)
        db.session.add(nova_pessoa)
        db.session.commit()

        login_user(nova_pessoa, remember=True)

        return {
            "message": "Usuário criado e logado com sucesso",
            "user": {"id": nova_pessoa.id, "nome": nova_pessoa.nome, "email": nova_pessoa.email}
        }, 201

class AuthStatusResource(Resource):
    def get(self):
        if current_user.is_authenticated:
            return {
                "authenticated": True,
                "user": {"id": current_user.id, "nome": current_user.nome, "email": current_user.email}
            }, 200
        else:
            return {"authenticated": False}, 200
