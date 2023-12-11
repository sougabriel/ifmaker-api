module.exports = (app) => {
	const pessoa = require("../controllers/pessoa.controller.js");

	var router = require("express").Router();

	router.post("/", pessoa.adicionar);
	router.get("/", pessoa.consultarTodos);
	router.get("/n/:nome", pessoa.consultarPorNome);
	router.get("/p/:publico", pessoa.consultarPorPublico);
	router.get("/e/:email", pessoa.consultarPorEmail);
	router.get("/:id", pessoa.consultarPorId);
	router.put("/:id", pessoa.atualizar);
	router.delete("/:id", pessoa.removerPorId);

	app.use("/api/pessoa", router);
};
