const Discord = require('discord.js');

const playlistEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('PLAYLIST ATUAL:')
.setAuthor('Botzinho', 'https://pbs.twimg.com/profile_images/1030607655478415366/LBoC35SF_400x400.jpg', 'https://twitter.com/theduardomaciel')
// .setThumbnail('https://i.imgur.com/wSTFkRM.png')

const execute = async (client, message) => {
    const queue = client.queues.get(message.guild.id);

    // Verificando se há uma playlist tocando...
    try {
        if (!queue) {
            const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
            return message.channel.send(notPlaylist);
        }
    } catch(error) {
        console.log(error);
    }


    // MOSTRANDO A MÚSICA TOCANDO ATUALMENTE
    if (queue.loopTimes > 0) {
        playlistEmbed.setDescription(`**TOCANDO AGORA:**\n[${queue.musics[0].title}](${queue.musics[0].url}) (x${queue.loopTimes})`);
    } else {
        playlistEmbed.setDescription(`**TOCANDO AGORA:**\n[${queue.musics[0].title}](${queue.musics[0].url})`);
    }
    // MOSTRANDO AS DEMAIS MÚSICAS DA PLAYLIST

    for (const l in queue.musics) {
        i = parseInt(l);
        if (!i == 0) {
            playlistEmbed.addField(`${i}. **${queue.musics[i].title}**`, queue.musics[i].url, false);
        }       
    }

    message.channel.send({ embed: playlistEmbed });
    playlistEmbed.fields = [];
    message.delete();
};

module.exports = {
    name: 'playlist',
    description: 'Mostra todas as músicas da playlist atual.',
	aliases: ['musiclist', 'pl', 'list'],
    cooldown: 1,
    guildOnly: true,
    execute,
};
