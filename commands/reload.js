const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;

const execute = (client, message, args, ops) => {

    if (!args[0]) return message.reply('por favor, indique um comando para recarregar.')

    let commandName = args[0].toLowerCase();
    
    // Chechando se o autor da mensagem é dono do bot
    if (message.author.id !== ops.ownerID) return message.reply('desculpe, somente moderadores podem utilizar este comando');

    try { // Este vai ser um try statement, caso o comando não seja encontrado

        delete require.cache[require.resolve(`./${commandName}.js`)];
        client.commands.delete(commandName);
        const pull = require(`./${commandName}.js`);
        client.commands.set(commandName, pull);

    } catch(error) {
        return message.channel.send(`Não possível recarregar o comando: ${args[0]}`)
    }

    message.channel.send(`O comando: \`${args[0]}\` foi corretamente recarregado.`);

}

module.exports = {
    name: 'reload',
    description: 'Disponível somente para moderadores. É responsável por recarregar comandos de EAD, reiniciando timestamps.',
    cooldown: 1,
    execute,
};