from sqlalchemy.orm import Mapped, mapped_column, relationship
from sqlalchemy import String, Integer
from marshmallow import Schema, fields, validate, validates, ValidationError
from app import db
from flask_login import UserMixin

class PessoaSchema(Schema):
    id = fields.Int(dump_only=True)
    nome = fields.Str(required=True, validate=validate.Length(min=3))
    email = fields.Email(required=True, validate=validate.Length(min=8))
    password = fields.Str(required=True, validate=validate.Length(min=8))

class Pessoa(db.Model, UserMixin):
    # __abstract__ = True
    __tablename__ = 'tb_pessoa'
    id: Mapped[int] = mapped_column(Integer,primary_key=True)
    nome: Mapped[str] = mapped_column(String, nullable=False)
    email: Mapped[str] = mapped_column(String(100), unique=True, nullable=False)
    password: Mapped[str] = mapped_column(String(130), nullable=False)
    tipo: Mapped[str] = mapped_column(String(50))

    
    __mapper_args__ = {
        "polymorphic_identity": "pessoa",
        "polymorphic_on": "tipo",
    }
    # Adiciona o relacionamento de um para muitos com a classe Dieta
    dietas_geradas = relationship('Dieta', back_populates='gerador', lazy=True, passive_deletes=True)

    def __init__(self, nome:str, email:str, password:str):
        self.nome = nome
        self.email = email
        self.password = password