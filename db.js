const Sequelize = require("sequelize");

const conn = new Sequelize("locadora", "root", "", {
    host: "localhost",
    dialect: "mysql"
});

const Filme = conn.define("filmes", {
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

Filme.sync({force: true}); 

Filme.create({
    nome_filme: "Filme placeholder",
    sinopse: "Sinopse placeholder",
    estudio: "estudio placeholder",
    data_lancamento: new Date("2001-09-11"),
});