const { MessageEmbed, Collection, MessageCollector } = require('discord.js')
const MessageModel = require('../../..//database/models/GuildConfig');

const mongoose = require('mongoose')
const Guild = require('../../..//database/models/GuildConfig');

const playCommand = require('..//play').execute;

module.exports = async (client, message, channel, createdMessage) => {

    let fetchedMessage = await createdMessage.fetch()

    try {
        
        const reactionsArray = [ '🔷', '⏯️', '⏹', '⏭', '🔁', '🔀', '⭐', '✖️' ];

        for (let i = 0; i < reactionsArray.length; i++) {
            const emoji = reactionsArray[i]
            await fetchedMessage.react(emoji)
            .catch(err => console.log(err));
        }

        console.log(`Todas as reações foram inseridas com sucesso.`);

        const settings = await Guild.findOne({
            guildId: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const createGuild = require('../../database/CreateGuild')
                createGuild(mongoose.Types.ObjectId(), message.guild.id, message.guild.name, process.env.PREFIX, undefined, undefined, channel.id, fetchedMessage.id);
                return message.channel.send(new Discord.MessageEmbed().setDescription('Este servidor não estava em meu banco de dados, ou algumas informações estavam desatualizadas. Já configurei tudo para você, então você agora estará apto a usar os comandos do bot!'));
            }
        })

        await settings.updateOne({
            musicChannel: channel.id,
            musicMessage: fetchedMessage.id,
        });

        const filter = m => m.author.id === message.author.id
        const collector = channel.createMessageCollector(filter);

    } catch (error) {
        console.error(error)
        let msg = await message.channel.send(`Houve um problema ao tentar configurar a barra de controle.
        Por favor, reutilize o comando \`!music-channel\` para criar outro canal. Caso o problema persista, o comando está quebrado e precisa de raparos.`);
    }

};