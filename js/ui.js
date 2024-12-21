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
            })
        })
        
    } catch (error) {
        console.error("Erro ao carregar dados:", error);
        alert("Erro ao carregar dados.");
    }
}

function filtrarRestaurantes(categoria) {
    const restaurantes = document.querySelectorAll(".container-restaurante");

    restaurantes.forEach(restaurante => {
        if (categoria === "todos") {
            // Mostrar todos os restaurantes
            restaurante.style.display = "block";
        } else if (restaurante.getAttribute("data-categoria") === categoria) {
            // Mostrar apenas os restaurantes que correspondem à categoria
            restaurante.style.display = "block";
        } else {
            // Ocultar os restaurantes que não correspondem à categoria
            restaurante.style.display = "none";
        }
    });
}

renderizarRestaurantes();