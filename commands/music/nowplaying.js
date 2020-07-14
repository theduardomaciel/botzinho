const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }
    return message.channel.send(`Tocando agora: \`${queue.musics[0].title}\``);
};

module.exports = {
    name: 'nowplaying',
    description: 'Mostra qual a música que está tocando atualmente.',
	aliases: ['tocando', 'agora', 'tocandoagora'],
    cooldown: 5,
    execute,
};