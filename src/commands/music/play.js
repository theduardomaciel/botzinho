const Discord = require('discord.js');
const search = require('yt-search');
const ytdl = require('ytdl-core-discord');

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

const execute = (client, message, args) => {
    const string = args.join(' ');
    console.log('Música requerida: ' + string);
    const missingArgumentEmbed = new Discord.MessageEmbed().setDescription(`**Para tocar uma música, você precisa me especificar o nome ou link!**`)
    if (!args[0]) return message.channel.send(missingArgumentEmbed);
    try {
        search(string, (error, result) => {
            if (error) {
                throw error;
            } else if (result && result.videos.length > 0) {
                if (!message.member.voice.channel) {
                    const notInVoiceChannel = new Discord.MessageEmbed().setDescription(`Você precisa estar em um canal de voz para poder ouvir músicas!`);
                    return message.channel.send(notInVoiceChannel);
                }
                const user = message.author;
                const music = result.videos[0];
                const queue = client.queues.get(message.guild.id);
                if (queue) {
                    queue.musics.push(music);
                    queue.users.push(user);
                    client.queues.set(message.guild.id, queue);
                    const addingEmbed = new Discord.MessageEmbed()
                    addingEmbed.setDescription(`Adicionando: \`${music.title}\` à playlist atual.`)
                    addingEmbed.setColor('#00FF00')
                    message.channel.send(addingEmbed);
                    message.delete();
                } else {
                    const initiatingEmbed = new Discord.MessageEmbed()
                    initiatingEmbed.setDescription(`Iniciando a playlist com a música: \`${music.title}\``)
                    initiatingEmbed.setColor('#00FF00');
                    message.channel.send(initiatingEmbed);
                    try {
                        playMusic(client, message, music, user);
                    } catch(error) {
                        console.log(error);
                    }
                    message.delete();
                }
            } else {
                return message.reply('desculpe, não encontrei sua música. Pare de bater a cabeça no teclado e escreva direito.');
            }
        });
    } catch(error) {
        console.error(error);
    }
};

const playMusic = async (client, message, music, user) => {
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

    if (!queue) {
        try {
            const conn = await message.member.voice.channel.join();
            queue = {
                volume: 1,
                connection: conn,
                dispatcher: null,
                loop: false,
                loopTimes: 0,
                users: [user],
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
            if (queue.loop === true || queue.loopTimes > 0) {
                queue.musics.push(queue.musics.shift())
                queue.users.push(queue.users.shift());
                if (queue.loopTimes > 0) {
                    queue.loopTimes -= 1
                }
            } else {
                queue.musics.shift()
                queue.users.shift();
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