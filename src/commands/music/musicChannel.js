const { MessageEmbed } = require('discord.js');

const mongoose = require('mongoose')
const Guild = require('../../database/models/GuildConfig');


const execute = async (client, message, args, isModerator) => {

    message.delete()
        
        if (!isModerator) return message.channel.send(new MessageEmbed().setDescription('Você não possui as permissões necessárias para utilizar este comando.')).then(m => m.delete({ timeout: 3000 }))

        let channel;

        CreateChannel(message, 'músicas-playlist').then(createdChannel => {
            channel = createdChannel;
        })

        const settings = await Guild.findOne({
            guildId: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                
                const createGuild = require('../../database/CreateGuild')
                createGuild(mongoose.Types.ObjectId(), message.guild.id, message.guild.name, process.env.PREFIX, undefined, undefined, channel.id)

            }
        })

        if(args.lenght < 1) return message.channel.send(new MessageEmbed().setDescription(`Você precisa especificar o ID do canal!\nDica: Para conseguir o ID de algum canal, clique com o botão direito e o copie.`)).then(m => m.delete({ timeout: 3000 }))

        await settings.updateOne({
            musicChannel: channel.id
        });

        console.log(`O canal de música do servidor: ${settings.guildName} foi alterado para ${channel.name}.`)
        return message.channel.send(new MessageEmbed().setDescription(`O canal de músicas do seu servidor foi atualizado para: \`${channel.name}\``)).then(m => m.delete({ timeout: 3000 }));

};

module.exports = {
    name: 'music-channel',
    description: 'Disponível somente para moderadores. Este comando é resposável por alterar o canal principal de músicas do servidor.',
	aliases: ['musicchannel', 'canalmúsica', 'canalmusica'],
    cooldown: 5,
    guildOnly: true,
    execute,
};