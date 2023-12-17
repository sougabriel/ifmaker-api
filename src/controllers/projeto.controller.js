const Projeto = require("../models/projeto.model");

// Usado para realizar operações como AND, OR, LIKE, etc
const { Op } = require("sequelize");

// Método para adicionar um registro no banco de dados
exports.adicionar = async (req, res) => {
	// Verifica se os campos de requisição são nulos/vazios
	if (!req.body.nome) {
		res.status(400).send({
			message: "Quaisquer dos campos não podem ser vazios!",
		});
		return;
	}
	// Cria o registro
	const projeto = {
		nome: req.body.nome,
		descricao: req.body.descricao,
	};
	// Inseri o registro no banco
	await Projeto.create(projeto)
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message: err.message || `Falha ao tentar criar novo projeto.`,
			});
		});
};

// Método para consultar todos os registros no banco de dados
exports.consultarTodos = async (req, res) => {
	await Projeto.findAll({
		// Ordena a lista de registro pelos últimos inseridos
		order: [["createdAt", "DESC"]],
	})
		.then((data) => {
			res.send(data);
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Falha ao tentar encontrar por projetos.`,
			});
		});
};

// Consulta todos os registros pelo campo nome enviado na requisição
exports.consultarPorNome = async (req, res) => {
	const nome = req.params.nome;
	await Projeto.findAll({
		where: {
			// Seleciona os registros de contém a requisição
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

// Consulta um registro pelo id envido na requisição
exports.consultarPorId = async (req, res) => {
	const id = req.params.id;
	await Projeto.findByPk(id)
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar projeto com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					`"Erro ao tentar encontrar projeto com id = ${id}.`,
			});
		});
};

// Consulta todos os registros pelo campo nome enviado na requisição
exports.consultarPorNome = async (req, res) => {
	const nome = req.params.nome;
	await Projeto.findAll({
		where: {
			// Seleciona os registros que comtém a requisição
			nome: { [Op.like]: "%" + nome + "%" },
		},
	})
		.then((data) => {
			if (data) {
				res.send(data);
			} else {
				res.status(404).send({
					message: `Não foi possível encontrar projeto com id = ${id}.`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message ||
					`"Erro ao tentar encontrar projeto com id = ${id}.`,
			});
		});
};

// Altera as informações do registro pelo id com as informações enviadas na requisição
exports.atualizar = async (req, res) => {
	const id = req.params.id;
	await Projeto.update(req.body, {
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Projeto alterado com sucesso! ",
				});
			} else {
				res.send({
					message: `Não foi possível alterar projeto com id = ${id}. 
					Talvez o projeto não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao alterar projeto com id = ${id}.`,
			});
		});
};

// Remove o registro pelo id enviado na requisição
exports.removerPorId = async (req, res) => {
	const id = req.params.id;
	await Projeto.destroy({
		where: { id: id },
	})
		.then((num) => {
			if (num == 1) {
				res.send({
					message: "Projetos foi removido com sucesso!",
				});
			} else {
				res.send({
					message: `Não foi possível remover projetos com id = ${id}. 
					Talvez o projeto não exista ou a requisição esteja vazia!`,
				});
			}
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao remover projeto com id = ${id}.`,
			});
		});
};

// Remove todos os registros
exports.removerTodos = async (req, res) => {
	await Projeto.destroy({
		where: {},
		truncate: false,
	})
		.then((nums) => {
			res.send({ message: `${nums} projetos removidos com sucesso!` });
		})
		.catch((err) => {
			res.status(500).send({
				message:
					err.message || `Erro ao tentar remover todos os projetos.`,
			});
		});
};
