const Pessoa = require("../models/pessoa.model");
const { Op } = require("sequelize");

exports.adicionar = (req, res) => {
	// Validação dos Campos
	if (!req.body.nome) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	const pessoa = {
		// campos de requisição
		nome: req.body.nome,
		email: req.body.email,
		telefone: req.body.telefone,
		publico: req.body.publico,
	};

	Pessoa.create(pessoa)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "\n" + "Falha ao tentar criar nova pessoa.",
			});
		});
};

exports.consultarTodos = (req, res) => {
	Pessoa.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar encontrar por pessoas.",
			});
		});
};

exports.consultarTodosOrdNome = (req, res) => {
	Pessoa.findAll({
		order: ["nome"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar encontrar por pessoas.",
			});
		});
};

exports.consultarPorId = (req, res) => {
	const id = req.params.id;

	Pessoa.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar pessoa com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar pessoa com id = " +
						id +
						".",
			});
		});
};

exports.consultarPorNome = (req, res) => {
	const nome = req.params.nome;

	Pessoa.findAll({ where: { nome: { [Op.like]: `%${nome}%` } } })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar pessoa com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar pessoa com id = " +
						id +
						".",
			});
		});
};

exports.consultarPorPublico = (req, res) => {
	const publico = req.params.publico;

	Pessoa.findAll({ where: { publico: { [Op.like]: `%${publico}%` } } })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar pessoa.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "\n" + "Erro ao tentar encontrar pessoa.",
			});
		});
};

exports.atualizar = (req, res) => {
	const id = req.params.id;

	Pessoa.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Pessoa alterada com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar pessoa com id = ${id}. Talvez a pessoa não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar pessoa com id = " + id + ".",
			});
		});
};

exports.removerPorId = (req, res) => {
	const id = req.params.id;

	Pessoa.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Pessoa foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover pessoa com id = ${id}. Talvez a pessoa não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover pessoa com id = " + id + ".",
			});
		});
};

exports.removerTodos = (req, res) => {
	Pessoa.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} pessoas removidas com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao tentar remover todas as pessoas.",
			});
		});
};
