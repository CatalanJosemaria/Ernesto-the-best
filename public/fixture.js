const JSON_PATH = 'https://www.mockachino.com/de73eb20-2dcd-41/users';

class Fixture {
    constructor() {
        this.onJsonReady = this.onJsonReady.bind(this);
        this.sortAsc = this.sortAsc.bind(this);
        this.sortDesc = this.sortDesc.bind(this);
    }

    loadPlatos() {
        fetch(JSON_PATH)
            .then(this.onResponse)
            .then(this.onJsonReady)
            .catch(error => {
                console.error('Error al cargar los datos de los platos:', error);
            });
    }

    onJsonReady(json) {
        console.log("Datos JSON recibidos:", json);

        // Asegúrate de que los datos se ajusten a la estructura esperada
        if (!json.collections) {
            console.error('Estructura del JSON inesperada:', json);
            return;
        }

        // Obtener todos los platos de todas las colecciones
        this.platosList = json.collections.flatMap(collection => collection.items || []);
        console.log("Lista de platos procesada:", this.platosList);

        this.renderTable();

        // Añadir eventos a los botones
        document.getElementById('ascButton').addEventListener('click', this.sortAsc);
        document.getElementById('descButton').addEventListener('click', this.sortDesc);
    }

    onResponse(response) {
        console.log("Respuesta recibida:", response);
        return response.json();
    }

    renderTable() {
        const tableBody = document.querySelector("#tablaPlatos");
        tableBody.innerHTML = ''; // Limpiar la tabla antes de renderizar

        this.platosList.forEach(plato => {
            const row = document.createElement('tr');
            row.innerHTML = `
                <td>${plato.name}</td>
                <td>${plato.price}</td>
                <td>${plato.description}</td>
            `;
            tableBody.append(row);
        });
    }

    sortAsc() {
        console.log("Ordenando ascendentemente...");
        this.platosList.sort((a, b) => a.price - b.price);
        this.renderTable();
    }

    sortDesc() {
        console.log("Ordenando descendentemente...");
        this.platosList.sort((a, b) => b.price - a.price);
        this.renderTable();
    }
}

// Instanciación de la clase App y carga de los platos
document.addEventListener('DOMContentLoaded', () => {
    const fixture = new Fixture();
    fixture.loadPlatos();
});