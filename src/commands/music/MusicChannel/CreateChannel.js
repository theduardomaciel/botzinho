const { MessageEmbed, Message } = require('discord.js');

const mongoose = require('mongoose');
const { create } = require('../../../database/models/GuildConfig');
const Guild = require('../../../database/models/GuildConfig');

const MessageReactionsHandler = require('./MessageReactions');

const execute = async (client, message, args, isModerator) => {

    let createdChannel;
    let controlBarMessage;
        
    if (!isModerator) return message.channel.send(new MessageEmbed().setDescription('Você não possui as permissões necessárias para utilizar este comando.'));

    const musicMessage = new MessageEmbed()
    musicMessage.setTitle('CANALZINHO DE MÚSICAS (BETA)')
    musicMessage.setDescription(`Para pesquisar uma música, simplesmente digite o nome da sua música neste canal, que a sua música entrará na fila.
    **Lembre-se de ativar o modo de música (🔷) para que o bot adicione suas músicas à playlist.**
    Os botões abaixo desta mensagem são responsáveis por controlar a playlist atual.
    \`Para mais informações, a legenda está disponível na descrição do canal.\``)
    musicMessage.setImage('https://i.imgur.com/kK3O4Di.png')


    message.guild.channels.create('raves-do-botzinho', { type: 'text', reason: 'Novo canal de música.' }).then(async channel => {
        createdChannel = channel;

        channel.setTopic(`🔷 Alterna entre os **modos de pesquisa** de músicas por texto.\n⏯️ **Pausa** a música tocando atualmente enquanto ativo, e retorna a música ao ser desativado.\n⏹ **Interrompe** a playlist atual.\n⏭ **Pula a faixa** da playlist atual.\n🔁 Alterna entre os modos de **loop** (atualmente só possui 1)\n🔀 Embaralha a ordem das músicas da playlist.\n⭐ Favorita a música atual e a adiciona em sua playlist pessoal.\n❌ Remove a música atual de sua playlist pessoal.`)
        //.then(updated => console.log(`O novo tópico do canal é ${updated.topic}`))
        .catch(console.error);

        createdChannel.send(musicMessage);
        createdChannel.send(`**\`BARRA DE CONTROLE:\`**`).then(async sentMessage => {
            controlBarMessage = sentMessage;
            MessageReactionsHandler(client, message, createdChannel, sentMessage);

            const settings = await Guild.findOne({
                guildId: message.guild.id
            }, (err, guild) => {
                if (err) console.error(err);
                if (!guild) {
                    const createGuild = require('../../../database/CreateGuild')
                    createGuild(mongoose.Types.ObjectId(), message.guild.id, message.guild.name, process.env.PREFIX, undefined, undefined, createdChannel.id, musicMessage.id)
                }
            })
        
            await settings.updateOne({
                musicChannel: createdChannel.id,
                musicMessage: controlBarMessage.id,
            });

        })

    })

    return message.channel.send(new MessageEmbed().setDescription(`Um novo canal de música foi criado em seu servidor!`));

};

module.exports = {
    name: 'music-channel',
    description: 'Disponível somente para moderadores. Este comando é resposável por alterar o canal principal de músicas do servidor.',
	aliases: ['musicchannel', 'canalmúsica', 'canalmusica'],
    cooldown: 5,
    guildOnly: true,
    execute,
};