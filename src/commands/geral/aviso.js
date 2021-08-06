const Discord = require('discord.js');

const execute = (client, message, args) => {

    const comunicadoEmbed = new Discord.MessageEmbed()
    .setColor("0xFFA07A")
    .setTitle(`**MENSAGEM:**`)
    .setDescription(args.splice(0).join(" ") + ' • @everyone');

    message.channel.send(comunicadoEmbed)
    try {
        message.channel.send({
            files: [{
               attachment: "https://i.imgur.com/p1ScJfe.jpg",
               name: "SPOILER_FILE.jpg"
            }]
         });
    } catch(error) {
        message.channel.send('**Desculpe, não foi possível carregar seu anexo.**')
        console.log(error);
    }

    message.delete()

}

module.exports = {
    name: 'aviso',
    description: 'Cria um mensagem para avisar a todos do servidor de mensagens "importantes".',
	aliases: ['urgente'],
    cooldown: 5,
    guildOnly: true,
    execute,
};