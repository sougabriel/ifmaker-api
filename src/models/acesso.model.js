module.exports = (sequelize, Sequelize) => {
	const Pessoa = require("./pessoa.model.js");
	
	// Cria a tabela e seus campos
	const Acesso = sequelize.define("acesso", {
        diaHoraEntrada: {
			type: Sequelize.DATE,
			allowNull: false,
		},
		finalidade: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		pessoaId: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	// Cria relacionamento com a tabela Pessoa através do campo pessoaId
	Acesso.belongsTo(Pessoa, {
		foreignKey: "pessoaId",
		allowNull: false,
	});
	
	module.exports = Acesso;
};
