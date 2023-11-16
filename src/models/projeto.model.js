module.exports = (sequelize, Sequelize) => {
	const Projeto = sequelize.define("projeto", {
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		descricao: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
	});
	
	module.exports = Projeto;
};
