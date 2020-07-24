const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;

const execute = (client, message, args, ops) => {

    if (!args[0]) return message.reply('por favor, indique um comando para recarregar.')

    const commandName = args[0].toLowerCase();
    
    // Chechando se o autor da mensagem é dono do bot
    if (message.author.id !== ops.ownerID) return message.reply('desculpe, somente moderadores podem utilizar este comando');

    const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));
        
    if (!command) return message.channel.send(`Não há comando com nome ou sinônimo \`${commandName}\`, ${message.author}!`);

    delete require.cache[require.resolve(`./${command.name}.js`)];

    try {
        const newCommand = require(`./${command.name}.js`);
        message.client.commands.set(newCommand.name, newCommand);
    } catch (error) {
        console.log(error);
        message.channel.send(`Houve um erro enquanto o comando \`${command.name}\` era recarregado:\n\`${error.message}\``);
    }

    message.channel.send(`O comando: \`${args[0]}\` foi corretamente recarregado.`);

}

module.exports = {
    name: 'reload',
    description: 'Disponível somente para moderadores. É responsável por recarregar comandos.',
    cooldown: 1,
    execute,
};