const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }
    queue.dispatcher.pause();
};

module.exports = {
    name: 'pause',
    description: 'Pausa a música reproduzindo atualmente na playlist.',
	aliases: ['pausar', 'pausa'],
    cooldown: 5,
    execute,
};