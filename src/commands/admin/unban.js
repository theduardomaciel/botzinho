const { MessageEmbed } = require('discord.js')

const axios = require('axios');
let scriptID = process.env.SCRIPT_ID + "/exec"

const byUID = require('./robloxAdmin').byUID;
const byUser = require('./robloxAdmin').byUser;

const execute = (client, message, args, isModerator) => {

    if (!isModerator) return message.reply('somente moderadores podem executar este comando.')

    if (args[0] === 'roblox') {
        if (args[1] === 'id') {
            message.channel.send(new MessageEmbed().setDescription(`Iniciando tentativa de desbanimento por ID de: ${args[2]}.`));
            byUID('Unban', args, message)
        } else if (args[1] === 'user') {
            message.channel.send(new MessageEmbed().setDescription(`Iniciando tentativa de desbanimento por username de: ${args[2]}.`));
            byUser('Unban', args, message)
        } else {
            return message.channel.send(new MessageEmbed().setDescription(`Comando inválido: sintaxe do comando incorreta.\nO comando deve ser utilizado da senguinte forma: \`!unban roblox id [id do jogador] ou !unban roblox user [nome do jogador]\``));
        }
        return;     
    } else {
        const user = message.mentions.users.first();
        if (!user) return  message.channel.send(new MessageEmbed().setDescription(`Não foi possível encontrar o usuário marcado.\nLembre-se que a sintaxe do comando para banimento em servidores do Discord é \`!unban [@nome do usuário]\``));
        message.guild.members.unban(user.id);
    }

}

module.exports = {
    name: 'unban',
    description: `Desbane o usuário mencionado do servidor em que o comando foi executado. O comando também pode ser usado para retirar o banimento de jogadores no jogo Extreme Adventures. Disponível somente para moderadores.`,
	aliases: ['desbanir'],
    cooldown: 5,
    guildOnly: true,
    execute,
};