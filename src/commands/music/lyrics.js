const Discord = require('discord.js')

const Genius = require('genius-lyrics')
const genius = new Genius.Client(process.env.GENIUS);

const execute = async (client, message, args) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue && !args[0]) {
        const missingArgumentEmbed = new Discord.MessageEmbed().setDescription(`**Como você não está participando de nenhuma rave, nem me informou o nome da música, não posso ser adivinho. Por favor, digite o nome da música ou entre em alguma sala de áudio com uma rave ativa.**`)
        return message.channel.send(missingArgumentEmbed);
    }

    //const lyricsEmbed = new Discord.MessageEmbed()
    //lyricsEmbed.setTitle(queue.musics[0].name)
    //lyricsEmbed.setDescription(getLyrics());

    const requiredString = require('./play').userRequire
    console.log(requiredString);

    let string
    if (!args[0]) {
        string = requiredString;
    } else {
        string = args.join(' ');
    }
    
    try {
        // Requerindo letra
        const searches = await genius.songs.search(string)
        console.log(`Usuário está pedindo a letra de: ${string}`)
        const song = searches[0]
        console.log(`Música encontrada: ${song.title}`)
        let lyrics
        try {
            lyrics = await song.lyrics(true);
        } catch (error) {
            console.log(error)
        }
        console.log(lyrics)

        // Enviando letra
        const lyricsEmbed = new Discord.MessageEmbed()
        lyricsEmbed.setTitle(`${song.artist.name} - ${song.title}`)
        if (lyrics) {
            if (lyrics.length > 2048) return message.channel.send(`A letra desta música possui ${lyrics.length} caracteres, que ultrapassam o limite de 2048 do Discord. Desculpe.`)
        }
        lyricsEmbed.setDescription(lyrics); 
        message.channel.send(lyricsEmbed);

    } catch (error) {
        console.log(error);
        const withoutLyric = new Discord.MessageEmbed().setDescription(`**Não foi possível encontrar a letra desta música, desculpe.**
        Caso esteja em uma rave, tente digitar o nome da música sozinho: \`!letra [nome da música]\`); ou o nome da música com o artista em seguida: \`!letra [nome da música] - [nome do artista]\` para facilitar meu entedimento.`)
        return message.channel.send(withoutLyric);
    }


};

module.exports = {
    name: 'lyrics',
    description: 'Mostra a letra da música tocando no momento.',
	aliases: ['letra', 'karaoke', 'cantarolar'],
    cooldown: 5,
    guildOnly: true,
    execute,
};