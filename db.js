const Sequelize = require("sequelize");

// Configuração inicial para criar o banco de dados
const conn_initial = new Sequelize("", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

// Configuração da conexão para o banco de dados específico
const conn_BD = new Sequelize("locadora", "root", "", {
    host: "localhost",
    dialect: "mysql",
    logging: false,
});

// Definição do modelo
const Filme = conn_BD.define("filme", {
    nome_filme: { type: Sequelize.STRING },
    sinopse: { type: Sequelize.TEXT },
    estudio: { type: Sequelize.STRING },
    data_lancamento: { type: Sequelize.DATE },
});

// Função para criar o banco de dados
async function createDatabase() {
    try {
        await conn_initial.query("CREATE DATABASE IF NOT EXISTS locadora;");
        console.log('Banco de dados "locadora" criado ou já existe.');
    } catch (error) {
        console.error("Erro ao criar o banco de dados:", error);
    }
};

// Função de inicialização
async function initialize() {
    try {
        await createDatabase(); // Cria o banco de dados, caso não exista
        await conn_BD.sync();  // Sincroniza os modelos com o banco
        console.log("Tabela sincronizada com sucesso.");
    } catch (error) {
        console.error("Erro ao inicializar o banco de dados:", error);
    }
}

// Chamada da função de inicialização
initialize();

// Exportando o modelo
module.exports = Filme;