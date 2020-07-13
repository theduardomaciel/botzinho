const { MessageEmbed } = require('discord.js');


const guilhermoEmbed = new MessageEmbed()
// Set the title of the field
.setTitle('Eae meu chapa, então...')
// Set the color of the embed
.setColor(0xff0000)
// Set the main content of the embed
.setDescription('"A solidão me fez solidão. - Alguém ai - 2012"')
.attachFiles(['../DiscordBot/assets/gui.png'])
.setImage('attachment://gui.png');
// Send the embed to the same channel as the message

function randomizeFrase() {
    const values = [
        '"A culpa da pedofilia é dessa criançada gostosa"',
        '"Mendigo não é gente, porque não aparece no Censo"',
        '"$%#@% com sua vó só é estranho quando ela acorda"',
        '"Se estiver com raiva, bata num nazista. O que ele vai fazer chamar Hitler? E se ele aparecer, bata nele também"',
        '"Exerça seu direito de falar palavrões, em algum lugar alguém tá sendo espancado pela mãe por chamar o irmão de mané"',
        '"Se eu for presidente, não só o dopping vai tá liberado, mas vai ter uma categoria chamada Super Dopping. Imagina que louco, uns cara com 6 braços, 7 pernas, 4 olhos, barbatana. Vai ser Brabo."',
        '"Eu não sou homofóbico, porque homofobia é frescura e frescura é coisa de gay"',
        '"Se o Yuri cair da janela a gente ganha aula vaga?"',
        '"Mano, quem criou o nome da fobia de palavras grandes é um gênio do mal. O cara vai no médico perguntar o que ele tem e o doutor diz que ele tem Hipopotomonstrosesquipedaliofobia."',
        '"Exame de próstata é um negócio estranho, não tenho certeza se funciona. Amanhã vou de novo só pra ter certeza se é realmente eficaz."',
        // '"Hentai é bom, que vc bate punheta sem se sentir culpado."',
    ],
    fraseEscolhida = values[Math.floor(Math.random() * values.length)];
    // do something with the selected value
    return fraseEscolhida;
}

module.exports = {
    name: 'guilhermo',
    cooldown: 5,
    description: 'Comando que mostra uma foto do guilherme, só isso mesmo.',
    aliases: ['guilherme', 'gui'],
	execute(client, message) {

        guilhermoEmbed.setDescription(randomizeFrase());

        message.channel.send(guilhermoEmbed);
	},
};