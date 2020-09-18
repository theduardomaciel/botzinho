const Discord = require('discord.js');
const search = require('yt-search');
const ytdl = require('ytdl-core-discord');

const execute = (client, message, args) => {
    const string = args.join(' ');
    console.log('Música Encontrada: ' + string);
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
                        message.channel.send(`Iniciando a playlist com a música: \`${music.title}\``);
                        try {
                            playMusic(client, message, music);
                        } catch(error) {
                            console.log(error);
                        }
                        message.delete();
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
            message.channel.bulkDelete(100, true);
            client.queues.delete(message.member.guild.id);
            const stopEmbed = new Discord.MessageEmbed()
            stopEmbed.setColor('#FF0000');
            stopEmbed.setDescription(`**A playlist atual foi encerrada.** Obrigado a todos que participaram da rave!\nPara iniciar outra playlist, use o comando \`!play\` com alguma música!`)
            return message.channel.send(stopEmbed);
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
    try {
        queue.dispatcher.on('finish', () => {
            if (queue.loop === true) {
                queue.musics.push(queue.musics.shift());
            } else {
                queue.musics.shift();
            }
            playMusic(client, message, queue.musics[0]);
        });
    } catch(error) {
        console.log(error);
    }
};

module.exports = {
    name: 'play',
    description: 'Este é o comando responsável por tocar músicas! É a base para todos os outros comandos de música.',
	aliases: ['p', 'tocar', 'musica'],
    cooldown: 5,
    guildOnly: true,
    execute,
    playMusic,
};