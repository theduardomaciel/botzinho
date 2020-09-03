const token = process.env.TOKEN;
const Discord = require('discord.js');

const comunicadoEmbed = new Discord.MessageEmbed()
.setColor(0xFFA07A)
.setTitle(`**ESCOLHA UM STATUS:**`)
.setDescription(`⚠️ MANUTENÇÃO \n 🛑 ERRO \n ✅ NORMAL`);

function changeNickname(message, status) {
    try {
        message.guild.me.setNickname(status);
        message.channel.send(`O status do bot foi alterado para: \`${status}\`.`)
        message.channel.bulkDelete(2, true);
    } catch (error) {
        message.channel.send(`Não foi possível alterar o nome do BOT. \n Erro: ${error}`)
    }
}

const execute = (client, message, args, isModerator) => {

    if (!isModerator(message.member)) return message.reply('somente moderadores podem executar este comando.');

    if (!args) return changeNickname(message, args[0]);

    message.channel.send(comunicadoEmbed).then(embedMessage => {

        embedMessage.react('⚠️')
        embedMessage.react('🛑')
        embedMessage.react('✅')

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
                changeNickname(message, '⚠️ MANUTENÇÃO!')
                client.user.setStatus('idle', 'Estou offline no momento. Provavelmente atualizações a caminho.'); 
            }
        })
        errorCollector.on('collect', (reaction, user) => {
            if (!user.bot) {
                changeNickname(message, '🛑 ERRO!')
                client.user.setStatus('idle', 'Um erro grave está sendo corrigido no momento.'); 
            }
        })
        normalCollector.on('collect', (reaction, user) => {
            if (!user.bot) {
                changeNickname(message, 'Botzinho')
                client.user.setStatus('online', ''); 
            }
        })

    })

}

module.exports = {
    name: 'status',
    description: 'Disponível somente para moderadores. É responsável por alterar o status do bot',
    cooldown: 1,
    guildOnly: true,
    execute,
};