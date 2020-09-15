const execute = (client, message, args, isModerator) => {

    if (!isModerator) return message.reply('somente moderadores podem executar esse comando.');
    if (!args) return message.reply('você precisa mencionar alguém, ou usar !all para adicionar o cargo para todos os membros!');

    const role = message.guild.roles.cache.find(role => role.name === 'EAD');
    if (!role) return message.reply(`o cargo: ${args[1]} não foi encontrado.`);

    if (args[0] === 'all') {

        try {
            message.guild.members.fetch().then(allMembers => {
                const members = allMembers.filter(member => !member.user.bot);
                members.forEach(member => member.roles.add(role));
            });
            message.channel.send(`O cargo: **${role.name}** foi adicionado para todos os membros do servidor.`);
        } catch (error) {
            console.log(error);
        }

    } else {
        const member = message.mentions.members.first();
        if (!member) return message.reply('por favor, não foi possível encontrar uma pessoa através da sua menção.')
        member.roles.add(role)
        message.channel.send(`**O cargo** \`${role.name}\` **foi adicionado à** \`${member.displayName}\` **corretamente.**`);
    }

}

module.exports = {
    name: 'role',
    description: `Adiciona um cargo a um determinado membro do servidor através de uma menção. Ao usar \`!role all\` adiciona o cargo do argumento seguinte a todos os usuários do servidor. Somente disponível para moderadores.`,
	aliases: ['cargo', 'cargos'],
    cooldown: 5,
    guildOnly: false,
    execute,
};