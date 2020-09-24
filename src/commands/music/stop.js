const Discord = require('discord.js');

const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
        return message.channel.send(notPlaylist);
    }
    queue.musics = [];
    queue.loop = false
    
    client.queues.set(message.guild.id, queue);
    queue.dispatcher.end();

};

module.exports = {
    name: 'stop',
    description: 'Interrompe a playlist tocando no momento.',
	aliases: ['parar'],
    cooldown: 10,
    guildOnly: true,
    execute,
};