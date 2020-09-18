const fs = require('fs');
const Discord = require('discord.js');

const dotenv = require('dotenv');
dotenv.config();

const path = require('path');

const prefix = process.env.PREFIX;
const token = process.env.TOKEN;

const client = new Discord.Client();

const cooldowns = new Discord.Collection();
client.queues = new Map();
client.commands = new Discord.Collection();

const dir = './src/commands'
try {
    fs.readdirSync(dir).forEach(dirs => {
        const commands = fs.readdirSync(path.join(__dirname, `./commands${path.sep}${dirs}`)).filter(file => file.endsWith('.js'));
        for (const file of commands) {
            const command = require(`./commands/${dirs}/${file}`);
            client.commands.set(command.name, command);
        }
    });
} catch (error) {
    console.log(error);
}

function isModerator(member) {
    if (member.roles.cache.some(role => role.name === 'Moderador')) {
        return true;
    } else {
        return false;
    }
}

let i = 0;
let activities = undefined;

client.on('ready', async () => {
    console.log('O bot foi iniciado');
    return;
    activities = [
        'EAD! Também conhecido como: Estresse-A-Distância.',
        '🐞REPORTE! Muitos dos comandos que deveriam funcionar podem estar quebrados!',
    ],

    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ %
        activities.length]}`, {
        type: 'PLAYING' }), 60000);
    // WATCHING, LISTENING, PLAYING, STREAMING
});

client.once('reconnecting', () => {
    console.log('O bot está reconectando!');
});

client.once('reconnecting', () => {
    console.log('O bot foi desconectado!');
});

// COMANDOS HOLDER

client.on('message', message => {
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

});

client.on('guildMemberAdd', (member) => {
    const joinResponse = `Olá! **${member.user.username}**, seja bem vindo ao servidor: **${member.guild.name}**!`
    const role = guild.roles.cache.find(role => role.name === 'EAD');

    if (!role) return console.log('Este cargo não existe');

    member.addRole(role);
    const channel = member.guild.channels.get('aulas-ead');
    if(!channel) return console.log("Canal não existe.");
    channel.send(joinResponse);
});

client.login(token);