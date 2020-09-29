const Discord = require('discord.js');

function MusicPercentage(queue) {
    const duration = queue.musics[0].seconds;
    const actualSeconds = queue.dispatcher.streamTime / 1000; // transformando o valor ms (milisegundo) para s (segundo)
    const remainingSeconds = duration - actualSeconds;
    const remainingPercentage =  Math.floor(remainingSeconds / duration * 100);
    const actualPercentage = 100 - remainingPercentage;
    //console.log(`Porcentagem atual: ${actualPercentage}`);
    //console.log(`Porcentagem restante: ${remainingPercentage}`);
    return actualPercentage;
}

function TransformInTimeStamp(miliseconds) {

    const milisecondsInSeconds = miliseconds / 1000;
    let minutes = Math.floor(milisecondsInSeconds / 60);
    let remainingSeconds = Math.floor(milisecondsInSeconds - minutes * 60);
    let hours;

    if (remainingSeconds < 10) {
        remainingSeconds = `0${remainingSeconds}`
    } else if (minutes < 10) {
        minutes = `0${minutes}`
    }

    if (minutes > 60) {
        let hours = Math.floor(minutes / 3600);
        return `${hours}:${minutes}:${remainingSeconds}`
    }

    return `${minutes}:${remainingSeconds}`;
}

function SetProgressBar(actualPercentage) {

    const totatlBarsQuantity = 25;
    let barArray = new Array();

    for (let i = 0; i < 100; i++) {
        if (actualPercentage > i) {
            let barsQuantity = Math.floor(actualPercentage * totatlBarsQuantity / 100);
            for (let l = 1; l < barsQuantity; l++) {
                barArray.push('[▬](https://github.com/theduardomaciel)')
            }
            barArray.push(':radio_button:')
            const leftBars = totatlBarsQuantity - barsQuantity;
            for (let l = 1; l < leftBars; l++) {
                barArray.push('▬')
            }
            
            //console.log('Quantidade de Barras: ' + barsQuantity)
            return barArray.join('');
        }
    }
}

let update;
let previousMessage;

const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);

    if (!queue) {
        const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
        return message.channel.send(notPlaylist);
    }

    const playingEmbed = new Discord.MessageEmbed().setTitle(`${queue.musics[0].title}`)

    function LoadBar() {
        if (queue.musics[0]) {
            bars = SetProgressBar(Math.floor(MusicPercentage(queue)))
            playingEmbed.setDescription(`~ Adicionada por <@${queue.users[0].id}>
            ${bars}
            [${TransformInTimeStamp(queue.dispatcher.streamTime)}/${queue.musics[0].timestamp}]`)
        }
    }

    //playingEmbed.setColor('#7289da');
    //playingEmbed.setThumbnail(queue.musics[0].thumbnail)
    playingEmbed.setColor('#000000');

    LoadBar(queue)

    message.channel.send(playingEmbed).then(sentMessage => {
        if (previousMessage) return previousMessage.delete();
        previousMessage = sentMessage;
        hasUsed = true;
        function ReloadMessage() {
            try {
                if (!queue.musics[0]) {
                    return clearInterval(update);
                }
                LoadBar(queue)
                sentMessage.edit(playingEmbed)
            } catch (error) {
                console.log(error);
            }
        }
        update = setInterval(ReloadMessage, 2500)
    });

    // TENTAR ADICIONAR SISTEMA DE ATUALIZAÇÃO E EDIÇÃO DA MENSAGEM PARA DAR IDEIA DE MOVIMENTO

};

module.exports = {
    name: 'nowplaying',
    description: 'Mostra qual a música que está tocando atualmente.',
	aliases: ['tocando', 'agora', 'tocandoagora', 'playing', 'now'],
    cooldown: 5,
    guildOnly: true,
    execute,
};