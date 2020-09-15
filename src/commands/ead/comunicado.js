const Discord = require('discord.js');

const execute = (client, message, args) => {

    const comunicadoEmbed = new Discord.MessageEmbed()
    .setColor(0xFFA07A)
    .setTitle(`**COMUNICADO:**`)
    .setDescription(args.splice(0).join(" ") + ' • @everyone');

    message.channel.send(comunicadoEmbed)
    message.delete()

}

module.exports = {
    name: 'comunicado',
    description: 'Cria um comunicado para avisar a todos do servidor de mensagens importantes.',
	aliases: ['aviso', 'urgente'],
    cooldown: 5,
    guildOnly: true,
    execute,
};