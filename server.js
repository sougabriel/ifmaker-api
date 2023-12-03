require("dotenv").config();
const express = require("express");
const cors = require("cors");
var multer = require('multer');
var upload = multer();
var bodyParser = require("body-parser");

const app = express();

// URL de origem para requisições
var corsOptions = {
	origin: process.env.ORIGIN_URL,
};
app.use(cors(corsOptions));

// Analisar solicitações do tipo de conteúdo - application/json
app.use(express.json());
app.use(bodyParser.json());

// Analisar solicitações do tipo de conteúdo - application/x-www-form-urlencoded
app.use(express.urlencoded({ extended: true }));

// for parsing multipart/form-data
app.use(upload.array()); 
app.use(express.static('public'));

const db = require("./src/models");
db.sequelize
	.sync()
	.then(() => {
		console.log("Sincronização com o banco de dados efetuada com sucesso.");
	})
	.catch((err) => {
		console.log("Falha ao sincronizar com o banco: " + err.message);
	});

// Rota Raiz
app.get("/", (req, res) => {
	res.json({ message: "Essa é uma API para o IFMaker de IFFar - SVS." });
});

require("./src/routes/pessoa.routes")(app);
require("./src/routes/usuario.routes")(app);
require("./src/routes/material.routes")(app);
require("./src/routes/emprestimo.routes")(app);
require("./src/routes/projeto.routes")(app);
require("./src/routes/acesso.routes")(app);

// Declara a porta para ouvir as requisições
app.listen(process.env.PORT, () => {
	console.log(`Servidor ouvindo a porta: ` + process.env.PORT + `.`);
});
