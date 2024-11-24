// Setup
const express = require("express");
const cors = require("cors");

const api = express();
api.use(cors());

// Iniciar o servidor
api.listen(3032, () => {
    console.log("Servidor rodando na porta 3032");
});

// Endpoint para carregar o arquivo HTML
api.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/teste.html");
});

// Endpoint para carregar o arquivo HTML1
api.get("/html1", (req, res) => {
    res.sendFile(__dirname + "/html/teste1.html");
});

// Rota que recebe os valores do html
api.get("/create/:nome/:numero", async (req, res) => {
    const { nome, numero } = req.params; //recebe os parametros e salva em vars

    console.log(`Recebido: Nome=${nome}, Número=${numero}`);

    // Retornar uma resposta de sucesso para que possar ser lida pelo front
    res.status(200).json({ mensagem: "Dados recebidos com sucesso", nome, numero });
});
