const token = process.env.TOKEN;

function isModerator(member) {
    if (member.roles.cache.has('728794307099885660')) {
        return true;
    } else {
        return false;
    }
}

const execute = (client, message, args) => {

    if (!isModerator(message.member)) return message.reply('somente moderadores podem executar este comando.');
    if (!args[0]) return message.reply('por favor, indique um status para o bot.');

    message.guild.members.get(client.user.id).setNickname(args[0]);

    message.channel.send(`O status do bot foi alterado para: \`${args[0]}\`.`);

}

module.exports = {
    name: 'status',
    description: 'Disponível somente para moderadores. É responsável por alterar o status do bot',
    cooldown: 1,
    execute,
};