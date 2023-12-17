const Emprestimo = require("../models/emprestimo.model");

// Usado para realizar operações como AND, OR, LIKE, etc
const { Op } = require("sequelize");

// Método para adicionar um registro no banco de dados
exports.adicionar = (req, res) => {
	// Verifica se os campos de requisição são nulos/vazios
	if (!req.body.dataInicial || !req.body.dataFinal || !req.body.quantidade || !req.body.pessoaId || !req.body.materialId) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}
	// Cria o registro
	const emprestimo = {
		dataInicial: req.body.dataInicial,
		dataFinal: req.body.dataFinal,
		finalidade: req.body.finalidade,
		quantidade: req.body.quantidade,
		pessoaId: req.body.pessoaId,
		materialId: req.body.materialId,
	};
	// Inseri o registro no banco
	Emprestimo.create(emprestimo)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar criar novo emprestimo.",
			});
		});
};

// Método para consultar todos os registros no banco de dados
exports.consultarTodos = async (req, res) => {
	try {
		const emprestimo = await Emprestimo.findAll({
			// Ordena a lista de registro pelos últimos inseridos
			order: [
				['createdAt', 'DESC'],
			]
		});
		res.send(emprestimo);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: "Erro ao recuperar emprestimo",
		});
	}
};

// Consulta um registro pelo id
exports.consultarPorId = (req, res) => {
	const id = req.params.id;
	Emprestimo.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar emprestimo com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Erro ao tentar encontrar emprestimo com id = ${id}.`,
			});
		});
};

// Consulta todos os registros pela data inicial enviada na requisição
exports.consultarPorDataInicial = (req, res) => {
	const dataInicial = req.params.dataInicial;
	Emprestimo.findAll({
		where: { dataInicial: { [Op.substring]: dataInicial } },
	})
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar acesso.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro ao tentar encontrar acesso.",
			});
		});
};

// Consulta todos os registros pela data final enviada na requisição
exports.consultarPorDataFinal = (req, res) => {
	const dataFinal = req.params.dataFinal;
	Emprestimo.findAll({
		where: { dataFinal: { [Op.substring]: dataFinal } },
	})
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar acesso.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro ao tentar encontrar acesso.",
			});
		});
};

// Consulta todos os registros pelo id da pessoa enviado na requisição
exports.consultarPorPessoa = (req, res) => {
	const pessoaId = req.params.pessoaId;
	Emprestimo.findAll({
		where: { pessoaId: { [Op.eq]: pessoaId } },
	})
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar acesso.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro ao tentar encontrar acesso.",
			});
		});
};

// Consulta todos os registros pelo id do material enviado na requisição
exports.consultarPorMaterial = (req, res) => {
	const materialId = req.params.materialId;
	Emprestimo.findAll({
		where: { materialId: { [Op.eq]: materialId } },
	})
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar acesso.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Erro ao tentar encontrar acesso.",
			});
		});
};

// Altera as informações do registro pelo id com as informações enviadas na requisição
exports.atualizar = (req, res) => {
	const pessoaId = req.params.pessoaId;
	const materialId = req.params.materialId;
	Emprestimo.update(req.body, {
		where: { [Op.and]: { pessoaId: pessoaId, materialId: materialId }, },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Emprestimo alterado com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível alterar emprestimo com id = ${id}. 
					Talvez o emprestimo não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Erro ao alterar emprestimo com id = ${id}.`,
			});
		});
};

// Remove o registro pelo id enviado na requisição
exports.removerPorId = (req, res) => {
	const id = req.params.id;
	Emprestimo.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Emprestimo foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover emprestimo com id = ${id}. 
					Talvez o emprestimo não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Erro ao remover emprestimo com id = ${id}.`,
			});
		});
};

// Remove todos os registros
exports.removerTodos = (req, res) => {
	Emprestimo.destroy({
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
				message: err.message || "Erro ao tentar remover todos os materiais.",
			});
		});
};
