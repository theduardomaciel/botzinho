const Discord = require('discord.js');

const execute = async (client, message, args) => {

    const queue = client.queues.get(message.guild.id);

    // Verificando se há uma playlist tocando...
    try {
        if (!queue) {
            const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
            return message.channel.send(notPlaylist);
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
            queue.loopTimes = 0;
            client.queues.set(message.guild.id, queue);

            const loopFalse = new Discord.MessageEmbed().setTitle('LOOP:')
            loopFalse.setColor('#FFA500')
            loopFalse.setDescription(`Modo **LOOP** foi desativado. Agora as músicas tocarão na ordem da playlist normalmente.`)
            return message.channel.send(loopFalse);
        }
    } else {
        try {
            if (args[0] > 5 || args[0] < 1) {
                const notPlaylist = new Discord.MessageEmbed().setDescription(`Só é possível loopar uma música até 5 vezes. Para prender os ouvintes em um loop temporal infinito, por favor use o comando \`!loop\` sem nenhum argumento.
                Ps.: Caso você tenha colocado 0, amigo, você precisa estudar mais matemática.`)
                return message.channel.send(notPlaylist);
            }
        } catch(error) {
            console.log(error);
        }

        const loopTimes = parseInt(args[0]);
        const musicToLoop = queue.musics[0];

        //for (let i = 0; i <= loopTimes; i++) {
        //    queue.musics.unshift(musicToLoop);
        //}
        
        queue.loopTimes = loopTimes;
        client.queues.set(message.guild.id, queue);
        
        const loopCount = new Discord.MessageEmbed()
        loopCount.setColor('#FFA500');
        loopCount.setDescription(`A música: \`${queue.musics[0].title}\` tocará mais **${loopTimes}** vez(es).`)
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