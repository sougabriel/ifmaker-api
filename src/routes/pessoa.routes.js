module.exports = (app) => {
	const pessoa = require("../controllers/pessoa.controller.js");

	var router = require("express").Router();

	router.post("/", pessoa.adicionar);
	router.get("/", pessoa.consultarTodos);
	router.get("/:nome", pessoa.consultarPorNome);
	router.get("/p/:publico", pessoa.consultarPorPublico);
	router.get("/:id", pessoa.consultarPorId);
	router.put("/:id", pessoa.atualizar);
	router.delete("/:id", pessoa.removerPorId);
	router.delete("/", pessoa.removerTodos);

	app.use("/api/pessoa", router);
};
