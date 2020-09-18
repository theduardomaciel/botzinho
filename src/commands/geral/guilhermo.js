const { MessageEmbed } = require('discord.js');

const json = require('./guilhermo.json');

const guilhermoEmbed = new MessageEmbed()
.setTitle('Eae meu chapa, então...')
.setColor(0xff0000)

let fraseEscolhida = undefined;
let imagemEscolhida = undefined;

const frases = json.frases;
const imagens = json.imagens;

function randomize() {
    fraseEscolhida = frases[Math.floor(Math.random() * frases.length)];
    imagemEscolhida = imagens[Math.floor(Math.random() * imagens.length)];
}

module.exports = {
    name: 'guilhermo',
    cooldown: 5,
    description: 'Comando que mostra uma frase (muito politicamente incorreta) e uma foto do guilherme, só isso mesmo.',
    guildOnly: false,
    aliases: ['guilherme', 'gui'],
	execute(client, message) {
        
        randomize();
        guilhermoEmbed.setDescription(fraseEscolhida);
        guilhermoEmbed.setImage(imagemEscolhida);

        message.channel.send(guilhermoEmbed);
	},
};