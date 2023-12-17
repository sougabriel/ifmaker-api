require("dotenv").config();
const express = require("express");
const cors = require("cors");
var multer = require('multer');
var upload = multer();
var bodyParser = require("body-parser");

const app = express();

// URL de origem das requisições, apenas essa URL pode realizar requisições para o servidor
var corsOptions = {
	origin: process.env.ORIGIN_URL,
};
app.use(cors(corsOptions));

// Transforma solicitações do tipo - application/json
app.use(express.json());
app.use(bodyParser.json());

// Transforma solicitações do tipo - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// Transforma solicitações do tipo - multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

// Sincroniza as models do servidor com o banco de dados
const db = require("./src/models");
db.sequelize
	.sync()
	.then(() => {
		console.log("Sincronização com o banco de dados efetuada com sucesso.");
	})
	.catch((err) => {
		console.log("Falha ao sincronizar com o banco: " + err.message);
	});

// Rota raiz do servidor
app.get("/", (req, res) => {
	res.json({ message: "Essa é uma API para o IFMaker de IFFar - SVS." });
});

// Declaração das rotas da API
require("./src/routes/pessoa.routes")(app);
require("./src/routes/usuario.routes")(app);
require("./src/routes/material.routes")(app);
require("./src/routes/emprestimo.routes")(app);
require("./src/routes/projeto.routes")(app);
require("./src/routes/acesso.routes")(app);

// Inicia o Servidor na porta declarada
app.listen(process.env.PORT, () => {
	console.log(`Servidor ativo na porta: ` + process.env.PORT + `.`);
});
