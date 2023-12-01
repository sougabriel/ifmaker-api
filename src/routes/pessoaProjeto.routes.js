module.exports = (app) => {
	const pessoaProjeto = require("../controllers/pessoaProjeto.controller.js");

	var router = require("express").Router();

	router.post("/", pessoaProjeto.adicionar);
	router.get("/", pessoaProjeto.consultarTodos);
	router.get("/:id", pessoaProjeto.consultarPorId);
	router.put("/:pessoaId/:idProjeto", pessoaProjeto.atualizar);
	router.delete("/:pessoaId/:idProjeto", pessoaProjeto.removerPorId);
	router.delete("/", pessoaProjeto.removerTodos);

	app.use("/api/pessoa-projeto", router);
};
