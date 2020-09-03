const dotenv = require('dotenv');
const { MessageEmbed } = require('discord.js');
dotenv.config();

const prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	description: 'Uou! Inception! Mas enfim, é a lista de todos os meus comandos ou uma informação específica de um comando, assim como esta.',
	aliases: ['commands'],
	usage: '[nome do comando]',  
    cooldown: 5,
    guildOnly: false,
	execute(client, message, args) {
        const data = [];
        const { commands } = message.client;

        if (!args.length) {

            if (message.channel.type === 'dm') return message.channel.send(`**Para poder acessar a lista completa de comandos, vá para algum servidor e digite:** \`!help\`. \nCaso saiba qual comando quer consultar, **digite-o usando o seguinte formato:** \`!help [nome do comando]\`.`);

            const commandsEmbed = new MessageEmbed()
            .setColor(0x0099ff)
            .setTitle('**MEUS COMANDOS:**')
            .setURL('https://twitter.com/theduardomaciel')
            .setAuthor(message.guild.name, `https://cdn.discordapp.com/icons/${message.guild.id}/${message.guild.icon}.png`, 'https://discord.gg/Tnap8b')
            .setDescription(`Aqui está a lista de todos os meus comandos. \nVocê pode enviar \`${prefix}help [nome do comando]\` para acessar um comando específico. \nPara informações mais detalhadas sobre o bot, visite a wiki: https://github.com/extremeHubGit/botzinho/wiki`)
            .setTimestamp()
            .setFooter('Botzinho (by Edu)', 'https://images.emojiterra.com/twitter/512px/1f44c.png');

            commandsEmbed.addField(commands.map(command => command.name), `Estes comandos podem estar quebrados, portanto, caso encontre algum erro, reporte para: \`${'⇦eXt┒reMe#7743'}\` `, true);

            return message.author.send(commandsEmbed)
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('**lhe enviei uma mensagem com todos os meus comandos!**');
                })
                .catch(error => {
                    console.error(`Não foi possível mandar DM para ${message.author.tag}.\n`, error);
                    message.reply(`**parece que eu não consigo lhe mandar mensagens diretas (DMs)!** \n \`${message.author.tag}\` ,você as desativou?`);
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('este comando não é válido, tente novamente.');
        }

        const commandEmbed = new MessageEmbed()
        .setColor(0x0099ff)
        .setTitle(`\`!${command.name}\``)
        .setURL('https://twitter.com/theduardomaciel')
        .addField('**DESCRIÇÃO:**', command.description, true)
        if (command.aliases) commandEmbed.addField('**SINÔNIMOS:**', command.aliases.join(', '), true)
        .addField('**COOLDOWN:**', `\`${command.cooldown || 3} segundo(s)\``, true);

        message.channel.send(commandEmbed);

	},
};