const Discord = require('discord.js');

const playCommand = require('..//commands/music/play').execute;

const mongoose = require('mongoose');

const User = require('..//database/models/UserConfig');
const CreateUser = require('..//database/CreateUser');

let collector;

module.exports = {
    execute: async (client, message, user, reaction, create) => {

        async function RemoveReactions() {
            try {
                await reaction.users.remove(user);
                console.log(`A reação de ${user.username} foi removida!`);
            } catch (error) {
                console.error(error);
            }
        }

        const id = user.id
        const name = user.username;

        if (create === true) {
            const filter = m => m.author.id === user.id
            const messageCollector = message.channel.createMessageCollector(filter);
        
            messageCollector.on('collect', m => {
                console.log('Mensagem recebida');
                let string = m.content.split(' ');
                playCommand(client, m, string);
            });

            messageCollector.on('end', collected => {
                RemoveReactions();
                console.log('Bot desativou o modo de coleta de mensagens.');
            });
            collector = messageCollector;
        } else if (create === false) {
            
            if (collector) {
                collector.stop();
            }

        } else if (!create) {

            RemoveReactions();
            const settings = await User.findOne({
                userId: id
            }, (err, user) => {
                if (err) console.error(err);
                if (!user) {
                    CreateUser(mongoose.Types.ObjectId(), id, name)
                    return message.channel.send(new Discord.MessageEmbed().setDescription(`Você não estava na minha lista de usuários, mas você foi adicionado. Por favor reutilize o comando para que eu possa adicionar a música à sua playlist pessoal \`${name}\`!`))
                }
                return;
            })
            
            const member = message.guild.members.cache.find(member => member.id === user.id)
            let string = settings.playlist[0]['title'].split(' ');
            playCommand(client, message, string, member, user);

            /* for (let i = 0; i < settings.playlistLenght; i++) {
                let string = settings.playlist[i]['title'].split(' ');
                playCommand(client, message, string, member);
            } */
            
        }

    },
}