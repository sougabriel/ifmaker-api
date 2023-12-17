const Acesso = require("../models/acesso.model");

// Usado para realizar operações como AND, OR, LIKE, etc
const { Op } = require("sequelize");

// Método para adicionar um registro no banco de dados
exports.adicionar = async (req, res) => {
	// Verifica se os campos de requisição são nulos/vazios
	if (!req.body.diaHoraEntrada || !req.body.pessoaId) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}
	// Cria o registro
	const acesso = {
		diaHoraEntrada: req.body.diaHoraEntrada,
		finalidade: req.body.finalidade,
		pessoaId: req.body.pessoaId,
	};
	// Inseri o registro no banco
	await Acesso.create(acesso)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || "Falha ao tentar criar novo acesso.",
			});
		});
};

// Método para consultar todos os registros no banco de dados
exports.consultarTodos = async (req, res) => {
	try {
		const acesso = await Acesso.findAll({
			// Ordena a lista de registro pelos últimos inseridos
			order: [["createdAt", "DESC"]],
		});
		res.send(acesso);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: "Erro ao recuperar acesso",
		});
	}
};

// Consulta todos os registros ordenados por data
exports.consultarTodosOrdData = async (req, res) => {
	try {
		const acesso = await Acesso.findAll({
			order: [["diaHoraEntrada", "DESC"]],
		});
		res.send(acesso);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: "Erro ao recuperar acesso",
		});
	}
};

// Consulta todos os registros com a data enviada na requisição
exports.consultarPorData = async (req, res) => {
	const data = req.params.data;
	await Acesso.findAll({
		where: { diaHoraEntrada: { [Op.substring]: data } },
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

// Consultar todos registros pelo id da pessoa enviada na requisição
exports.consultarPorPessoa = async (req, res) => {
	const pessoaId = req.params.pessoaId;
	await Acesso.findAll({
		where: { pessoaId: pessoaId },
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
exports.atualizar = async (req, res) => {
	const id = req.params.id;
	await Acesso.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Acesso alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar acesso com id = ${id}. 
					Talvez o acesso não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao alterar acesso com id = ${id}.`,
			});
		});
};

// Remove o registro pelo id enviado na requisição
exports.removerPorId = async (req, res) => {
	const id = req.params.id;
	await Acesso.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Acesso foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover acesso com id = ${id}. 
					Talvez o acesso não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao remover acesso com id = ${id}.`,
			});
		});
};
