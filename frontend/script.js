const url = 'https://foodflow-nvcj.onrender.com/restaurantes';

async function getRestaurants() {
    try {
        const response = await fetch(url);
        if (!response.ok) {
            throw new Error("Erro ao buscar dados");
        }
        const data = await response.json();
        displayRestaurants(data);
    } catch (error) {
        console.error("Erro: ", error);
    }
}

function displayRestaurants(restaurants) {
    const container = document.querySelector('.container-restaurantes');
    container.innerHTML = ''; // Limpa o contêiner

    restaurants.forEach(restaurant => {
        const restaurantElement = document.createElement('div');
        restaurantElement.classList.add('container-restaurantes');
        restaurantElement.innerHTML = `
            <img src="${restaurant.capa}" alt="${restaurant.nome}" class="capa-restaurante">
            <div class="restaurant-info">
                <span class="nome-restaurante">${restaurant.nome}</span>
                <span class="descricao-restaurante">${restaurant.descricao}</span>
                <div class="avaliacao">
                    <span>${restaurant.avaliacao}</span>
                    <img src="../img/avaliacao.png" alt="Estrela de Avaliação" class="avaliacao-img">
                </div>
            </div>
        `;
        container.appendChild(restaurantElement);
    });
}

window.onload = getRestaurants;
