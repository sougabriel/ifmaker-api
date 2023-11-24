module.exports = (app) => {
	const emprestimo = require("../controllers/emprestimo.controller.js");

	var router = require("express").Router();

	router.post("/", emprestimo.adicionar);
	router.get("/", emprestimo.consultarTodos);
	router.get("/:id", emprestimo.consultarPorId);
	router.put("/:id", emprestimo.atualizar);
	router.delete("/:id", emprestimo.removerPorId);
	router.delete("/", emprestimo.removerTodos);

	app.use("/api/emprestimo", router);
};
