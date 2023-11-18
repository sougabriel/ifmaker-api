module.exports = (sequelize, Sequelize) => {
	const Pessoa = sequelize.define("pessoa", {
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		email: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		telefone: {
			type: Sequelize.INTEGER,
			allowNull: true,
		},
		publico: {
			type: Sequelize.STRING,
			allowNull: false,
		},
	});

	module.exports = Pessoa;
};
