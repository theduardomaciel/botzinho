const { MessageEmbed } = require('discord.js');

const mongoose = require('mongoose')
const Guild = require('../../../database/models/GuildConfig');

const execute = async (client, message, args, isModerator) => {

    message.delete()
        
        if (!isModerator) return message.channel.send(new MessageEmbed().setDescription('Você não possui as permissões necessárias para utilizar este comando.'));

        //const channel = client.channels.cache.find(channel => channel.name === 'aulas-ead');

        const settings = await Guild.findOne({
            guildId: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                
                const createGuild = require('../../../database/CreateGuild')
                createGuild(mongoose.Types.ObjectId(), message.guild.id, message.guild.name, process.env.PREFIX, undefined, args[0], undefined)

            }
        })

        if(args.lenght < 1) return message.channel.send(new MessageEmbed().setDescription(`Você precisa especificar o ID do canal!\nDica: Para conseguir o ID de algum canal, clique com o botão direito e o copie.`));

        await settings.updateOne({
            eadChannel: args[0]
        });

        let channelName;

        try {
            channelName = client.channels.cache.get(args[0]);
            if (channelName === undefined) {
                message.channel.send(new MessageEmbed().setDescription(`O canal de EAD foi alterado para: \`${args[0]}\`, mas não consegui encontrá-lo. Por preucação, verifique se você inseriou o ID correto.`));
            }
        } catch (error) {
            console.log(error)
        }

        console.log(`O canal de EAD do servidor: ${settings.guildName} foi alterado para ${args[0]}.`)
        return message.channel.send(new MessageEmbed().setDescription(`O canal de envio das mensagens do EAD do seu servidor foi atualizado para: \`${channelName}\``));

};

module.exports = {
    name: 'ead-channel',
    description: 'Disponível somente para moderadores. Este comando é resposável por alterar o canal de envio de mensagens do sistema de EAD.',
	aliases: ['eadchannel', 'canalead'],
    cooldown: 5,
    guildOnly: true,
    execute,
};