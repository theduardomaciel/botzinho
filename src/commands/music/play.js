const Discord = require('discord.js');
const search = require('yt-search');
const ytdl = require('ytdl-core-discord');

process.on('unhandledRejection', error => console.error('Uncaught Promise Rejection', error));

let string;

const execute = (client, message, args, givenMember, givenUser) => {

    let member;
    let user;

    if (!givenMember) {
        member = message.member;
    } else {
        member = givenMember;
    }

    if (!givenUser) {
        user = message.author;
    } else {
        user = givenUser;
    }

    string = args.join(' ');
    console.log('Música requerida: ' + string);
    const missingArgumentEmbed = new Discord.MessageEmbed().setDescription(`**Para tocar uma música, você precisa me especificar o nome ou link!**`)
    if (!args[0]) return message.channel.send(missingArgumentEmbed);
    try {
        search(string, (error, result) => {
            if (error) {
                return console.log(error);
            } else if (result && result.videos.length > 0) {
                try {
                    if (!member.voice.channel) {
                        const notInVoiceChannel = new Discord.MessageEmbed().setDescription(`Você precisa estar em um canal de voz para poder ouvir músicas!`);
                        return message.channel.send(notInVoiceChannel);
                    }
                } catch (error) {
                    console.log(error)
                }
                const music = result.videos[0];
                const queue = client.queues.get(message.guild.id);
                if (queue) {
                    message.delete();
                    queue.musics.push(music);
                    queue.users.push(user);
                    client.queues.set(message.guild.id, queue);
                    const addingEmbed = new Discord.MessageEmbed()
                    addingEmbed.setDescription(`Adicionando: \`${music.title}\` à playlist atual na posição ${queue.musics.length}`)
                    addingEmbed.setColor('#00FF00')
                    message.channel.send(addingEmbed);
                } else {
                    if (!givenMember) {
                        message.delete();
                    }
                    const initiatingEmbed = new Discord.MessageEmbed()
                    initiatingEmbed.setDescription(`Iniciando a playlist com a música: \`${music.title}\``)
                    initiatingEmbed.setColor('#00FF00');
                    message.channel.send(initiatingEmbed);
                    try {
                        playMusic(client, message, music, user, member);
                    } catch(error) {
                        console.log(error);
                    }
                }
            } else if (result.playlists) {
                if (!member.voice.channel) {
                    const notInVoiceChannel = new Discord.MessageEmbed().setDescription(`Você precisa estar em um canal de voz para poder ouvir músicas!`);
                    return message.channel.send(notInVoiceChannel);
                }
                const user = message.author;
                const playlist = result.lists[0]
                console.log(playlist);
                //const queue = client.queues.get(message.guild.id);
                message.channel.send('Ainda não é possível implementar playlists, este sistema ainda está sendo desenvolvido. Desculpe.')
            } else {
                return message.reply('desculpe, não encontrei sua música. Pare de bater a cabeça no teclado e escreva direito.');
            }
        });
    } catch(error) {
        console.error(error);
    }
};

function RemoveAllMessages(client, message) {

    try {
        message.channel.messages.fetch({ limit: 100 }).then(messages => {
            message.channel.bulkDelete(messages.size - 1)
        })
    } catch (error) {
        console.log(error)
    }

}

const playMusic = async (client, message, music, user, member) => {
    let queue = client.queues.get(message.guild.id);

    if(!music && queue.loop === false) {
        if (queue) {
            try {
                queue.connection.disconnect();
                await client.queues.delete(message.guild.id);
            } catch (error) {
                console.log(error)
            }
            const stopEmbed = new Discord.MessageEmbed()
            stopEmbed.setColor('#FF0000');
            stopEmbed.setDescription(`**A playlist atual foi encerrada.** Obrigado a todos que participaram da rave!\nPara iniciar outra playlist, use o comando \`!play\` com alguma música!`)
            RemoveAllMessages(client, message)
            return message.channel.send(stopEmbed);
        }
    }

    if (!queue) {
        try {
            const conn = await member.voice.channel.join();
            queue = {
                volume: 1,
                connection: conn,
                dispatcher: null,
                loop: false,
                loopTimes: 0,
                users: [user],
                musics: [music],
            };
            client.queues.set(member.guild.id, queue);
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
            } else {!
                queue.musics.shift()
                queue.users.shift();
            }
            playMusic(client, message, queue.musics[0]);
        });
    } catch(error) {
        console.log(error);
        message.channel.send(new Discord.MessageEmbed().setDescription(`Um erro ocorreu ao tentar executar sua música, desculpe.`).setColor('ff0000'))
    }

    module.exports = {
        name: 'play',
        description: 'Este é o comando responsável por tocar músicas! É a base para todos os outros comandos de música.',
        aliases: ['p', 'tocar', 'musica'],
        cooldown: 5,
        guildOnly: true,
        execute,
        playMusic,
        userRequire: string,
    };

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