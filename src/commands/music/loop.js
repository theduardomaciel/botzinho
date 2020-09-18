const Discord = require('discord.js');

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
            client.queues.set(message.guild.id, queue);

            const loopTrue = new Discord.MessageEmbed().setTitle('LOOP:')
            loopTrue.setColor('#FFA500')
            loopTrue.setDescription(`Modo **LOOP** foi ativado. A música atual irá repetir até que o modo seja desativado.`)
            return message.channel.send(loopTrue);
        } else {
            queue.loop = false;
            client.queues.set(message.guild.id, queue);

            const loopFalse = new Discord.MessageEmbed().setTitle('LOOP:')
            loopFalse.setColor('#FFA500')
            loopFalse.setDescription(`Modo **LOOP** foi desativado.`)
            return message.channel.send(loopFalse);
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
        
        const loopCount = new Discord.MessageEmbed()
        loopCount.setColor('#7289da');
        loopCount.setDescription(`A música: \`${queue.musics[0].title}\` tocará mais **${loopTimes + 1}** vez(es).`)
        return message.channel.send(loopCount);
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