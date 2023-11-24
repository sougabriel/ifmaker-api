module.exports = (app) => {
	const pessoaProjeto = require("../controllers/pessoaProjeto.controller.js");

	var router = require("express").Router();

	router.post("/", pessoaProjeto.adicionar);
	router.get("/", pessoaProjeto.consultarTodos);
	router.get("/:id", pessoaProjeto.consultarPorId);
	router.put("/:idPessoa/:idProjeto", pessoaProjeto.atualizar);
	router.delete("/:idPessoa/:idProjeto", pessoaProjeto.removerPorId);
	router.delete("/", pessoaProjeto.removerTodos);

	app.use("/api/pessoa-projeto", router);
};
