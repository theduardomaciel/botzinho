const execute = (client, message, args, isModerator) => {

    if (!isModerator) return message.reply('somente moderadores podem executar este comando.')

    const user = message.mentions.users.first();
    message.guild.members.ban(user);

}

module.exports = {
    name: 'ban',
    description: `Bane o usuário mencionado do servidor em que o comando foi executado. O usuário banido não poderá voltar ao servidor após ser banido. Disponível somente para moderadores.`,
	aliases: ['banir'],
    cooldown: 5,
    guildOnly: true,
    execute,
};