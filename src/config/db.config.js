module.exports = {
	pool: {
		max: 30, // Número máximo de clientes que podem estabelecer conexão simultaneamente
		min: 0, // Número mínimo de clientes que podem estabelecer conexão simultaneamente
		acquire: 30000, // Tempo máximo (em milissegundos) para obter conexão antes de causar erro
		idle: 10000, // Tempo máximo (em milissegundos) que uma conexão pode ficar ociosa ou aguardar qualquer operação do banco de dados
	},
};
