module.exports = (app) => {
	const usuario = require("../controllers/usuario.controller.js");

	var router = require("express").Router();

	// Rota para criar
	router.post("/", usuario.adicionar);

	// Rotas para consultar
	router.get("/", usuario.consultarTodos);
	router.get("/:id", usuario.consultarPorId);

	// Rota para logar
	router.post("/login", usuario.logar);

	// Rota para alterar
	router.put("/:id", usuario.atualizar);

	// Rota para remover
	router.delete("/:id", usuario.removerPorId);

	// Rota raiz para as requisições
	app.use("/api/usuario", router);
};
