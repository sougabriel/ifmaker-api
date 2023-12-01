module.exports = (sequelize, Sequelize) => {
	const Pessoa = require("./pessoa.model.js");
	const Usuario = sequelize.define("usuario", {
		nomeUsuario: {
			type: Sequelize.STRING,
			allowNull: false,
			unique: true,
		},
		senha: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		nivel: {
			type: Sequelize.INTEGER,
			allowNull: false,
			defaultValue: 1,
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
