from flask import Flask, jsonify
import requests
from flask_cors import CORS  # Importa o CORS

app = Flask(__name__)
CORS(app)  # Permite CORS para todas as rotas e origens

@app.route('/')
def home():
    return "Backend do FoodFlow!"

# Endpoint para pegar os restaurantes
@app.route('/restaurantes', methods=['GET'])
def get_restaurants():
    url = 'https://joaopaulom1.github.io/FoodFlow/db.json'  # Ou seu arquivo local
    response = requests.get(url)
    dados = response.json()  # Converte a resposta JSON em dados Python
    return jsonify(dados)  # Retorna os dados como JSON para o frontend

if __name__ == "__main__":
    app.run(debug=True)

get_restaurants()
CORS(app, resources={r"/restaurantes": {"origins": "http://127.0.0.1:5500"}})
