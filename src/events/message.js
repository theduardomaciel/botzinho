const Discord = require('discord.js');

const prefix = process.env.PREFIX
const cooldowns = new Discord.Collection();

function isModerator(member) {
    if (member.roles.cache.some(role => role.name === 'Moderador')) {
        return true;
    } else {
        return false;
    }
}

module.exports = (client, message) => {
    if (!message.content.startsWith(prefix) || message.author.bot) return;

    const args = message.content.slice(prefix.length).split(' ');
    const commandName = args.shift().toLowerCase();

    // Aliases System

    const command = client.commands.get(commandName)
		|| client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName));

	if (!command) return;

    // Retry Command System

    if (command.guildOnly && message.channel.type === 'dm') {
        return message.reply(`**Não é possível executar o comando: ${commandName} **em DM\'s (mensagens diretas)!`);
    }

    if (command.args && !args.length) {
        let reply = `Você não me deu nenhum argumento, ${message.author}!`;

		if (command.usage) {
			reply += `\nA forma correta de usar seria: \`${prefix}${command.name} ${command.usage}\``;
		}

		return message.channel.send(reply);
    }

    // Cooldown System

    if (!cooldowns.has(command.name)) {
        cooldowns.set(command.name, new Discord.Collection());
    }

    const now = Date.now();
    const timestamps = cooldowns.get(command.name);
    const cooldownAmount = (command.cooldown || 3) * 1000;


    if (timestamps.has(message.author.id)) {
        const expirationTime = timestamps.get(message.author.id) + cooldownAmount;

        if (now < expirationTime && !isModerator(message.member) ) {
            const timeLeft = (expirationTime - now) / 1000;
            return message.reply(`aguarde ${timeLeft.toFixed(1)} segundo(s) para poder usar o comando \`${command.name}\``);
        }
    }

    timestamps.set(message.author.id, now);
    setTimeout(() => timestamps.delete(message.author.id), cooldownAmount);

    // Commands System
    try {
        command.execute(client, message, args, isModerator);
    } catch (error) {
        console.error(error);
        message.reply('houve um erro ao tentar executar este comando, provavelmente o comando está quebrado!.');
    }
}