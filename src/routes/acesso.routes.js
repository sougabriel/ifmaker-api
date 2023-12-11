module.exports = (app) => {
	const acesso = require("../controllers/acesso.controller.js");
	var router = require("express").Router();
	
	router.post("/", acesso.adicionar);
	router.get("/", acesso.consultarTodos);
	router.get("/:data", acesso.consultarPorData);
	router.get("/p/:pessoaId", acesso.consultarPorPessoa);
	router.get("/ord/data/", acesso.consultarTodosOrdData);
	router.put("/:id", acesso.atualizar);
	router.delete("/:id", acesso.removerPorId);
	
	app.use("/api/acesso", router);
};
