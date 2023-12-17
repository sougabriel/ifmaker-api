const Material = require("../models/material.model");

// Usado para realizar operações como AND, OR, LIKE, etc
const { Op } = require("sequelize");

// Método para adicionar um registro no banco de dados
exports.adicionar = async (req, res) => {
	// Verifica se os campos de requisição são nulos/vazios
	if (!req.body.nome || !req.body.tipo) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}
	// Cria o registro
	const material = {
		nome: req.body.nome,
		tipo: req.body.tipo,
		descricao: req.body.descricao,
	};
	// Inseri o registro no banco
	await Material.create(material)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Falha ao tentar criar novo material.`,
			});
		});
};

// Método para consultar todos os registros no banco de dados
exports.consultarTodos = async (req, res) => {
	try {
		const material = await Material.findAll({
			// Ordena a lista de registro pelos últimos inseridos
			order: [["createdAt", "DESC"]],
		});
		res.send(material);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: `Erro ao recuperar material.`,
		});
	}
};

// Consulta um registro pelo id
exports.consultarPorId = async (req, res) => {
	const id = req.params.id;
	await Material.findByPk(id)
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
					`Erro ao tentar encontrar material com id = ${id}.`,
			});
		});
};

// Consulta todos os registros com o nome enviado na requisição
exports.consultarPorNome = async (req, res) => {
	const nome = req.params.nome;
	await Material.findAll({
		where: {
			// Seleciona que contém a requisição
			nome: { [Op.substring]: nome },
		},
	})
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
				message: err.message || `Erro ao tentar encontrar material.`,
			});
		});
};

// Consulta todos os registros pelo campo tipo enviado na requisição
exports.consultarPorTipo = async (req, res) => {
	const tipo = req.params.tipo;
	await Material.findAll({ where: { tipo: { [Op.substring]: tipo } } })
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
				message: err.message || `Erro ao tentar encontrar material.`,
			});
		});
};

// Altera as informações do registro pelo id com as informações enviadas na requisição
exports.atualizar = async (req, res) => {
	const id = req.params.id;
	await Material.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Material alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar material com id = ${id}. 
					Talvez o material não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao alterar material com id = ${id}.`,
			});
		});
};

// Remove o registro pelo id enviado na requisição
exports.removerPorId = async (req, res) => {
	const id = req.params.id;
	await Material.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Material foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover material com id = ${id}. 
					Talvez o material não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao remover material com id = ${id}.`,
			});
		});
};

// Remove todos os registros
exports.removerTodos = async (req, res) => {
	await Material.destroy({
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
