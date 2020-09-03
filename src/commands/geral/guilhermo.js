const { MessageEmbed } = require('discord.js');

const json = require('./guilhermo.json');

const guilhermoEmbed = new MessageEmbed()
.setTitle('Eae meu chapa, então...')
.setColor(0xff0000)
.setImage('https://lh3.googleusercontent.com/MHAwF12fK1Ri1Ud7lK02VcjnZn05HuCCg2bdKF3q25Kekq82NQZGQaRx3eEagpngB7m5yyTkND7S0MJBJY1sIbM4abdDkoiuoZLEbcQYm3dLDwbnZ9VCVAT5FVZQHlliNTAZVxunJc6zN3mPHcU8ThG0Hi9gYshNq90duiDStGrTnOz16F3vPxeWEuY7GOOtFMSfTwcVm8G5CvCeV3v1yac-sjM5C2rG1hB9YyjjYsXYoLVEFUbL-7QGjJWv6kGRWW8AF_wdZdJiNJxcZ0yCbBY2m8NixhgIGW2MUzasaEXi9kWia73mrQLG0mPIQaAi91tKkSvCsMHeHJe-dSvlvrcyy1Cdj0PQdwjBCDfkESXcx7Ra_17cmprK2fKQ6fcMM1HiN-gGfEw7t-Jj798beVz9qLPcctiYNEPTfPxNnptesiQuYbROcQJSBnPt7dnbpsKwdDfTYDPzKNripop7TrC7lJBBRXNn94ASaJnfDyVPBFH5KRmUSyyBhQXjRp2JAtpHBzuBsl0SVATWtrbKhrbyJnTpqc_2SNdXeuPaBOzhSqI9UathjXqNp0MlTgBIA3-34nfmruGN9tQBe_1EplW5hLrSCLhPiVio6DclUzgg933wTZEmNc33k9K3CBKW98v8tn_H-laMdl8X7qxTdYbCMhRjW-4H1its3e3WRfqArrUal4nJQaW3IdPQydATPqU=s867-w867-h657');

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