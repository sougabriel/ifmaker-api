require('dotenv').config();
const dbConfig = require("../config/db.config.js");

const Sequelize = require("sequelize");
const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
	host: process.env.DB_HOST,
	dialect: process.env.DB_DIALECT,
	operatorsAliases: 0,

	pool: {
		max: dbConfig.pool.max,
		min: dbConfig.pool.min,
		acquire: dbConfig.pool.acquire,
		idle: dbConfig.pool.idle,
	},
});

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.projeto = require("./projeto.model.js")(sequelize, Sequelize);
db.pessoa = require("./pessoa.model.js")(sequelize, Sequelize);
db.material = require("./material.model.js")(sequelize, Sequelize);
db.pessoaProjeto = require("./pessoaProjeto.model.js")(sequelize, Sequelize);
db.emprestimo = require("./emprestimo.model.js")(sequelize, Sequelize);
db.usuario = require("./usuario.model.js")(sequelize, Sequelize);
db.registro = require("./registro.model.js")(sequelize, Sequelize);
db.acesso = require("./acesso.model.js")(sequelize, Sequelize);

module.exports = db;
