const Discord = require('discord.js');

const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);

    if (!queue) {
        const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
        return message.channel.send(notPlaylist).then(messageSent => messageSent.delete({ timeout: 1000 }));
    }

    queue.dispatcher.pause();

    const pauseEmbed = new Discord.MessageEmbed()
    pauseEmbed.setColor('#FFF200');
    pauseEmbed.setDescription(`**A playlist atual foi pausada.** Para retomar, use o comando \`!resume\`.`)
    return message.channel.send(pauseEmbed);

};

module.exports = {
    name: 'pause',
    description: 'Pausa a música reproduzindo atualmente na playlist.',
	aliases: ['pausar', 'pausa'],
    cooldown: 5,
    guildOnly: true,
    execute,
};