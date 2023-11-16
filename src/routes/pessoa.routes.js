module.exports = (app) => {
	const pessoa = require("../controllers/pessoa.controller.js");

	var router = require("express").Router();

	router.post("/", pessoa.adicionar);
	router.get("/", pessoa.consultarTodos);
	router.get("/:id", pessoa.consultarPorId);
	router.put("/:id", pessoa.atualizarPorId);
	router.delete("/:id", pessoa.removerPorId);
	router.delete("/", pessoa.removerTodos);

	app.use("/api/pessoa", router);
};
