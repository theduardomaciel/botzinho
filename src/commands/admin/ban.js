const { MessageEmbed } = require('discord.js')

const byUID = require('./robloxAdmin').byUID;
const byUser = require('./robloxAdmin').byUser;

const execute = (client, message, args, isModerator) => {

    const axios = require('axios');
    const scriptID = process.env.SCRIPT_ID + "/exec"

    if (!isModerator) return message.reply('somente moderadores podem executar este comando.')

    console.log(args[0])

    if (args[0] === 'roblox') {
        if (args[1] === 'id') {
            message.channel.send(new MessageEmbed().setDescription(`Iniciando tentativa de banimento por ID de: ${args[2]}.`));
            byUID('Ban', args, message)
        } else if (args[1] === 'user') {
            message.channel.send(new MessageEmbed().setDescription(`Iniciando tentativa de banimento por username de: ${args[2]}.`));
            byUser('Ban', args, message)
        } else {
            return message.channel.send(new MessageEmbed().setDescription(`Comando inválido: sintaxe do comando incorreta.\nO comando deve ser utilizado da senguinte forma: \`!ban roblox id [id do jogador] ou !ban roblox user [nome do jogador]\``));
        }
        return;    
    } else {
        console.log('Chegou aqui')
        const user = message.mentions.users.first();
        if (!user) return  message.channel.send(new MessageEmbed().setDescription(`Não foi possível encontrar o usuário marcado.\nLembre-se que a sintaxe do comando para banimento em servidores do Discord é \`!ban [@nome do usuário]\``));
        message.guild.members.ban(user);
    }

}

module.exports = {
    name: 'ban',
    description: `Bane o usuário mencionado do servidor em que o comando foi executado. O usuário banido não poderá voltar ao servidor após ser banido. O comando também tem suporte ao banimento de jogadores no jogo Extreme Adventures. Disponível somente para moderadores.`,
	aliases: ['banir'],
    cooldown: 5,
    guildOnly: true,
    execute,
};