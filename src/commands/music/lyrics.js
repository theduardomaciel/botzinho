const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }
    message.reply('este comando ainda não está pronto!')
};

module.exports = {
    name: 'lyrics',
    description: 'Mostra a letra da música tocando no momento.',
	aliases: ['letra'],
    cooldown: 5,
    guildOnly: true,
    execute,
};