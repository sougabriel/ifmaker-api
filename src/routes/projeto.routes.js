module.exports = (app) => {
	const projeto = require("../controllers/projeto.controller.js");

	var router = require("express").Router();

	router.post("/", projeto.adicionar);
	router.get("/", projeto.consultarTodos);
	router.get("/:id", projeto.consultarPorId);
	router.put("/:id", projeto.atualizarPorId);
	router.delete("/:id", projeto.removerPorId);
	router.delete("/", projeto.removerTodos);

	app.use("/api/projeto", router);
};
