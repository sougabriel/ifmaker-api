const Projeto = require("../models/projeto.model");
const { Op } = require("sequelize");

exports.adicionar = (req, res) => {
	if (!req.body.nome) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	const projeto = {
		nome: req.body.nome,
		descricao: req.body.descricao,
	};

	Projeto.create(projeto)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "\n" + "Falha ao tentar criar novo projeto.",
			});
		});
};

exports.consultarTodos = (req, res) => {
	Projeto.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar encontrar por projetos.",
			});
		});
};

exports.consultarPorId = (req, res) => {
	const id = req.params.id;

	Projeto.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar projeto com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar projeto com id = " +
						id +
						".",
			});
		});
};

exports.consultarPorNome = (req, res) => {
	const nome = req.params.nome;

	Projeto.findAll({ where: { nome: { [Op.like]: "%" + nome + "%" } } })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar projeto com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar projeto com id = " +
						id +
						".",
			});
		});
};

exports.atualizarPorId = (req, res) => {
	const id = req.params.id;

	Projeto.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Projeto alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar projeto com id = ${id}. Talvez o projeto não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar projeto com id = " + id + ".",
			});
		});
};

exports.removerPorId = (req, res) => {
	const id = req.params.id;

	Projeto.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Projetos foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover projetos com id = ${id}. Talvez o projeto não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover projeto com id = " + id + ".",
			});
		});
};

exports.removerTodos = (req, res) => {
	Projeto.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} projetos removidos com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao tentar remover todos os projetos.",
			});
		});
};
