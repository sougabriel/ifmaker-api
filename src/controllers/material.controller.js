const Material = require("../models/material.model");
const { Op } = require("sequelize");

exports.adicionar = (req, res) => {
	if (!req.body.nome || !req.body.tipo) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	const material = {
		nome: req.body.nome,
		tipo: req.body.tipo,
		descricao: req.body.descricao,
	};

	Material.create(material)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar criar novo material.",
			});
		});
};

exports.consultarTodos = async (req, res) => {
	try {
		const material = await Material.findAll({
			order: [
				['createdAt', 'DESC'],
			]
		});
		res.send(material);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: "Erro ao recuperar material",
		});
	}
};

exports.consultarPorId = (req, res) => {
	const id = req.params.id;

	Material.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar material com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar material com id = " +
						id +
						".",
			});
		});
};

exports.consultarPorNome = (req, res) => {
	const nome = req.params.nome;

	Material.findAll({ where: { nome: { [Op.substring]: nome } } })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar material.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "\n" + "Erro ao tentar encontrar material.",
			});
		});
};

exports.consultarPorTipo = (req, res) => {
	const tipo = req.params.tipo;

	Material.findAll({ where: { tipo: { [Op.substring]: tipo } } })
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar material.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "\n" + "Erro ao tentar encontrar material.",
			});
		});
};

exports.atualizar = (req, res) => {
	const id = req.params.id;

	Material.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Material alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar material com id = ${id}. Talvez o material não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar material com id = " + id + ".",
			});
		});
};

exports.removerPorId = (req, res) => {
	const id = req.params.id;

	Material.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Material foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover material com id = ${id}. Talvez o material não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover material com id = " + id + ".",
			});
		});
};

// Métodos do Administrador
exports.removerTodos = (req, res) => {
	Material.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({
				message: `${nums} materiais removidos com sucesso!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao tentar remover todos os materiais.",
			});
		});
};
