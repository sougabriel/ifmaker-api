const Usuario = require("../models/usuario.model");

// Usado para realizar operações como AND, OR, LIKE, etc
const { Op } = require("sequelize");

// Método para adicionar um registro no banco de dados
exports.adicionar = async (req, res) => {
	// Verifica se os campos de requisição são nulos/vazios
	if (
		!req.body.nomeUsuario ||
		!req.body.senha ||
		!req.body.nivel ||
		!req.body.pessoaId
	) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}
	// Cria o registro
	const usuario = {
		nomeUsuario: req.body.nomeUsuario,
		senha: req.body.senha,
		nivel: req.body.nivel,
		pessoaId: req.body.pessoaId,
	};
	// Inseri o registro no banco
	await Usuario.create(usuario)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Falha ao tentar criar novo usuário.`,
			});
		});
};

// Retorna todos os usuários do banco de dados
exports.consultarTodos = async (req, res) => {
	await Usuario.findAll({
		order: [["createdAt", "DESC"]],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Falha ao tentar encontrar por usuários.`,
			});
		});
};

// Retorna um único usuário pelo id
exports.consultarPorId = async (req, res) => {
	const id = req.params.id;
	await Usuario.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar usuário com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					`Erro ao tentar encontrar usuário com id = ${id}.`,
			});
		});
};

// Método para verificar login do usuário
exports.logar = async (req, res) => {
	const nomeUsuario = req.body.nomeUsuario;
	const senha = req.body.senha;
	await Usuario.findAll({
		where: {
			// Seleciona usuário com os campos correspondentes à requisição
			[Op.and]: [{ nomeUsuario: nomeUsuario }, { senha: senha }],
		},
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Falha ao tentar encontrar por usuários.`,
			});
		});
};

// Altera usuário pelo id
exports.atualizar = async (req, res) => {
	const id = req.body.id;
	await Usuario.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Usuario alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar usuário com id = ${id}. 
					Talvez o usuário não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao alterar usuário com id = ${id}.`,
			});
		});
};

// Remove usuário pelo id
exports.removerPorId = async (req, res) => {
	const id = req.params.id;
	await Usuario.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Usuário foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover usuário com id = ${id}. 
					Talvez o usuário não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao remover usuário com id = ${id}.`,
			});
		});
};

// Remove todos os usuários do banco de dados
exports.removerTodos = async (req, res) => {
	await Usuario.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({
				message: `${nums} usuários removidos com sucesso!`,
			});
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao tentar remover todos os usuários.`,
			});
		});
};
