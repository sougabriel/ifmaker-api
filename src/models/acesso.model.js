module.exports = (sequelize, Sequelize) => {
	const Pessoa = require("./pessoa.model.js");
	const Acesso = sequelize.define("acesso", {
		dia: {
			type: Sequelize.DATEONLY,
			allowNull: false,
		},
		horaEntrada: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
        finalidade: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		idPessoa: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	Acesso.belongsTo(Pessoa, {
		foreignKey: "idPessoa",
		allowNull: false,
	});
	
	module.exports = Acesso;
};
