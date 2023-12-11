module.exports = (app) => {
	const usuario = require("../controllers/usuario.controller.js");

	var router = require("express").Router();

	// Cria um novo usuário
	router.post("/", usuario.adicionar);

	// Retorna todos os usuários
	router.get("/", usuario.consultarTodos);

	// Retorna um único usuário pelo id
	router.get("/:id", usuario.consultarPorId);
	router.post("/login", usuario.logar);

	// Altera usuário pelo id
	router.put("/:id", usuario.atualizar);

	// Remove usuário pelo id
	router.delete("/:id", usuario.removerPorId);

	app.use("/api/usuario", router);
};
