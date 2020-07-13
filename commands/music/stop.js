const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }
    queue.musics = [];
    client.queues.set(message.guild.id, queue);
    queue.dispatcher.end();
};

module.exports = {
    name: 'stop',
    description: 'Interrompe a playlist tocando no momento.',
	aliases: ['parar'],
    cooldown: 5,
    execute,
};