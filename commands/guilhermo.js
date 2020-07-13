const { MessageEmbed } = require('discord.js');


const guilhermoEmbed = new MessageEmbed()
// Set the title of the field
.setTitle('Eae meu chapa, então...')
// Set the color of the embed
.setColor(0xff0000)
// Set the main content of the embed
.setDescription('"A solidão me fez solidão. - Alguém ai - 2012"')
.setImage('https://lh3.googleusercontent.com/_nxxEixdDn-Ap1uHoyflQkh3xelF-unTjolwpUn04_ja-PovjbLZyVdAkJ5TLww0GC_K-JIMrLS-hvj7POIHETC9NoRps6KxT-Z7VektYwgjWxrdsCOZDNDjuyDsQaOgPGmFzM94MzWs5m8z0gtlLzJmeE7rvm00Jrx9Jv87TDWEQKF_WszcaTq-YbaaVXAkJK7VYkEYJ8PoKWa_CBLkErMLJZ-Ln8GxqDdDR0E5nDAM-7dCCzDdTg90c2vccOXg7FEUwxi72t3vpImSrNYe-hzqhcSONBEeXlQO93cT4BwM5bYaq1S3LKMaR5DptGWB8GZePlKyQpdSD_GbGB8cpRiYGGICVtZ9I8OgHJl96KOIB9wXP3zvU9iJoRMZZURVb0dAOEg8zAf97kN0ekmpmqCh5Rr1gel53Y5RcV0RN7SqjOgx4_a4psyTyLMuk3ijmRxppv5ZIYLams-mKTBZryTIVCqOZ2uz3zGp8XIk_zJeJon_JfM9iqI-OWWJmwEHs7n_VTC3Df-GXLBrouOE5EeGbIpT7Lopuqqt9R_r3n0i_8Fa76i-f2zQLj7mSOwX2GhwcLtBQQrO2VtNVi4O4PhVopGWIH6AdW0elwJy7kc2WA0B0r9JM4nA5ShxPjHy21_YgifP8I2Zo5fsZbcI4D60X1ZtwlO16FFf-hMAt8JGjjqytrG_qBNly0IZ1oE=w315-h230-no?authuser=0');
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