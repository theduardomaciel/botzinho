const token = process.env.TOKEN;
const Discord = require('discord.js');

const comunicadoEmbed = new Discord.MessageEmbed()
.setColor(0xFFA07A)
.setTitle(`**ESCOLHA UM STATUS:**`)
.setDescription(`⚠️ MANUTENÇÃO \n 🛑 ERRO \n ✅ NORMAL`);

async function addReactions(client, embedMessage) {
    await embedMessage.react('⚠️')
    await embedMessage.react('🛑')
    await embedMessage.react('✅')

    const warningFilter = (reaction, user) => {
        return reaction.emoji.name === '⚠️' && reaction.users
    };

    const errorFilter = (reaction) => {
        return reaction.emoji.name === '🛑' && reaction.users
    };

    const normalFilter = (reaction) => {
        return reaction.emoji.name === '✅' && reaction.users
    };

    const warningCollector = new Discord.ReactionCollector(embedMessage, warningFilter);
    const errorCollector = new Discord.ReactionCollector(embedMessage, errorFilter);
    const normalCollector = new Discord.ReactionCollector(embedMessage, normalFilter);

    warningCollector.on('collect', (reaction, user) => {
        if (!user.bot) {
            embedMessage.guild.me.setNickname(`⚠️ MANUTENÇÃO!`);
            client.user.setActivity(`Estou offline no momento. Provavelmente atualizações a caminho.`, {type: 'idle' });
            embedMessage.delete();
        }
    })
    errorCollector.on('collect', (reaction, user) => {
        if (!user.bot) {
            embedMessage.guild.me.setNickname(`🛑 ERRO!`)
            client.user.setActivity(`Um erro grave está sendo corrigido no momento.`, {type: 'idle' });
            embedMessage.delete();
        }
    })
    normalCollector.on('collect', (reaction, user) => {
        if (!user.bot) {
            embedMessage.guild.me.setNickname(`Botzinho`)
            client.user.setActivity(``, {type: 'online' });
            embedMessage.delete();
        }
    })
}

const execute = (client, message, args, isModerator) => {

    if (!isModerator(message.member)) return message.reply('somente moderadores podem executar este comando.');

    if (!args[0]) {
        message.channel.send(comunicadoEmbed).then(embedMessage => {
            try {
                addReactions(client, embedMessage)
            } catch (error) {
                message.channel.send(`**Não foi possível enviar a mensagem de status com as reações.**\nPor favor, verifique o console do bot para corrigir o erro: ${error}`);
            }
        })
    }

    if (args[0]) return client.user.setUsername(args[0]);


}

module.exports = {
    name: 'status',
    description: 'Disponível somente para moderadores. É responsável por alterar o status do bot',
    cooldown: 1,
    guildOnly: true,
    execute,
};