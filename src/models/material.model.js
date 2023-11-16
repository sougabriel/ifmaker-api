module.exports = (sequelize, Sequelize) => {
	const Material = sequelize.define("material", {
		nome: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		tipo: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		quantidade: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
		descricao: {
			type: Sequelize.TEXT,
			allowNull: true,
		},
	});
	
	module.exports = Material;
};
