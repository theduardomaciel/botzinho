const Discord = require('discord.js');
const mongoose = require('mongoose');

const User = require('..//..//..//database/models/UserConfig');
const CreateUser = require('..//..//..//database/CreateUser');

const execute = async (client, message, {}, user) => {
    
    const queue = client.queues.get(message.guild.id);

    if (!queue) {
        const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
        return message.channel.send(notPlaylist).then(messageSent => messageSent.delete({ timeout: 1000 }));
    }

    const id = user.id;
    const name = user.username;

    const alreadyOnPlaylist = new Discord.MessageEmbed().setDescription(`A música atual já está em sua playlist pessoal, \`${name}\`!`);

    const settings = await User.findOne({
        userId: id
    }, (err, user) => {
        if (err) console.error(err);
        if (!user) {
            CreateUser(mongoose.Types.ObjectId(), id, name)
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Você não estava na minha lista de usuários, mas você foi adicionado. Por favor reutilize o comando para que eu possa adicionar a música à sua playlist pessoal \`${name}\`!`))
        }
        return;
    })

    const settingsLoaded = await settings;

    if (await settingsLoaded) {
        for (let i = 0; i < settingsLoaded.playlistLenght; i++) {
            if (settings.playlist[i]['url'] === queue.musics[0].url) return message.channel.send(alreadyOnPlaylist);
        }
    }

    if (!settingsLoaded) return;

    try {
        await settingsLoaded.updateOne(
            { $push: { playlist: { 
                title: queue.musics[0].title,
                url: queue.musics[0].url,
            }}}
        )
        await settingsLoaded.updateOne(
            { 
                playlistLenght: settingsLoaded.playlistLenght + 1
            }
        )
    } catch (error) {
        console.error(error)
    }

    const musicAdded = new Discord.MessageEmbed().setDescription(`A música \`${queue.musics[0].title}\` foi adicionada à sua playlist pessoal.`);
    return message.channel.send(musicAdded);

};

module.exports = {
    name: 'favorite',
    description: 'Favorita a música atual, adicionando-a em sua playlist pessoal.',
	aliases: ['favorito', 'favorita', 'favoritar'],
    cooldown: 5,
    guildOnly: true,
    execute,
};
