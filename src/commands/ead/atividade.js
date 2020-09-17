const Discord = require('discord.js');

let status = 0;

let criandoAtividade = false;

let atividadeEmbed = undefined;
let attachment = undefined;

const execute = (client, message, args) => {
    const channel = message.channel;

    attachment = undefined;

    if (!args[0]) {
        message.reply('você precisa especificar se quer adicionar: matéria, atividade, data, ou anexar algum arquivo!');
    } else if (args[0] === 'anexo') {
        const anexos = message.attachments.array()[0];
        try {
            attachment = new Discord.MessageAttachment(anexos.url);
        } catch(error) {
            message.channel.send('**Desculpe, não foi possível carregar seu anexo.**')
            console.log(error);
        }
        if (attachment) {
            channel.send(attachment);
        } else {
            message.channel.send('Não foi possível carregar seu anexo!')
        }
    } else {
        const atividadeEmbed = new Discord.MessageEmbed()
        .setColor(0x0099ff);

        if (!args[0] && args[1] && args[2]) return message.reply('você precisar adicionar a matéria (1), informar o prazo (2) e descrever a atividade. (3)');
        
        atividadeEmbed.setTitle(`ATIVIDADE DE ${args[0].toUpperCase()}:`);

        const text = args.slice(2).join(' ');
        atividadeEmbed.setDescription(`**${text}**`);

        atividadeEmbed.setFooter('Prazo de Entrega: ' + args[1]);

        const anexos = message.attachments.array()[0];

        if (anexos) {
            try {
                attachment = new Discord.MessageAttachment(anexos.url);
            } catch(error) {
                console.log(error);
                message.channel.send('**Desculpe, não foi possível carregar seu anexo.**')
            }
        }

        message.channel.send(atividadeEmbed).then(embedMessage => {
            embedMessage.react("✅")
        });
        if (attachment) {
            channel.send(attachment);
        }
        message.delete();

    }

};

module.exports = {
    name: 'atividade',
    description: 'Envia uma mensagem para informar e marcar o status de uma atividade. Formato: !atividade [matéria] [prazo] [descrição] {opcional: anexo}',
	aliases: ['atividades', 'ati', 'ativi'],
    cooldown: 5,
    guildOnly: true,
    execute,
};