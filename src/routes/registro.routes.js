module.exports = (app) => {
	const registro = require("../controllers/registro.controller.js");

	var router = require("express").Router();

	router.post("/", registro.adicionar);
	router.get("/", registro.consultarTodos);
	router.get("/:id", registro.consultarPorId);
	router.put("/:id", registro.atualizarPorId);
	router.delete("/:id", registro.removerPorId);
	router.delete("/", registro.removerTodos);

	app.use("/api/registro", router);
};
