module.exports = (app) => {
	const acesso = require("../controllers/acesso.controller.js");
	var router = require("express").Router();
	
	// Rota para criar
	router.post("/", acesso.adicionar);
	
	// Rotas para consultar
	router.get("/", acesso.consultarTodos);
	router.get("/:data", acesso.consultarPorData);
	router.get("/p/:pessoaId", acesso.consultarPorPessoa);
	router.get("/ord/data/", acesso.consultarTodosOrdData);
	
	// Rota para alterar
	router.put("/:id", acesso.atualizar);
	
	// Rota para remover
	router.delete("/:id", acesso.removerPorId);
	
	// Rota raiz para as requisições
	app.use("/api/acesso", router);
};
