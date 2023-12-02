module.exports = (app) => {
	const acesso = require("../controllers/acesso.controller.js");

	var router = require("express").Router();

	router.post("/", acesso.adicionar);
	router.get("/", acesso.consultarTodos);
	router.get("/:data", acesso.consultarPorData);
	router.put("/:id", acesso.atualizarPorId);
	router.delete("/:id", acesso.removerPorId);
	router.delete("/", acesso.removerTodos);

	app.use("/api/acesso", router);
};
