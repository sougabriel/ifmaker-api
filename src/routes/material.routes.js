module.exports = (app) => {
	const material = require("../controllers/material.controller.js");

	var router = require("express").Router();

	router.post("/", material.adicionar);
	router.get("/", material.consultarTodos);
	router.get("/:id", material.consultarPorId);
	router.get("/n/:nome", material.consultarPorNome);
	router.get("/t/:tipo", material.consultarPorTipo);
	router.put("/:id", material.atualizar);
	router.delete("/:id", material.removerPorId);
	router.delete("/", material.removerTodos);

	app.use("/api/material", router);
};
