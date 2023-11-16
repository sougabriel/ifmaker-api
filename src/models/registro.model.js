module.exports = (sequelize, Sequelize) => {
	const Usuario = require("./usuario.model.js");
	const Registro = sequelize.define("registro", {
		atividade: {
			type: Sequelize.STRING,
			allowNull: false,
		},
		descricao: {
			type: Sequelize.TEXT,
			allowNull: false,
		},
		idUsuario: {
			type: Sequelize.INTEGER,
			allowNull: false,
		},
	});

	Registro.belongsTo(Usuario, {
		foreignKey: "idUsuario",
		allowNull: false,
	});
	
	module.exports = Registro;
};
