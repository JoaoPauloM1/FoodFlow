import api from "./api.js";

async function renderizarRestaurantes() {
    const divRestaurantes = document.getElementById('container-restaurantes');

    try {
        const { restaurantes } = await api.carregarRestaurantes();
        divRestaurantes.innerHTML = '';

        let htmlContent = '';
        restaurantes.forEach(restaurante => {
            htmlContent += `
            <div class="container-restaurante">
                <div data-restaurante-id="${restaurante.id}">
                    <img src="${restaurante.capa}" class="capa-restaurante" />
                    <div class="conteudo-restaurante">
                        <span class="nome-restaurante">${restaurante.nome}</span>
                        <span class="descricao-restaurante">${restaurante.descricao}</span>
                    </div>
                    <div class="avaliacao-container">
                        <span class="avaliacao">${restaurante.avaliacao}</span>
                        <img src="../img/avaliacao.png" class="avaliacao-img" />
                    </div>
                </div>
            </div>
            `;
        });
        divRestaurantes.innerHTML = htmlContent;
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados.");
    }
}

renderizarRestaurantes();