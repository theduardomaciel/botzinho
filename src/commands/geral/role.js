function getUserFromMention(mention) {
	if (!mention) return;

	if (mention.startsWith('<@') && mention.endsWith('>')) {
		mention = mention.slice(2, -1);

		if (mention.startsWith('!')) {
			mention = mention.slice(1);
		}

		return client.users.cache.get(mention);
	}
}

const execute = (client, message, args, isModerator) => {

    if (!isModerator) return message.reply('somente moderadores podem executar esse comando.');
    if (!args) return message.reply('você precisa mencionar alguém, ou usar !all para adicionar o cargo para todos os membros!');

    const role = message.guild.roles.find(r => r.name == args[1])
    if (!role) return message.reply(`o cargo: ${args[1]} não foi encontrado.`);

    if (args[0] === 'all') {
        try {
            message.guild.members.filter(m => !m.user.bot).forEach(member => member.addRole(role));
            message.reply(`o cargo: **${role.name}** foi adicionado para todos os membros`);
        } catch (error) {
            console.log(error);
        }
    } else {
        let user = getUserFromMention(args[0]);
        if (!user) return message.reply('por favor, não foi possível encontrar uma pessoa através da sua menção.')
        user.addRole(role)
    }

}

module.exports = {
    name: 'role',
    description: `Adiciona um cargo a um determinado membro do servidor através de uma menção. Ao usar \`!role all\` adiciona o cargo do argumento seguinte a todos os usuários do servidor.`,
	aliases: ['cargo', 'cargos'],
    cooldown: 5,
    guildOnly: false,
    execute,
};