const Discord = require('discord.js');

const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }

    const playingEmbed = new Discord.MessageEmbed().setTitle('MÚSICA ATUAL:')
    playingEmbed.setColor('#7289da');
    playingEmbed.setDescription(`Tocando agora: \`${queue.musics[0].title}\``)

    return message.channel.send(playingEmbed);
};

module.exports = {
    name: 'nowplaying',
    description: 'Mostra qual a música que está tocando atualmente.',
	aliases: ['tocando', 'agora', 'tocandoagora'],
    cooldown: 5,
    guildOnly: true,
    execute,
};