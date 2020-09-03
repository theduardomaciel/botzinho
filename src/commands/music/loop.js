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

    // LOOP 1

    if (!args.length) {
        if (queue.loop === false) {
            queue.loop = true;
            message.channel.send('Modo **LOOP** foi ativado.');
            client.queues.set(message.guild.id, queue);
        } else {
            queue.loop = false;
            message.channel.send('Modo **LOOP** foi desativado.');
            client.queues.set(message.guild.id, queue);
        }
    } else {
        try {
            if (args[0] > 5 || args[0] < 1) {
                await message.reply('só é possível loopar uma música até 5 vezes.')
                .then(msg => {
                    message.delete();
                    msg.delete({ timeout: 1000 });
                });
                return;
            }
        } catch(error) {
            console.log(error);
        }

        const loopTimes = args[0] - 1;
        const musicToLoop = queue.musics[0];

        for (let i = 0; i <= loopTimes; i++) {
            queue.musics.unshift(musicToLoop);
        }
        message.channel.send(`A música: \`${queue.musics[0].title}\` tocará mais **${loopTimes + 1}** vezes.`);
    }

};

module.exports = {
    name: 'loop',
    description: 'Repete a música tocando atualmente na playlist. O número de repetições pode ser especificado com um argumento após o comando. (máximo: 5)',
	aliases: ['loopar', 'again'],
    cooldown: 5,
    guildOnly: true,
    execute,
};