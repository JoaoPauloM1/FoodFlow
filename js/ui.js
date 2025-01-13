// Note: Variable and functions names are in Portuguese as the project was initially developed this way.

import api from "./api.js";

async function renderizarRestaurantes() {
    const divRestaurantes = document.getElementById('container-restaurantes');

    try {
        const { restaurantes } = await api.carregarDados();
        divRestaurantes.innerHTML = '';

        let htmlContent = '';
        restaurantes.forEach(restaurante => {
            htmlContent += `
            <div class="container-restaurante" data-categoria="${restaurante.categoria.toLowerCase()}">
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

        const botoes = document.querySelectorAll(".botoes");
        botoes.forEach((botao) => {
            botao.addEventListener("click", () => {
                const categoria = botao.getAttribute("data-categoria");
                filtrarRestaurantes(categoria);
            });
        });

        const nomesRestaurantes = document.querySelectorAll(".nome-restaurante");
        nomesRestaurantes.forEach(nome => {
            nome.addEventListener("click", (event) => {
                const restauranteId = nome.closest('[data-restaurante-id]').getAttribute('data-restaurante-id');
                exibirPratosRestaurante(restauranteId);
            });
        });

    } catch (error) {
        console.error("Error loading data:", error);
        alert("Error loading data.");
    }
}

function filtrarRestaurantes(categoria) {
    const restaurantes = document.querySelectorAll(".container-restaurante");

    restaurantes.forEach(restaurante => {
        if (categoria === "todos") {
            restaurante.style.display = "block";
        } else if (restaurante.getAttribute("data-categoria") === categoria) {
            restaurante.style.display = "block";
        } else {
            restaurante.style.display = "none";
        }
    });
}

async function exibirPratosRestaurante(restauranteId) {
    const divRestaurantes = document.getElementById('container-restaurantes');

    try {
        const { pratos, restaurantes } = await api.carregarDados();

        const restauranteSelecionado = restaurantes.find(rest => rest.id == restauranteId);

        if (!restauranteSelecionado) {
            alert("Error loading data.");
            return;
        }

        const nomeRestaurante = restauranteSelecionado.nome.toLowerCase().trim();
        const pratosFiltrados = pratos.filter(prato => 
            prato.restaurante.toLowerCase().trim() === nomeRestaurante
        );

        divRestaurantes.innerHTML = '';

        let htmlContent = `
            <h2 class="titulo-pratos">${restauranteSelecionado.nome}</h2>
            <div class="pratos-container">
        `;

        pratosFiltrados.forEach(prato => {
            htmlContent += `
            <div class="container-prato">
                <img src="${prato.capa}" class="capa-prato" />
                <div class="conteudo-prato">
                    <span class="nome-prato">${prato.nome}</span>
                    <span class="descricao-prato">${prato.descricao}</span>
                </div>
            </div>
            `;
        });

        htmlContent += `
            </div>
            <button id="voltar-restaurantes" class="botao-voltar">Back</button>
        `;

        divRestaurantes.innerHTML = htmlContent;

        const botaoVoltar = document.getElementById("voltar-restaurantes");
        botaoVoltar.addEventListener("click", () => {
            renderizarRestaurantes();
        });

    } catch (error) {
        console.error("Error loading data:", error);
        alert("Error loading data.");
    }
}
renderizarRestaurantes();