module.exports = (sequelize, Sequelize) => {
    const Pessoa = require("./pessoa.model.js");
    const Material = require("./material.model.js");

    // Cria a tabelas e seus campos
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
        },
        quantidade: {
            type: Sequelize.INTEGER,
            allowNull: true,
        }
	});

    // Cria relacionamento com a tabela Material e Pessoa
	Pessoa.belongsToMany(Material, {
		through: Emprestimo,
	});
	
	module.exports = Emprestimo;
};
