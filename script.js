const API_URL = 'http://localhost:3000/api/clients';

document.addEventListener('DOMContentLoaded', () => {
    carregarClients();
    document.getElementById('clientForm').addEventListener('submit', desarClient);
});

async function carregarClients() {
    const resposta = await fetch(API_URL);
    const clients = await resposta.json();
    
    const tbody = document.getElementById('clientsTableBody');
    tbody.innerHTML = '';
    
    clients.forEach(client => {
        const fila = document.createElement('tr');
        fila.innerHTML = `
            <td>${client.id}</td>
            <td>${client.nom}</td>
            <td>${client.cognoms}</td>
            <td>${client.telefon}</td>
            <td>${client.correu}</td>
            <td>${client.desti_viatge}</td>
            <td>
                <button onclick="editarClient(${client.id}, '${client.nom}', '${client.cognoms}', '${client.telefon}', '${client.correu}', '${client.desti_viatge}')">Editar</button>
                <button onclick="eliminarClient(${client.id})">Eliminar</button>
            </td>
        `;
        tbody.appendChild(fila);
    });
}

async function desarClient(event) {
    event.preventDefault();
    
    const id = document.getElementById('clientId').value;
    const client = {
        nom: document.getElementById('nom').value,
        cognoms: document.getElementById('cognoms').value,
        telefon: document.getElementById('telefon').value,
        correu: document.getElementById('correu').value,
        desti_viatge: document.getElementById('desti').value
    };

    const options = {
        method: id ? 'PUT' : 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(client)
    };

    const url = id ? `${API_URL}/${id}` : API_URL;
    await fetch(url, options);

    document.getElementById('clientForm').reset();
    document.getElementById('clientId').value = '';
    carregarClients();
}

function editarClient(id, nom, cognoms, telefon, correu, desti) {
    document.getElementById('clientId').value = id;
    document.getElementById('nom').value = nom;
    document.getElementById('cognoms').value = cognoms;
    document.getElementById('telefon').value = telefon;
    document.getElementById('correu').value = correu;
    document.getElementById('desti').value = desti;
}

async function eliminarClient(id) {
    if (confirm('Segur que vols eliminar aquest client?')) {
        await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
        carregarClients();
    }
}

document.getElementById('searchInput').addEventListener('input', () => {
    const searchValue = document.getElementById('searchInput').value.toLowerCase();
    const rows = document.querySelectorAll('#clientsTableBody tr');

    rows.forEach(row => {
        const nameCell = row.querySelector('td:nth-child(2)');
        if (nameCell) {
            const name = nameCell.textContent.toLowerCase();
            row.style.display = name.includes(searchValue) ? '' : 'none';
        }
    });
});
