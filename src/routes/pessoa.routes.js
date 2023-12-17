module.exports = (app) => {
	const pessoa = require("../controllers/pessoa.controller.js");

	var router = require("express").Router();

	// Rota para criar
	router.post("/", pessoa.adicionar);
	
	// Rotas para consultar
	router.get("/", pessoa.consultarTodos);
	router.get("/n/:nome", pessoa.consultarPorNome);
	router.get("/p/:publico", pessoa.consultarPorPublico);
	router.get("/e/:email", pessoa.consultarPorEmail);
	router.get("/:id", pessoa.consultarPorId);
	
	// Rota para alterar
	router.put("/:id", pessoa.atualizar);
	
	// Rota para remover
	router.delete("/:id", pessoa.removerPorId);

	// Rota raiz para as requisições
	app.use("/api/pessoa", router);
};
