const Discord = require('discord.js');

const execute = async (client, message, args) => {
    const queue = client.queues.get(message.guild.id);

    // Verificando se há uma playlist tocando...
    try {
        if (!queue) {
            const notPlaylist = new Discord.MessageEmbed().setDescription(`Não há nenhuma playlist sendo reproduzida no momento.`)
            return message.channel.send(notPlaylist).then(messageSent => messageSent.delete({ timeout: 1000 }));
        }
    } catch(error) {
        console.log(error);
    }

    function shuffle(array) {
        
        for(let i = array.length - 1; i > 0; i--){
            const j = Math.floor(Math.random() * i)
            const temp = array[i]
            array[i] = array[j]
            array[j] = temp
        }
      
        return array;
      }
      
      shuffle(queue.musics);

      const shuffleEmbed = new Discord.MessageEmbed()
      shuffleEmbed.setColor('#0099ff');
      shuffleEmbed.setDescription(`A playlist atual foi embaralhada!`);
      message.channel.send(shuffleEmbed);
};

module.exports = {
    name: 'shuffle',
    description: 'Embaralha todas as músicas da playlist atual.',
	aliases: ['embaralhar', 'randomizar', 'bagunçar'],
    cooldown: 5,
    guildOnly: true,
    execute,
};
