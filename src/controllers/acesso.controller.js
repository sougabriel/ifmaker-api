const Acesso = require("../models/acesso.model");
const { Op } = require("sequelize");

exports.adicionar = (req, res) => {
	if (!req.body.pessoaId) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	const acesso = {
		finalidade: req.body.finalidade,
		pessoaId: req.body.pessoaId,
	};

	Acesso.create(acesso)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || "\n" + "Falha ao tentar criar novo acesso.",
			});
		});
};

exports.consultarTodos = async (req, res) => {
	try {
		const acesso = await Acesso.findAll();
		res.send(acesso);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: "Erro ao recuperar acesso",
		});
	}
};

exports.consultarPorData = (req, res) => {
	const data = req.params.data;

	Acesso.findAll({
		where: { diaHoraEntrada: { [Op.eq]: `${data}` } } 
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
					err.message ||
					"\n" +
						"Erro ao tentar encontrar acesso.",
			});
		});
};

exports.atualizarPorId = (req, res) => {
	const id = req.params.id;

	Acesso.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Acesso alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar acesso com id = ${id}. Talvez o acesso não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar acesso com id = " + id + ".",
			});
		});
};

exports.removerPorId = (req, res) => {
	const id = req.params.id;

	Acesso.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Acesso foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover acesso com id = ${id}. Talvez o acesso não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover acesso com id = " + id + ".",
			});
		});
};

exports.removerTodos = (req, res) => {
	Acesso.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({
				message: `${nums} acessos removidos com sucesso!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao tentar remover todos os acessos.",
			});
		});
};
