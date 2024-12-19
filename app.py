from flask import Flask, jsonify
import requests

app = Flask(__name__)

@app.route('/')
def home():
    return "Backend do FoodFlow!"

if __name__ == "__main__":
    app.run(debug=True)
# URL Backend: https://foodflow-nvcj.onrender.com

# Pegar os restaurantes
@app.route('/restaurantes', methods=['GET'])
def get_restaurants():
    url = 'https://joaopaulom1.github.io/FoodFlow/db.json'
    response = requests.get(url)
    if response.status_code == 200:
        dados = response.json()
        print(dados)
        return jsonify(dados)
    else:
        print(f'O erro foi: {response.status_code}')
get_restaurants()