//create
async function createFunc() {

    const nome_filme = document.getElementById("nome_filme").value;
    const sinopse_filme = document.getElementById("descricao_filme").value;
    const estudio_filme = document.getElementById("estudio_filme").value;
    const data_lancamento = document.getElementById("data_filme").value;

    const urlCreate = `http://localhost:3031/create/${nome_filme}/${sinopse_filme}/${estudio_filme}/${data_lancamento}`;


    const response = await fetch(urlCreate, {
        method: 'GET',
    });

    console.log("i guess we're debuggin now :/")

    if (response.ok) {
        alert("Cadastro concluido");
        window.location.href = "index.html";
    } else {
        console.error('Erro ao criar filme');
    }
}

//readAll
async function readAllFunc() {
    const urlReadAll = "http://localhost:3031/readAll";
    const response = await fetch(urlReadAll);
    const filmes = await response.json();

    const container = document.getElementById("corpo_tabela_filmes");
    container.innerHTML = "";

    filmes.forEach((filme) => {
        const filmeRow = document.createElement('tr');
        filmeRow.innerHTML = `
        <td>${filme.nome_filme}</td> 
        <td>${filme.sinopse}</td> 
        <td>${filme.estudio}</td> 
        <td>${filme.data_lancamento}</td>
        <td>
            <a onclick="redirectDetails(${filme.id})" class='btn btn-info btn-sm'>Detalhes</a>   
            <a onclick="redirectUpdate(${filme.id})" class='btn btn-warning btn-sm'>Atualizar</a>
            <a onclick="deleteFunc(${filme.id})" class='btn btn-danger btn-sm'>Remover</a>  
        </td>`;
        container.appendChild(filmeRow);
    });
}

//readOne
async function readOneFunc(id) {

    const urlReadOne = `http://localhost:3031/readOne/${id}`;
    const response = await fetch(urlReadOne);
    const filme = await response.json();

    return filme;
}

//update
function redirectUpdate(id) {
    window.location.href = `update.html?id=${id}`;
}

async function getFilme() {

    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const filme = await readOneFunc(id);

    document.getElementById("nome_filme").placeholder = filme.nome_filme;
    document.getElementById("data_filme").value = filme.data_lancamento;
    document.getElementById("descricao_filme").placeholder = filme.sinopse;
    document.getElementById("estudio_filme").placeholder = filme.estudio;
}

async function updateFunc() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const nome_filme = document.getElementById("nome_filme").value;
    const sinopse_filme = document.getElementById("descricao_filme").value;
    const estudio_filme = document.getElementById("estudio_filme").value;
    const data_lancamento = document.getElementById("data_filme").value;

    const urlUpdate = `http://localhost:3031/update/${encodeURIComponent(id)}/${encodeURIComponent(nome_filme)}/${encodeURIComponent(sinopse_filme)}/${encodeURIComponent(estudio_filme)}/${encodeURIComponent(data_lancamento)}`;

    const response = await fetch(urlUpdate, {
        method: 'GET',
    });

    if (response.ok) {
        alert("Atualização realizada com sucesso!");
        window.location.href = 'index.html';
    } else {
        console.error('Erro ao atualizar filme');
    }
}

//delete
async function deleteFunc(id) {
    if (confirm(`Deseja mesmo deletar o dado de índice ${id}?`)) {
        const urlDelete = `http://localhost:3031/delete/${id}`;

        const response = await fetch(urlDelete, {
            method: 'GET'
        });

        if (response.ok) {
            readAllFunc();
        } else {
            console.error('Erro ao deletar filme');
        }
    }
}

function redirectDetails(id) {
    window.location.href = `details.html?id=${id}`;
}

async function details() {
    const params = new URLSearchParams(window.location.search);
    const id = params.get("id");

    const filme = await readOneFunc(id);

    document.getElementById("nome_filme").innerHTML = "Titulo do Filme:" + filme.nome_filme;
    document.getElementById("data_filme").innerHTML = "<strong>Data de lançamento: </strong> " + filme.data_lancamento;
    document.getElementById("sinopse_filme").innerHTML = "<strong>Sinopse: </strong>" + filme.sinopse;
    document.getElementById("estudio_filme").innerHTML = "<strong>Estudio: </strong>" + filme.estudio;
    document.getElementById("id_filme").innerHTML = "<strong>id: </strong>" + filme.id;
    document.getElementById("created_filme").innerHTML = "<strong>Adicionado em: </strong>" + filme.createdAt;
    document.getElementById("updated_filme").innerHTML = "<strong>Atualizado em: </strong>" + filme.updatedAt;
}


function pageVerify() {
    let page = document.getElementById("page_name").innerText;

    switch (page) {
        case "index":
            console.log("index page");
            readAllFunc();
            break;
        case "update":
            console.log("update page");
            getFilme();
            break;
        case "create":
            console.log("create page");
            break;
        case "details":
            console.log("details page");
            details();
        default:
            console.log("how tf do you get here?");
            break;
    }
}

function cancell() {
    if (confirm("Deseja descartar? as modificações feitas não serão salvas!")) {
        window.location.href = 'index.html';
    }
}

window.onload = function () {
    pageVerify();
};
