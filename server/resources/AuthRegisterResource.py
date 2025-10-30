from flask_restful import Resource
from flask import request
from flask_login import login_user
from helpers.database import db
from models.Pessoa import Pessoa

class AuthRegisterResource(Resource):
    def post(self):
        data = request.get_json()
        nome = data.get("username")
        email = data.get("email")
        password = data.get("password")

        # Validação básica
        if not all([nome, email, password]):
            return {"message": "Todos os campos são obrigatórios"}, 400

        # Verifica se o email já existe
        if Pessoa.query.filter_by(email=email).first():
            return {"message": "Email já cadastrado"}, 409

        # Cria novo usuário
        nova_pessoa = Pessoa(nome=nome, email=email, password=password)
        db.session.add(nova_pessoa)
        db.session.commit()

        # Loga automaticamente o usuário após o registro
        login_user(nova_pessoa, remember=True)

        return {
            "message": "Usuário criado e logado com sucesso",
            "user": {
                "id": nova_pessoa.id,
                "nome": nova_pessoa.nome,
                "email": nova_pessoa.email
            }
        }, 201
