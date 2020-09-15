const Discord = require('discord.js');
const fs = require('fs');
const path = require('path');

const problemaSave = require('./problema.json');

const execute = (client, message, args, isModerator) => {

    let quantidadeDias = problemaSave.quantidadeDias;
    console.log(`Estamos a: ${quantidadeDias} dia(s) sem problemas!`);

    if (args[0] === 'reset') {
        let problemaUpdated = {
            "quantidadeDias": 0
        };
        let data = JSON.stringify(problemaUpdated);
        console.log(data);
        fs.writeFileSync(path.join(__dirname, `./problema.json`), data);
        message.reply('e de novo eu tô com problema. Incrível...');
    } else if (args[0] === 'add') {
        let problemaUpdated = {
            quantidadeDias: quantidadeDias + 1
        };
        let data = JSON.stringify(problemaUpdated);
        fs.writeFileSync(path.join(__dirname, `./problema.json`), data);
        message.channel.send(`**Mais um dia sem nenhum problema :)** \n \`${data}\` `);
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
    aliases: ['pro'],
    guildOnly: false,
    execute,
};