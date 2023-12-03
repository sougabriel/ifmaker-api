const Emprestimo = require("../models/emprestimo.model");
const { Op } = require("sequelize");

exports.adicionar = (req, res) => {
	if (!req.body.dataInicial || !req.body.dataFinal || !req.body.pessoaId || !req.body.materialId) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	const emprestimo = {
		dataInicial: req.body.dataInicial,
		dataFinal: req.body.dataFinal,
		finalidade: req.body.finalidade,
		pessoaId: req.body.pessoaId,
		materialId: req.body.materialId,
	};

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

exports.consultarTodos = async (req, res) => {
	try {
		const emprestimo = await Emprestimo.findAll();
		res.send(emprestimo);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: "Erro ao recuperar emprestimo",
		});
	}
};

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
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar emprestimo com id = " +
						id +
						".",
			});
		});
};

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
				message:
					err.message || "\n" + "Erro ao tentar encontrar acesso.",
			});
		});
};

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
				message:
					err.message || "\n" + "Erro ao tentar encontrar acesso.",
			});
		});
};

exports.atualizar = (req, res) => {
	const pessoaId = req.params.pessoaId;
	const materialId = req.params.materialId;

	Emprestimo.update(req.body, {
		where: { [Op.and]: { pessoaId: pessoaId, materialId: materialId }, },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Emprestimo alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar emprestimo com id = ${id}. Talvez o emprestimo não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar emprestimo com id = " + id + ".",
			});
		});
};

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
					message: `Não foi possível remover emprestimo com id = ${id}. Talvez o emprestimo não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover emprestimo com id = " + id + ".",
			});
		});
};

// Métodos do Administrador
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
				message:
					err.message ||
					"\n" + "Erro ao tentar remover todos os materiais.",
			});
		});
};
