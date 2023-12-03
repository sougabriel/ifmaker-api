module.exports = (sequelize, Sequelize) => {
	const Material = sequelize.define("material", {
		nome: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		tipo: {
			type: Sequelize.STRING(100),
			allowNull: false,
		},
		descricao: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
	});
	
	module.exports = Material;
};
