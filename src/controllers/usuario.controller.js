const Usuario = require("../models/usuario.model");

// Cria um novo usuário
exports.adicionar = (req, res) => {
	// Validação dos campos
	if (!req.body.senha || !req.body.nivel || !req.body.idPessoa) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	// Cria usuário
	const usuario = {
		senha: req.body.senha,
		nivel: req.body.nivel,
		idPessoa: req.body.idPessoa,
	};

	// Salva usuário no banco de dados
	Usuario.create(usuario)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "\n" + "Falha ao tentar criar novo usuário.",
			});
		});
};

// Retorna todos os usuários do banco de dados
exports.consultarTodos = (req, res) => {
	Usuario.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar encontrar por usuários.",
			});
		});
};

// Retorna um único usuário pelo id
exports.consultarPorId = (req, res) => {
	const id = req.params.id;

	Usuario.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar usuário com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar usuário com id = " +
						id +
						".",
			});
		});
};

// Altera usuário pelo id
exports.atualizarPorId = (req, res) => {
	const id = req.params.id;

	Usuario.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Usuario alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar usuário com id = ${id}. Talvez o usuário não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar usuário com id = " + id + ".",
			});
		});
};

// Remove usuário pelo id
exports.removerPorId = (req, res) => {
	const id = req.params.id;

	Usuario.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Usuário foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover usuário com id = ${id}. Talvez o usuário não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover usuário com id = " + id + ".",
			});
		});
};

// Remove todos os usuários do banco de dados
exports.removerTodos = (req, res) => {
	Usuario.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} usuários removidos com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao tentar remover todos os usuários.",
			});
		});
};
