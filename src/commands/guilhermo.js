const { MessageEmbed } = require('discord.js');

const json = require('./guilhermo.json');

const guilhermoEmbed = new MessageEmbed()
.setTitle('Eae meu chapa, então...')
.setColor(0xff0000)

function randomize(type) {
    const frases = json.frases;
    const imagens = json.imagens;

    const fraseEscolhida = frases[Math.floor(Math.random() * frases.length)];
    const imagemEscolhida =  imagens[Math.floor(Math.random() * imagens.length)];

    if (type === true) {
        return imagemEscolhida;
    } else {
        return fraseEscolhida;
    }

}

module.exports = {
    name: 'guilhermo',
    cooldown: 5,
    description: 'Comando que mostra uma foto do guilherme, só isso mesmo.',
    aliases: ['guilherme', 'gui'],
	execute(client, message) {

        guilhermoEmbed.setDescription(randomize(false));
        guilhermoEmbed.setImage(randomize(true));

        message.channel.send(guilhermoEmbed);
	},
};