module.exports = (sequelize, Sequelize) => {
	const Pessoa = require("./pessoa.model.js");
	const Usuario = sequelize.define("usuario", {
		nomeUsuario: {
			type: Sequelize.STRING(50),
			allowNull: false,
			unique: true,
		},
		senha: {
			type: Sequelize.STRING(16),
			allowNull: false,
		},
		nivel: {
			type: Sequelize.INTEGER(1),
			allowNull: false,
		},
		pessoaId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});
	
	Usuario.belongsTo(Pessoa, {
		foreignKey: "pessoaId",
		allowNull: false,
	});

	module.exports = Usuario;
};
