/* ==== SETUP ===== */

const Sequelize = require("sequelize");    
const Filme = require("./db");        //importa o modelo 'Filme'
const express = require("express");
const cors = require('cors');

const app = express();
app.use(cors());


/* ==== TELAS ==== */

app.get("/catalogo", function (req, res) {
    res.sendFile(__dirname + "/html/index.html");
});

app.get("/adicionar", function (req, res) {
    res.sendFile(__dirname + "/html/create.html");
});

app.get("/editar/:id", function (req, res) {

    res.sendFile(__dirname + "/html/update.html");
});

app.get("/detalhes/:id", function (req, res) {
    const { id } = req.params;
    res.sendFile(__dirname + "/html/details.html");
});

// rota do script
app.get("/script", function (req, res) {
    res.sendFile(__dirname + "/html/consomeAPI.js");
});

/* ==== QUERYS ==== */

//create
app.get("/create/:nome_filme/:sinopse/:estudio/:data_lancamento", async function (req, res) {

    const { nome_filme, sinopse, estudio, data_lancamento } = req.params;

    try {
        const novoFilme = await Filme.create({ nome_filme, sinopse, estudio, data_lancamento });
        res.status(200).json({ message: "Dados recebidos com sucesso!" });
    } catch (error){
        res.status(500).json({ message: `Erro ao cadastrar filme: ${error}` });
    }
});

//read all
app.get("/readAll", async function (req, res) {

    console.log("b1");

    try {
        const filmes = await Filme.findAll();
        console.log("b2");
        console.log("Filmes encontrados:", filmes); // Log para verificar
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar filmes: ${error}` });
    }
});

//read one
app.get("/readOne/:id", async function (req, res) {

    const {id} = req.params;

    try {
        const filme = await Filme.findByPk(id);
        res.json(filme);
    } catch (error) {
        res.status(500).json({ message: `Filme não encontrado: ${error}` });
    } 
});

//update
app.get("/update/:id/:nome_filme/:sinopse/:estudio/:data_lancamento", async function (req, res) {
    
    const { id, nome_filme, sinopse, estudio, data_lancamento } = req.params;

    try {
        const filme = await Filme.findByPk(id);
        if (!filme) {
            return res.status(404).json({ message: "Filme não encontrado para atualização." });
        }
        await Filme.update(
            { nome_filme, sinopse, estudio, data_lancamento },
            { where: { id } }
        );
        res.status(200).json({ message: "Filme atualizado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Ocorreu um erro ao atualizar o filme: ${error.message}` });
    }
});

//delete
app.get("/delete/:id", async function (req, res) {
    const { id } = req.params;
    try {
        const filme = await Filme.findByPk(id);
        if (!filme) {
            return res.status(404).json({ message: "Filme não encontrado para remoção." });
        }
        await Filme.destroy({ where: { id } });
        res.status(200).json({ message: "Filme deletado com sucesso!" });
    } catch (error) {
        res.status(500).json({ message: `Ocorreu um erro ao deletar filme: ${error.message}` });
    }
});

/* ==== INICIANDO SERVIDOR ==== */

app.listen(3031, function () {
    console.log("Servidor rodando na porta 3031")
});