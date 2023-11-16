module.exports = (sequelize, Sequelize) => {
    const Pessoa = require("./pessoa.model.js");
    const Material = require("./material.model.js");
	const Emprestimo = sequelize.define("emprestimo", {
		dataInicial: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        dataFinal: {
            type: Sequelize.DATE,
            allowNull: false,
        },
        finalidade: {
            type: Sequelize.TEXT,
            allowNull: true,
        }
	});

	Pessoa.belongsToMany(Material, {
		through: Emprestimo,
	});
	
	module.exports = Emprestimo;
};
