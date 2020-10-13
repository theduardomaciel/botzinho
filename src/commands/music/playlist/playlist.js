const Discord = require('discord.js');
const mongoose = require('mongoose');

// .setThumbnail('https://i.imgur.com/wSTFkRM.png')

const User = require('..//..//..//database/models/UserConfig');
const CreateUser = require('..//..//..//database/CreateUser');
const { set } = require('mongoose');

const execute = async (client, message, args) => {
    const queue = client.queues.get(message.guild.id);

    const playlistEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor('Botzinho', 'https://pbs.twimg.com/profile_images/1030607655478415366/LBoC35SF_400x400.jpg', 'https://twitter.com/theduardomaciel')

    const id = message.author.id;
    const name = message.author.username;

    const settings = await User.findOne({
        userId: id
    }, (err, user) => {
        if (err) console.error(err);
        if (!user) {
            CreateUser(mongoose.Types.ObjectId(), id, name)
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Você não estava na minha lista de usuários, mas você foi adicionado. Por favor reutilize o comando para que eu possa adicionar a música à sua playlist pessoal \`${name}\`!`))
        }
    })

    if (args[0] === 'my' || args[0] === 'minha') {
        playlistEmbed.setTitle(`PLAYLIST PESSOAL de ${name}`);
        for (let i = 0; i < settings.playlist.length; i++) {
            playlistEmbed.addField(`${i + 1}. **${settings.playlist[i]['title']}**`, settings.playlist[i]['url'], false);
        }
        return message.channel.send(playlistEmbed);
    }

    // Verificando se há uma playlist tocando...
    try {
        if (!queue && !args) {
            const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
            return message.channel.send(notPlaylist).then(messageSent => messageSent.delete({ timeout: 1000 }));
        }
    } catch(error) {
        console.log(error);
    }


    // MOSTRANDO A MÚSICA TOCANDO ATUALMENTE
    if (queue.loopTimes > 0) {
        playlistEmbed.setDescription(`**TOCANDO AGORA:**\n[${queue.musics[0].title}](${queue.musics[0].url}) (x${queue.loopTimes + 1})`);
    } else {
        playlistEmbed.setDescription(`**TOCANDO AGORA:**\n[${queue.musics[0].title}](${queue.musics[0].url})`);
    }
    // MOSTRANDO AS DEMAIS MÚSICAS DA PLAYLIST

    playlistEmbed.setTitle('PLAYLIST ATUAL:')

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
