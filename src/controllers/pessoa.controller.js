const Pessoa = require("../models/pessoa.model");

// Usado para realizar operações como AND, OR, LIKE, etc
const { Op } = require("sequelize");

// Método para adicionar um registro no banco de dados
exports.adicionar = async (req, res) => {
	// Verifica se os campos de requisição são nulos/vazios
	if (!req.body.nome || !req.body.email || !req.body.publico) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}
	// Cria o registro
	const pessoa = {
		nome: req.body.nome,
		email: req.body.email,
		telefone: req.body.telefone,
		publico: req.body.publico,
	};
	// Inseri o registro no banco
	await Pessoa.create(pessoa)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Falha ao tentar criar nova pessoa.`,
			});
		});
};

// Método para consultar todos os registros no banco de dados
exports.consultarTodos = async (req, res) => {
	await Pessoa.findAll({
		// Ordena a lista de registro pelos últimos inseridos
		order: [["createdAt", "DESC"]],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Falha ao tentar encontrar por pessoas.`,
			});
		});
};

// Consulta todos os registros ordenados por nome
exports.consultarTodosOrdNome = async (req, res) => {
	await Pessoa.findAll({
		order: ["nome"],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Falha ao tentar encontrar por pessoas.`,
			});
		});
};

exports.consultarPorId = async (req, res) => {
	const id = req.params.id;
	await Pessoa.findByPk(id)
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
					`Erro ao tentar encontrar pessoa com id = ${id}.`,
			});
		});
};

// Consulta todos os registros pelo campo nome enviado na requisição
exports.consultarPorNome = async (req, res) => {
	const nome = req.params.nome;
	await Pessoa.findAll({
		where: {
			nome: { [Op.substring]: nome },
		},
	})
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
				message: err.message || `Erro ao tentar encontrar pessoa.`,
			});
		});
};

// Consulta todos os registros pelo campo email enviado na requisição
exports.consultarPorEmail = async (req, res) => {
	const email = req.params.email;
	await Pessoa.findAll({
		where: {
			email: { [Op.substring]: email },
		},
	})
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
				message: err.message || `Erro ao tentar encontrar pessoa.`,
			});
		});
};

// Consulta todos os registros pelo campo publico enviado na requisição
exports.consultarPorPublico = async (req, res) => {
	const publico = req.params.publico;
	await Pessoa.findAll({
		where: {
			publico: { [Op.substring]: publico },
		},
	})
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
				message: err.message || `Erro ao tentar encontrar pessoa.`,
			});
		});
};

// Altera as informações do registro pelo id com as informações enviadas na requisição
exports.atualizar = async (req, res) => {
	const id = req.params.id;
	await Pessoa.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Pessoa alterada com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar pessoa com id = ${id}. 
					Talvez a pessoa não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao alterar pessoa com id = ${id}.`,
			});
		});
};

// Remove o registro pelo id enviado na requisição
exports.removerPorId = async (req, res) => {
	const id = req.params.id;
	await Pessoa.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Pessoa foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover pessoa com id = ${id}. 
					Talvez a pessoa não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao remover pessoa com id = ${id}.`,
			});
		});
};

// Remove todos os registros no banco de dados
exports.removerTodos = async (req, res) => {
	await Pessoa.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} pessoas removidas com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao tentar remover todas as pessoas.`,
			});
		});
};
