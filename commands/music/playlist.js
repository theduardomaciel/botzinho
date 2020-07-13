const Discord = require('discord.js');

const playlistEmbed = new Discord.MessageEmbed()
.setColor('#0099ff')
.setTitle('PLAYLIST ATUAL:')
.setAuthor('Botzinho • Por Edu (ex_) ', 'https://pbs.twimg.com/profile_images/1030607655478415366/LBoC35SF_400x400.jpg', 'https://twitter.com/theduardomaciel')
// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
.setTimestamp();

const execute = async (client, message) => {
    const queue = client.queues.get(message.guild.id);

    // Verificando se há uma playlist tocando...
    try {
        if (!queue) {
            await message.reply('não existe nenhuma playlist sendo reproduzida.')
            .then(msg => {
                message.delete();
                msg.delete({ timeout: 1000 });
            });
            return;
        }
    } catch(error) {
        console.log(error);
    }

    let i = undefined;
    let l = undefined;

    for (i in queue.musics) {
        l = parseInt(i);
        playlistEmbed.addField(`${l + 1}. **${queue.musics[i].title}**`, `**${queue.musics[i].url}**`, false);
    }
    message.channel.send({ embed: playlistEmbed });
    playlistEmbed.fields = [];
    message.delete();
};

module.exports = {
    name: 'playlist',
    description: 'Mostra todas as músicas da playlist atual.',
	aliases: ['musiclist', 'pl'],
    cooldown: 1,
    execute,
};
