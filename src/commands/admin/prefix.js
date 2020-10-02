const { MessageEmbed } = require('discord.js')

const mongoose = require('mongoose')
const Guild = require('../../database/models/GuildConfig');

module.exports = {
    name: 'prefix',
    cooldown: 1,
    description: 'Comando disponível somente para administradores. É responsável por alterar o prefixo (padrão: !) usado pelo bot no servidor.',
    aliases: ['prefixo'],
	execute: async (client, message, args, isModerator) => {
        message.delete()
        
        if (!isModerator) return message.channel.send(new MessageEmbed().setDescription('Você não possui as permissões necessárias para utilizar este comando.')).then(m => m.delete({ timeout: 3000 }))

        const settings = await Guild.findOne({
            guildId: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                
                const createGuild = require('..//database/CreateGuild')
                createGuild(mongoose.Types.ObjectId(), message.guild.id, message.guild.name, process.env.PREFIX)

            }
        })

        if(args.lenght < 1) return message.channel.send(new MessageEmbed().setDescription(`Você precisa especificar o prefixo do servidor! O prefixo atual é: \`${settings.prefix}\``)).then(m => m.delete({ timeout: 3000 }))

        await settings.updateOne({
            prefix: args[0]
        });

        return message.channel.send(new MessageEmbed().setDescription(`O prefixo do seu servidor foi atualizado para: \`${args[0]}\``)).then(m => m.delete({ timeout: 3000 }))

	},
};