const PessoaProjeto = require("../models/pessoaProjeto.model");
const { Op } = require("sequelize");

exports.adicionar = (req, res) => {
	if (!req.body.idPessoa || !req.body.idProjeto) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	const pessoaprojeto = {
		idPessoa: req.body.idPessoa,
		idProjeto: req.body.idProjeto,
	};

	PessoaProjeto.create(pessoaprojeto)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar criar novo pessoaprojeto.",
			});
		});
};

exports.consultarTodos = async (req, res) => {
	try {
		const pessoaprojeto = await PessoaProjeto.findAll();
		res.send(pessoaprojeto);
	} catch (err) {
		console.error(err);
		res.status(500).send({
			message: "Erro ao recuperar pessoaprojeto",
		});
	}
};

exports.consultarPorId = (req, res) => {
	const id = req.params.idPessoa;

	PessoaProjeto.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar pessoaprojeto com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar pessoaprojeto com id = " +
						id +
						".",
			});
		});
};

exports.atualizar = (req, res) => {
	const idPessoa = req.params.idPessoa;
	const idProjeto = req.params.idProjeto;

	PessoaProjeto.update(req.body, {
		where: { [Op.and]: [{ idPessoa: idPessoa }, { idProjeto: idProjeto }] },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "PessoaProjeto alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar pessoaprojeto com id = ${id}. Talvez o pessoaprojeto não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar pessoaprojeto com id = " + id + ".",
			});
		});
};

exports.removerPorId = (req, res) => {
	const idPessoa = req.params.idPessoa;
	const idProjeto = req.params.idProjeto;

	PessoaProjeto.destroy({
		where: { [Op.and]: [{ idPessoa: idPessoa }, { idProjeto: idProjeto }] },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "PessoaProjeto foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover pessoaprojeto com id = ${id}. Talvez o pessoaprojeto não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover pessoaprojeto com id = " + id + ".",
			});
		});
};

// Métodos do Administrador
exports.removerTodos = (req, res) => {
	PessoaProjeto.destroy({
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
