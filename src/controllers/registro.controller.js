const Registro = require("../models/registro.model");

exports.adicionar = (req, res) => {
	if (!req.body.atividade || !req.body.descricao || !req.body.usuarioId) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}

	const registro = {
		atividade: req.body.atividade,
		descricao: req.body.descricao,
		usuarioId: req.body.usuarioId,
	};

	Registro.create(registro)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar criar novo registro.",
			});
		});
};

exports.consultarTodos = (req, res) => {
	Registro.findAll()
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Falha ao tentar encontrar por registro.",
			});
		});
};

exports.consultarPorId = (req, res) => {
	const id = req.params.id;

	Registro.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar registro com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" +
						"Erro ao tentar encontrar registro com id = " +
						id +
						".",
			});
		});
};

exports.atualizarPorId = (req, res) => {
	const id = req.params.id;

	Registro.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Registro alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar registro com id = ${id}. Talvez o registro não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao alterar registro com id = " + id + ".",
			});
		});
};

exports.removerPorId = (req, res) => {
	const id = req.params.id;

	Registro.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Registro foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover registro com id = ${id}. Talvez o registro não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao remover registro com id = " + id + ".",
			});
		});
};

exports.removerTodos = (req, res) => {
	Registro.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} registros removidos com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					"\n" + "Erro ao tentar remover todos os registros.",
			});
		});
};
