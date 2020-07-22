const Discord = require('discord.js');

let status = 0;

let criandoAtividade = false;

let atividadeEmbed = undefined;
let attachment = undefined;

const execute = (client, message, args) => {
    const channel = message.channel;

    if (!args[0]) {
        message.reply('você precisa especificar se quer adicionar: matéria, atividade, data, ou anexar algum arquivo!');
    } else {
        const atividadeEmbed = new Discord.MessageEmbed()
        .setColor(0x0099ff);

        if (!args[0] && args[1] && args[2]) return message.reply('você precisar adicionar a matéria (1), informar o prazo (2) e descrever a atividade. (3)');
        
        atividadeEmbed.setTitle(`ATIVIDADE DE ${args[0].toUpperCase()}:`);

        const text = args.slice(2).join(' ');
        atividadeEmbed.setDescription(`**${text}**`);

        atividadeEmbed.setFooter('Prazo de Entrega: ' + args[1]);

        const anexos = message.attachments.array()[0] 

        if (anexos) {
            try {
                attachment = new Discord.MessageAttachment(anexo.url);
            } catch(error) {
                console.log(error);
            }
        }

        message.channel.send(atividadeEmbed).then(embedMessage => {
            embedMessage.react("✅")
            //embedMessage.react("❌");
        });
        if (attachment) {
            channel.send(attachment);
        }
        message.delete();

    }

};

module.exports = {
    name: 'atividade',
    description: 'Lista as atividades do dia atual.',
	aliases: ['atividades', 'ati', 'ativi'],
    cooldown: 5,
    execute,
};