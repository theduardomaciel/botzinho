module.exports = {
    name: 'clear',
    cooldown: 1,
    description: 'Comando que limpa o canal de texto em que foi executado.',
    aliases: ['clean', 'apagar', 'purge'],
	execute(client, message, args) {

        const amount = parseInt(args[0]) + 1;

        if (isNaN(amount)) {
            return message.reply('este parece não ser um número válido.');
        } else if (amount > 100 || amount <= 1) {
            return message.reply('seu número precisa ser maior que 1 e menor que 100.');
        }

        message.channel.bulkDelete(amount, true)
        .then(messages => console.log(`Foram deletadas ${messages.size} mensagens`))
        .catch(err => {
            console.error(err);
        });
	},
};