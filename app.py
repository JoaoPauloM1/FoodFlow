from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/restaurantes', methods=['GET'])
def restaurantes():
    try:
        url = 'https://joaopaulom1.github.io/FoodFlow/db.json'
        response = requests.get(url)

        # Verifique se a resposta foi bem-sucedida
        if response.status_code == 200:
            dados = response.json()  # Converte a resposta para JSON
            return jsonify(dados)  # Retorna os dados como JSON
        else:
            return jsonify({"error": "Erro ao acessar o arquivo JSON"}), 500
    except Exception as e:
        # Caso ocorra um erro na requisição ou outro erro no servidor
        return jsonify({"error": str(e)}), 500

@app.route('/')
def home():
    return "Backend do FoodFlow!"

if __name__ == "__main__":
    app.run(host="0.0.0.0", port=5000)

restaurantes()