const api = {
    async carregarDados() {
        try {
            const response = await fetch('https://joaopaulom1.github.io/FoodFlow/db.json')
            return await response.json()       
        } catch {
            alert("Erro ao carregar dados.") 
        }
    }
}

export default api;