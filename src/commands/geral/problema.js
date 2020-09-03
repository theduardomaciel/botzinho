const Discord = require('discord.js');
const problemaSave = require('./problema.json')

const execute = (client, message, args, isModerator) => {

    let diasNormais = parseInt(problemaSave.quantidadeDias);

    if (args[0] === 'reset') {
        problemaSave.quantidadeDias = toString(0);
        message.reply('e de novo eu tô com problema. Incrível...');
    } else if (args[0] === 'add') {
        problemaSave.quantidadeDias = diasNormais + 1
    } else {
        const problemaEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle(`**DIAS SEM PROBLEMAS:**`)
        .setDescription(`Estamos há ${problemaSave.quantidadeDias} dia(s) sem problemas! \n Se esse número for maior que 1 já é um avanço :)`);

        message.channel.send(problemaEmbed)
    }

}

module.exports = {
    name: 'problema',
    description: 'Mostra a quanto tempo o bot está funcionando sem problemas. Provavelmente o número será bem baixo constantemente.',
    cooldown: 10,
    guildOnly: false,
    execute,
};