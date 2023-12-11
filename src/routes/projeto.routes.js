module.exports = (app) => {
	const projeto = require("../controllers/projeto.controller.js");

	var router = require("express").Router();

	router.post("/", projeto.adicionar);
	router.get("/", projeto.consultarTodos);
	router.get("/n/:nome", projeto.consultarPorNome);
	router.get("/:id", projeto.consultarPorId);
	router.put("/:id", projeto.atualizarPorId);
	router.delete("/:id", projeto.removerPorId);

	app.use("/api/projeto", router);
};
