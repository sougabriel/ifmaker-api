module.exports = (sequelize, Sequelize) => {
	const Projeto = require("./projeto.model.js");
    const Pessoa = require("./pessoa.model.js");
	const PessoaProjeto = sequelize.define("pessoaProjeto", {
		
	});

	Pessoa.belongsToMany(Projeto, {
		through: PessoaProjeto,
	});
	
	module.exports = PessoaProjeto;
};
