const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }
    queue.dispatcher.resume();
};

module.exports = {
    name: 'resume',
    description: 'Retorna a música que foi anteriorimente pausada na playlist.',
	aliases: ['resume', 'voltar'],
    cooldown: 5,
    execute,
};