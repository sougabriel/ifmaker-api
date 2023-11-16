module.exports = (app) => {
	const material = require("../controllers/material.controller.js");

	var router = require("express").Router();

	router.post("/", material.adicionar);
	router.get("/", material.consultarTodos);
	router.get("/:id", material.consultarPorId);
	router.put("/:id", material.atualizarPorId);
	router.delete("/:id", material.removerPorId);
	router.delete("/", material.removerTodos);

	app.use("/api/material", router);
};
