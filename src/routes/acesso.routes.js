module.exports = (app) => {
	const acesso = require("../controllers/acesso.controller.js");
	var router = require("express").Router();
	// Criar
	router.post("/", acesso.adicionar);
	// Consultar
	router.get("/", acesso.consultarTodos);
	router.get("/:data", acesso.consultarPorData);
	router.get("/p/:pessoaId", acesso.consultarPorPessoa);
	router.get("/ord/data/", acesso.consultarTodosOrdData);
	// Alterar
	router.put("/:id", acesso.atualizar);
	// Remover
	router.delete("/:id", acesso.removerPorId);
	
	app.use("/api/acesso", router);
};
