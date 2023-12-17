module.exports = (sequelize, Sequelize) => {
	
	// Cria a tabelas e seus campos
	const Pessoa = sequelize.define("pessoa", {
		nome: {
			type: Sequelize.STRING(60),
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		telefone: {
			type: Sequelize.STRING(17),
			allowNull: true,
		},
		publico: {
			type: Sequelize.STRING(120),
			allowNull: false,
		},
	});

	module.exports = Pessoa;
};
