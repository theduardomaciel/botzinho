const fs = require('fs');
const path = require('path');

const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;

const execute = (client, message, args, isModerator) => {

    if (!args[0]) return message.reply('por favor, indique um comando para recarregar.')

    const commandName = args[0].toLowerCase();
    
    // Chechando se o autor da mensagem é dono do bot
    if (!isModerator) return message.reply('desculpe, somente moderadores podem utilizar este comando');

    const command = message.client.commands.get(commandName)
        || message.client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

    if (!command) return message.channel.send(`Não há comando com nome ou sinônimo \`${commandName}\`, ${message.author}!`);
   
    const dir = './src/commands'
    try {
        fs.readdirSync(dir).forEach(dirs => {
            const commands = fs.readdirSync(path.join(dir, `${dirs}`)).filter(file => file.endsWith('.js'));
            for (const file of commands) {
                if (file.toString() == command.name + '.js') {
                    delete require.cache[require.resolve(`${path.resolve(__dirname, '..')}/${dirs}/${file.toString()}`)];
                }
            }
        });
    } catch(error) {
        message.channel.send('Um erro ocorreu ao tentar encontrar este comando...')
        console.log(error);
    }

    try {
        fs.readdirSync(dir).forEach(dirs => {
            const commands = fs.readdirSync(path.join(dir, `${dirs}`)).filter(file => file.endsWith('.js'));
            for (const file of commands) {
                if (file.toString() == command.name + '.js') {
                    const newCommand = require(`${path.resolve(__dirname, '..')}/${dirs}/${file.toString()}`)

                    message.client.commands.set(newCommand.name, newCommand);
                }
            }
        });

        message.channel.send(`O comando: \`${args[0]}\` foi corretamente recarregado.`);

    } catch (error) {
        console.log(error);
        message.channel.send(`Houve um erro enquanto o comando \`${command.name}\` era recarregado:\n` + '```' + error.message + '```');
    }

}

module.exports = {
    name: 'reload',
    description: 'Disponível somente para moderadores. É responsável por recarregar comandos.',
    cooldown: 1,
    execute,
};