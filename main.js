//setup
const Sequelize = require("sequelize");
const express = require("express");
const app = express();
const cors = require('cors');

app.use(cors());

const conn_BD = new Sequelize("locadora", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

//conexão com o banco
const Filme = conn_BD.define("filme", {
    nome_filme: {
        type: Sequelize.STRING
    },
    sinopse: {
        type: Sequelize.TEXT
    },
    estudio: {
        type: Sequelize.STRING
    },
    data_lancamento: {
        type: Sequelize.DATE
    }
});

//ROTAS
app.get("/", function (req, res){
    res.send("Página padrão")
});

//index
app.get("/index", function (req, res) {
    res.sendFile(__dirname + "./html/index.html");
});

//create
app.get("/create/:nome_filme/:sinopse/:estudio/:data_lancamento", async function (req, res) {
    const { nome_filme, sinopse, estudio, data_lancamento } = req.params;

    const novoFilme = await Filme.create({ nome_filme, sinopse, estudio, data_lancamento });
  
    res.json({
      resposta: "Filme criado com sucesso",
      filme: novoFilme,
    });
});

//read all
app.get("/readAll", async function (req, res) {
    try {
        const filmes = await Filme.findAll();
        res.json(filmes);
    } catch (error) {
        res.status(500).json({ message: `Erro ao buscar filmes: ${error}` });
    }
});

//read one
app.get("/readOne/:id", async function (req, res) {

    const {id} = req.params;
    const idNumber = parseInt(id, 10);

    const filme = await Filme.findByPk(id);
    if (filme === null) {
      console.log('Not found!');
    } 
    
    res.json(filme);
/*     res.status(500).json({ message: `Erro ao buscar filme de id${idNumber}: ${error}` }); */
    
});

//update
app.get("/update/:id/:nome_filme/:sinopse/:estudio/:data_lancamento", async function (req, res) {
    const { id, nome_filme, sinopse, estudio, data_lancamento } = req.params;
    const idNumber = parseInt(id, 10);
  
    const [updated] = await Filme.update(
      { nome_filme, sinopse, estudio, data_lancamento },
      {
        where: { id: idNumber },
      }
    );
  
    res.json({
      mensagem: "Filme atualizado com sucesso",
    });
});

//delete
app.get("/delete/:id", async function (req, res) {
    const { id } = req.params;
    const idNumber = parseInt(id, 10); // Converte o ID para número

    const deleted = await Filme.destroy({
        where: { id: idNumber },
    });

    if (deleted) {
        res.json({ mensagem: "Filme deletado com sucesso" });
    } else {
        res.status(404).json({ mensagem: "Filme não encontrado" });
    }
});

app.listen(3031, function () {
    console.log("Servidor rodando na porta 3031")
});