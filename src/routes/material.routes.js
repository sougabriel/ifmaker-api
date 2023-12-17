module.exports = (app) => {
	const material = require("../controllers/material.controller.js");

	var router = require("express").Router();

	// Rota para criar
	router.post("/", material.adicionar);

	// Rotas para consultar
	router.get("/", material.consultarTodos);
	router.get("/:id", material.consultarPorId);
	router.get("/n/:nome", material.consultarPorNome);
	router.get("/t/:tipo", material.consultarPorTipo);

	// Rota para alterar
	router.put("/:id", material.atualizar);

	// Rota para remover
	router.delete("/:id", material.removerPorId);

	// Rota raiz para as requisições
	app.use("/api/material", router);
};
