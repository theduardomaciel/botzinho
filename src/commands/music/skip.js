const Discord = require('discord.js');
const playMusic = require('./play').playMusic;

const execute = async (client, message) => {
    const queue = client.queues.get(message.guild.id);
    
    if (!queue) {
        const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
        return message.channel.send(notPlaylist).then(messageSent => messageSent.delete({ timeout: 1000 }));
    }

    if (queue.loop === true || queue.loopTimes > 0) {
        const notSkip = new Discord.MessageEmbed()
        notSkip.setColor('#FFA500');
        notSkip.setDescription(`Não é possível pular de faixa com o modo loop ativado. Para desativar utilize o comando \`!loop\`.`);
    }

    queue.musics.shift();
    client.queues.set(message.guild.id, queue);
    let music = await queue.musics[0]
    playMusic(client, message, music);

    const skipEmbed = new Discord.MessageEmbed()
    skipEmbed.setColor('#FFA500')
    skipEmbed.setTitle(`A faixa atual foi pulada.`);

    queue.musics[0] ? skipEmbed.setDescription(`Tocando agora: \`${queue.musics[0].title}\``)
    : console.log('Sem música no momento.');

    queue.musics[0] ? message.channel.send(skipEmbed)
    : console.log('Sem música no momento.');
};

module.exports = {
    name: 'skip',
    description: 'Pula a música atual e passa para a próxima da playlist.',
	aliases: ['pular', 'próxima', 'next'],
    cooldown: 5,
    guildOnly: true,
    execute,
};