const playMusic = require('./play').playMusic;

const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }
    queue.musics.shift();
    client.queues.set(message.guild.id, queue);
    playMusic(client, message, queue.musics[0]);
    queue.musics[0] ? message.channel.send(`Tocando agora: \`${queue.musics[0].title}\``)
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