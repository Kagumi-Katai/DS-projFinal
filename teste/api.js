// Setup
const express = require("express");
const cors = require("cors");

const api = express();
api.use(cors());

// Iniciar o servidor
api.listen(3032, () => {
    console.log("Servidor rodando na porta 3032");
});

// Endpoint para servir o arquivo HTML
api.get("/", (req, res) => {
    res.sendFile(__dirname + "/html/teste.html");
});

// Endpoint para servir o arquivo HTML1
api.get("/html1", (req, res) => {
    res.sendFile(__dirname + "/html/teste1.html");
});

// Endpoint corrigido para criação
api.get("/create/:nome/:numero", async (req, res) => {
    const { nome, numero } = req.params;

    console.log(`Recebido: Nome=${nome}, Número=${numero}`);

    // Retornar uma resposta de sucesso
    res.status(200).json({ mensagem: "Dados recebidos com sucesso", nome, numero });
});
