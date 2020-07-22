const search = require('yt-search');
const ytdl = require('ytdl-core-discord');

const execute = (client, message, args) => {
    const string = args.join(' ');
    console.log(string);
    if (!args[0]) return message.reply('você precisa me especificar um nome ou link de música!');
    try {
        search(string, (error, result) => {
            if (error) {
                throw error;
            } else if (result && result.videos.length > 0) {
                const music = result.videos[0];
                const queue = client.queues.get(message.guild.id);
                if (queue) {
                    queue.musics.push(music);
                    client.queues.set(message.guild.id, queue);
                    if (message.member.voice.channel) {
                        message.channel.send(`Adicionando: \`${music.title}\` à playlist atual.`);
                        message.delete();
                    }
                } else {
                    if (message.member.voice.channel) {
                        message.channel.send(`Iniciando a playlist, tocando a música: \`${music.title}\``);
                        message.delete();
                        try {
                            playMusic(client, message, music);
                        } catch(error) {
                            console.log(error);
                        }
                    }
                }
            } else {
                return message.reply('desculpe, não encontrei sua música. Pare de bater a cabeça no teclado e escreva direito.');
            }
        });
    } catch(error) {
        console.error(error);
    }
};

const playMusic = async (client, message, music) => {
    let queue = client.queues.get(message.guild.id);

    if(!music && queue.loop === false) {
        if (queue) {
            queue.connection.disconnect();
            message.channel.send('**A rave no servidor acabou, hasta la vista!**');
            message.channel.bulkDelete(100, true);
            return client.queues.delete(message.member.guild.id);
        }
    }

    try {
        if (!message.member.voice.channel) {
            await message.reply('você precisa estar em um canal de voz para poder ouvir músicas!')
            .then(msg => {
                message.delete();
                msg.delete({ timeout: 1000 });
            });
            return;
        }
    } catch(error) {
        console.log(error);
    }

    if (!queue) {
        try {
            const conn = await message.member.voice.channel.join();
            queue = {
                volume: 1,
                connection: conn,
                dispatcher: null,
                loop: false,
                musics: [music],
            };
            client.queues.set(message.member.guild.id, queue);
        } catch(error) {
            console.log(error);
        }
    }
    try {
        queue.dispatcher = await queue.connection.play(
            await ytdl(music.url, { highWaterMark: 1 << 25, filter:'audioonly' }),
            {
                type:'opus',
            });
        const previousVolume = queue.dispatcher.volume;
        queue.dispatcher.setVolume(previousVolume / 10);
        } catch(error) {
            console.log(error);
        }

    queue.dispatcher.on('finish', () => {
        if (queue.loop === true) {
            queue.musics.push(queue.musics.shift());
        } else {
            queue.musics.shift();
        }
        playMusic(client, message, queue.musics[0]);
    });
};

module.exports = {
    name: 'play',
    description: 'Reproduz músicas!',
	aliases: ['p', 'tocar', 'musica'],
    cooldown: 5,
    execute,
    playMusic,
};