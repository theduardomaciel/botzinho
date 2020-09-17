const Discord = require('discord.js');

const keyv = undefined;
const mapaDeQuantidades = undefined;

keyv.on('error', err => console.log('Connection Error', err));

const execute = async (client, message, args, isModerator) => {

    return message.channel.send('Este comando está, ironicamente, com problemas. É sério. Desculpa :(');

    let quantidadeServidor = await mapaDeQuantidades.get(message.guild.id);

    if (quantidadeServidor === undefined) {
        await mapaDeQuantidades.set(message.guild.id, 0);
        quantidadeServidor = await mapaDeQuantidades.get(message.guild.id);
    }

    quantidadeDias = quantidadeServidor;

    if (args[0] === 'reset') {
        quantidadeDias = 0
        await mapaDeQuantidades.set(message.guild.id, quantidadeDias);
        return message.channel.send(`**Infelizmente, nosso score de dias sem problema foi redefinido.**`);
    } else if (args[0] === 'add') {
        quantidadeDias += 1;
        await mapaDeQuantidades.set(message.guild.id, quantidadeDias);
        return message.channel.send(`**Mais um dia sem nenhum problema!** \n Estamos a \`${quantidadeDias}\` dia(s) sem nenhuma anormalidade!`);
    } else {
        const problemaEmbed = new Discord.MessageEmbed()
        .setColor(0xff0000)
        .setTitle(`**DIAS SEM PROBLEMAS:**`)
        .setDescription(`Estamos há ${quantidadeDias} dia(s) sem problemas! \n Se esse número for maior que 1 já é um avanço :)`);
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