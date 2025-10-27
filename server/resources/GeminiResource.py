import requests
from flask_restful import Resource
from flask import request
import json
from config import Config


def prompt_sem_parametro():
    prompt_text = """
    Me dê sugestões de café da manhã, almoço e janta indicando a quantidade de calorias em cada refeição em formato de texto corrido, sem listas nem Markdown.
    """
    return test_gemini_api_simplificado(prompt_text)


def prompt_com_parametro(caloria):
    prompt_text = f"""
    Me sugira uma dieta com café da manhã, almoço e jantar, utilizando alimentos específicos e informando a quantidade aproximada de calorias de cada refeição. As refeições juntas devem totalizar exatamente {caloria} calorias. Apresente as respostas seguindo o seguinte formato fixo:

    Café da manhã: Total: calorias.

    Almoço: Total: calorias.

    Jantar: Total: calorias.

    Dieta de {caloria} calorias.

    Use texto corrido e direto, sem listas, sem Markdown, sem marcação de texto, sem negrito, sem introduções ou explicações adicionais.
    """
    return test_gemini_api_simplificado(prompt_text)


def test_gemini_api_simplificado(prompt_text):
    api_url = f"https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key={Config.API_KEY}"
    payload = {"contents": [{"role": "user", "parts": [{"text": prompt_text}]}]}

    try:
        response = requests.post(api_url, json=payload)
        response.raise_for_status()
        result = response.json()
        generated_text = result["candidates"][0]["content"]["parts"][0]["text"]
        return generated_text
    except requests.exceptions.RequestException as e:
        return f"Erro na requisição HTTP: {e}"
    except (KeyError, IndexError) as e:
        return f"Erro ao processar a resposta da API: {e}"
    except Exception as e:
        return f"Ocorreu um erro inesperado: {e}"


# -------------------------------
# Resource do Flask-RESTful
# -------------------------------
class GeminiResource(Resource):
    def get(self):
        """GET: Sugestões de dieta sem parâmetro de calorias"""
        resultado = prompt_sem_parametro()
        return {"resultado": resultado}, 200

    def post(self):
        """POST: Sugestões de dieta com calorias específicas"""
        data = request.get_json()
        caloria = data.get("caloria")
        if caloria is None:
            return {"error": "O parâmetro 'caloria' é obrigatório."}, 400
        
        resultado = prompt_com_parametro(caloria)
        return {"resultado": resultado}, 200
