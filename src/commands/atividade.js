const Discord = require('discord.js');

let status = 0;

let criandoAtividade = false;

let atividadeEmbed = undefined;
let attachment = undefined;

const execute = (client, message, args) => {
    const channel = message.channel;

    if (!args[0]) {
        message.reply('você precisa me especificar se quer adicionar: matéria, atividade, data, ou anexar algum arquivo!');
    } else if (args[0] === 'materia') {
        if (criandoAtividade === false) {
            novaAtividade = true;
            atividadeEmbed = new Discord.MessageEmbed()
            .setColor(0x0099ff);
        }
        atividadeEmbed.setTitle(`ATIVIDADE DE ${args[1]}:`);
        status += 1;

        checkEnd(message);
        message.delete();
    } else if (args[0] === 'desc') {
        const text = args.slice(1).join(' ')
        if (!text) return message.reply('você precisar descrever a atividade!');
        atividadeEmbed.setDescription(`**${text}**`);
        status += 1;

        checkEnd(message);
        message.delete();
    } else if (args[0] === 'prazo') {
        atividadeEmbed.setFooter('Prazo de Entrega: ' + args[1]);
        status += 1;
        
        checkEnd(message);
        message.delete();
    } else if (args[0] === 'anexo') {

        const anexo = message.attachments.array()[0]

        try {
            attachment = new Discord.MessageAttachment(anexo.url);
        } catch(error) {
            console.log(error);
        }

        checkEnd(message);
    }

};

function checkEnd(message) {
    if (status >= 3) {
        message.channel.send(atividadeEmbed).then(embedMessage => {
            embedMessage.react("✅"),
            embedMessage.react("❌");
        });
    }
    if (attachment) {
        channel.send(attachment);
    }
}

module.exports = {
    name: 'atividade',
    description: 'Lista as atividades do dia atual.',
	aliases: ['atividades', 'ati', 'ativi'],
    cooldown: 5,
    execute,
};