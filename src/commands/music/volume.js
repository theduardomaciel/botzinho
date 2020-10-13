const Discord = require('discord.js');

const execute = async (client, message, args) => {
    const queue = client.queues.get(message.guild.id);

    // Verificando se há uma playlist tocando...
    try {
        if (!queue) {
            const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
            return message.channel.send(notPlaylist).then(messageSent => messageSent.delete({ timeout: 1000 }));
        }
    } catch(error) {
        console.log(error);
    }

    // Verificando se o volume está dentre os limites;
    const volume = Number(args.join(' '));

    try {
        if (isNaN(volume) || volume < 0 || volume > 3) {
            message.reply('**o volume deve ser um valor *audível*, que não deixe seus amiguinhos (e você mesmo) surdos :)**\n(Valor de 0 a 3)')
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
            const volumeEmbed = new Discord.MessageEmbed()
            volumeEmbed.setColor('#FFA500');
            volumeEmbed.setDescription(`**O volume atual foi alterado para: \`${volume}\`.**`);
            message.channel.send(volumeEmbed);
            message.delete()
        } else {
            const waitEmbed = new Discord.MessageEmbed().setDescription(`**Por favor, aguarde a música ser carregada para poder alterar o volume.**`)
            message.channel.send(waitEmbed)
            message.delete()
        }
    } catch(error) {
        console.log(error);
    }

    queue.volume = volume;
    client.queues.set(message.guild.id, queue);

};

module.exports = {
    name: 'volume',
    description: 'Ajusta o volume em uma escala de 0.1 a 3 (para prevenir que seus amigos fiquem surdos)',
	aliases: ['vol'],
    cooldown: 30,
    guildOnly: true,
    execute,
};