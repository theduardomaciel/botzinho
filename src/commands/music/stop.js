const Discord = require('discord.js');

const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);

    if (!queue) {
        message.delete()
        const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
        return message.channel.send(notPlaylist).then(messageSent => messageSent.delete({ timeout: 1000 }));
    }
    
    queue.musics = [];
    queue.loop = false
    queue.dispatcher.resume();
    
    client.queues.set(message.guild.id, queue);
    if (queue.dispatcher) {
        queue.dispatcher.end();
    }
    
};

module.exports = {
    name: 'stop',
    description: 'Interrompe a playlist tocando no momento.',
	aliases: ['parar'],
    cooldown: 10,
    guildOnly: true,
    execute,
};