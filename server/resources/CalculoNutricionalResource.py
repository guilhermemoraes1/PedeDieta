from flask_restful import Resource, reqparse
from flask import request

class CalculoNutricionalResource(Resource):
    def post(self):
        data = request.get_json()

        # Pegando os dados recebidos
        idade = data.get("idade")
        peso = data.get("peso")
        altura = data.get("altura")
        sexo = data.get("sexo")
        atividadeFisica = data.get("atividadeFisica")
        objetivo = data.get("objetivo")

        # Aqui você pode fazer cálculos, salvar no banco, etc.
        # Exemplo: calculando TMB (Taxa Metabólica Basal) simples
        if sexo == "masculino":
            tmb = 10 * float(peso) + 6.25 * float(altura) - 5 * float(idade) + 5
        elif sexo == "feminino":
            tmb = 10 * float(peso) + 6.25 * float(altura) - 5 * float(idade) - 161
        else:
            return {"erro": "Sexo inválido"}, 400

        # Fator de atividade física
        fatores_atividade = {
            "sedentario": 1.2,
            "leve": 1.375,
            "moderada": 1.55,
            "intensa": 1.725
        }

        fator = fatores_atividade.get(atividadeFisica)
        if not fator:
            return {"erro": "Nível de atividade física inválido"}, 400

        # Calcular gasto calórico diário
        gasto_calorico = tmb * fator

        
        # Ajuste com base no objetivo
        if objetivo == "perder":
            gasto_calorico -= 500  # déficit calórico
            objetivo = "Perder peso"
        elif objetivo == "ganhar":
            gasto_calorico += 500  # superávit calórico
            objetivo = "Ganhar peso"
        else:
            objetivo = "Manter peso"
        # manter: sem alteração

        return {
            "tmb": round(tmb),
            "gasto_calorico": round(gasto_calorico),
            "objetivo": objetivo
        }, 200
