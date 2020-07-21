const { MessageEmbed } = require("discord.js");


const atividadesEmbed = new MessageEmbed()
.setColor('#0099ff')
.setTitle('PLAYLIST ATUAL:')
.setAuthor('Botzinho • Por Edu (ex_) ', 'https://pbs.twimg.com/profile_images/1030607655478415366/LBoC35SF_400x400.jpg', 'https://twitter.com/theduardomaciel')
// .setThumbnail('https://i.imgur.com/wSTFkRM.png')
.setTimestamp();

const atividades = {
}

const execute = (client, message, args) => {

    if (!args.lenght) return message.channel.send(atividadesEmbed);

    // 0 = Matéria | 1 - Atividade | 2 - 

    const novaAtividade = new Array({
        'materia': args[0], 
    })

    atividades.push()


};

module.exports = {
    name: 'atividade',
    description: 'Lista as atividades do dia atual.',
	aliases: ['atividades'],
    cooldown: 5,
    execute,
};