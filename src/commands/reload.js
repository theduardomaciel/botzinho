const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;

const execute = (client, message, args, ops) => {

    if (!args[0]) return message.reply('por favor, indique um comando para recarregar.')

    let commandName = args[0].toLowerCase();
    const command = message.client.commands.get(commandName)
    
    // Chechando se o autor da mensagem é moderador
    if (message.author.id !== ops.ownerID) return message.reply('desculpe, somente moderadores podem utilizar este comando');

    try { // Este vai ser um try statement, caso o comando não seja encontrado
        const newCommand = require(`./${command.name}.js`);
	    message.client.commands.set(newCommand.name, newCommand);
    } catch(error) {
        return message.channel.send(`Não possível recarregar o comando: \`${args[0]}\``)
    }

    message.channel.send(`O comando: \`${args[0]}\` foi corretamente recarregado.`);

}

module.exports = {
    name: 'reload',
    description: 'Disponível somente para moderadores. É responsável por recarregar comandos de EAD, reiniciando timestamps.',
    cooldown: 1,
    execute,
};