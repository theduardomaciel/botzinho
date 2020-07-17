const execute = (client, message) => {
    message.reply('Comando ainda não impplementado');
};

module.exports = {
    name: 'role',
    description: 'Atribui cargos a um usuário',
	aliases: [],
    cooldown: 1,
    execute,
};
