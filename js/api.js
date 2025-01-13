// Note: Variable and functions names are in Portuguese as the project was initially developed this way.

const api = {
    async carregarDados() {
        try {
            const response = await fetch('https://joaopaulom1.github.io/FoodFlow/db.json')
            return await response.json()       
        } catch {
            alert("Error loading data.") 
        }
    }
}

export default api;