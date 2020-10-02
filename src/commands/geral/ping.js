const { MessageEmbed } = require('discord.js')

module.exports = {
    name: 'ping',
    cooldown: 5,
    description: 'Comando que mostra a atual latência entre servidor e cliente local (você, olha!) e a latência geral do bot.',
    aliases: ['lag', 'delay', 'ms'],
	execute: async (client, message, args) => {

        const msg = await message.channel.send('🏓 Verificando latência...')

        const pingEmbed = new MessageEmbed()
        pingEmbed.setColor('#800080')
        pingEmbed.setTitle('🏓 PONG!')
        pingEmbed.setDescription(`A latência atual do bot é **${Math.floor(msg.createdTimestamp - message.createdTimestamp)} ms** (milisegundos).\nLatência da API é de **${Math.round(client.ws.ping)}** ms.`);
        
        message.channel.send(pingEmbed);
	},
};