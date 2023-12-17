module.exports = (sequelize, Sequelize) => {
	
	// Cria a tabelas e seus campos
	const Projeto = sequelize.define("projeto", {
		nome: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		descricao: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
	});
	
	module.exports = Projeto;
};
