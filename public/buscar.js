const JSON_PATH = 'https://www.mockachino.com/de73eb20-2dcd-41/users'; 

class Menu {
    constructor() {
        this.onButtonClick = this.onButtonClick.bind(this);
        const buttons = document.querySelectorAll(".boton_menu");
        buttons.forEach(button => button.addEventListener("click", this.onButtonClick));
    }

    loadMenu() {
        return fetch(JSON_PATH)
            .then(this.onResponse)
            .then(json => json.collections)
            .catch(error => console.error('Error al cargar los datos del menú:', error));
    }

    onButtonClick(event) {
        const category = event.target.getAttribute("data-category");
        this.loadMenu().then(collections => {
            const collection = collections.find(col => col.name === category);
            if (collection) {
                this.mostrarResultado(category, collection.items);
            } else {
                this.mostrarResultado(category, []);
            }
        });
    }

    mostrarResultado(category, items) {
        const resultadosContainer = document.querySelector("#resultadosContainer");
        resultadosContainer.innerHTML = "";

        if (items && items.length > 0) {
            items.forEach(item => {
                const itemCard = document.createElement('div');
                itemCard.classList.add('card');
                itemCard.innerHTML = `
                    <div class="card-header">
                        <h2>${item.name}</h2>
                    </div>
                    <div class="card-body">
                        <p><strong>Descripción:</strong> ${item.description}</p>
                        <p><strong>Precio:</strong> $${item.price}</p>
                    </div>
                `;
                resultadosContainer.appendChild(itemCard);
            });
        } else {
            resultadosContainer.innerHTML = '<p class="no_encontrado">No se encontraron elementos en esta categoría.</p>';
        }
    }

    onResponse(response) {
        return response.json();
    }
}

const menu = new Menu();