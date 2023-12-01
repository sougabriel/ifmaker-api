module.exports = (sequelize, Sequelize) => {
	const Pessoa = require("./pessoa.model.js");
	const Acesso = sequelize.define("acesso", {
        finalidade: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		pessoaId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	Acesso.belongsTo(Pessoa, {
		foreignKey: "pessoaId",
		allowNull: false,
	});
	
	module.exports = Acesso;
};
