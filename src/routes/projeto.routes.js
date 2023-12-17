module.exports = (app) => {
	const projeto = require("../controllers/projeto.controller.js");

	var router = require("express").Router();

	// Rota para criar
	router.post("/", projeto.adicionar);
	
	// Rotas para consultar
	router.get("/", projeto.consultarTodos);
	router.get("/n/:nome", projeto.consultarPorNome);
	router.get("/:id", projeto.consultarPorId);
	
	// Rota para alterar
	router.put("/:id", projeto.atualizar);
	
	// Rota para remover
	router.delete("/:id", projeto.removerPorId);

	// Rota raiz para as requisições
	app.use("/api/projeto", router);
};
