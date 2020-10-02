const execute = (client, message, args, isModerator) => {

    if (!isModerator) return message.reply('somente moderadores podem executar este comando.')

    const member = message.mentions.members.first();
    member.kick();

}

module.exports = {
    name: 'kick',
    description: `Expulsa o usuário mencionado do servidor em que o comando foi executado. O usuário expulso poderá voltar ao servidor entrando por um convite novamente. Disponível somente para moderadores.`,
	aliases: ['kickar', 'expulsar', 'remover'],
    cooldown: 5,
    guildOnly: true,
    execute,
};