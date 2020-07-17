const execute = async (client, message, args) => {
    const queue = client.queues.get(message.guild.id);

    // Verificando se há uma playlist tocando...
    try {
        if (!queue) {
            await message.reply('não existe nenhuma playlist sendo reproduzida.')
            .then(msg => {
                message.delete();
                msg.delete({ timeout: 1000 });
            });
            return;
        }
    } catch(error) {
        console.log(error);
    }

    // Verificando se o volume está dentre os limites;
    const volume = Number(args.join(' '));

    try {
        if (isNaN(volume) || volume < 0 || volume > 2) {
            message.reply('o volume deve ser um valor entre 0 e 2. (não deixe seus amiguinhos surdos)')
            .then(msg => {
                message.delete();
                msg.delete({ timeout: 1000 });
            });
            return;
        }
    } catch(error) {
        console.log(error);
    }

    // Verificando se a música já foi carregada
    try {
        if (queue.musics[0] && queue.dispatcher !== null) {
            queue.dispatcher.setVolume(volume / 10);
        } else {
            message.reply('aguarde a música ser carregada para poder alterar o volume!')
                .then(msg => {
                    message.delete();
                    msg.delete({ timeout: 10000 });
                })
                .catch(console.error);
        }
    } catch(error) {
        console.log(error);
    }

    queue.volume = volume;
    client.queues.set(message.guild.id, queue);

};

module.exports = {
    name: 'volume',
    description: 'Ajusta o volume em uma escala de 1 a 10.',
	aliases: ['vol'],
    cooldown: 1,
    execute,
};