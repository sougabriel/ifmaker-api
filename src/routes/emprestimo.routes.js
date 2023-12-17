module.exports = (app) => {
	const emprestimo = require("../controllers/emprestimo.controller.js");

	var router = require("express").Router();

	// Rota para criar
	router.post("/", emprestimo.adicionar);
	
	// Rotas para consultar
	router.get("/", emprestimo.consultarTodos);
	router.get("/:id", emprestimo.consultarPorId);
	router.get("/data/i/:dataInicial", emprestimo.consultarPorDataInicial);
	router.get("/data/f/:dataFinal", emprestimo.consultarPorDataFinal);
	router.get("/pessoa/:pessoaId", emprestimo.consultarPorPessoa);
	router.get("/material/:materialId", emprestimo.consultarPorMaterial);
	
	// Rota para alterar
	router.put("/:id", emprestimo.atualizar);
	
	// Rota para remover
	router.delete("/:id", emprestimo.removerPorId);

	// Rota raiz para as requisições
	app.use("/api/emprestimo", router);
};
