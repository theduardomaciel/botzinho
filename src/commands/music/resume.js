const Discord = require('discord.js');

const execute = (client, message) => {
    const queue = client.queues.get(message.guild.id);
    if (!queue) {
        return message.reply('não existe nenhuma playlist sendo reproduzida.');
    }
    queue.dispatcher.resume();

    const resumeEmbed = new Discord.MessageEmbed()
    resumeEmbed.setColor('#00FF00');
    resumeEmbed.setDescription(`**A playlist atual foi retomada.** Para pausar, use o comando \`!pause\`.`)
    return message.channel.send(resumeEmbed);

};

module.exports = {
    name: 'resume',
    description: 'Retorna a música que foi anteriorimente pausada na playlist.',
	aliases: ['resume', 'voltar'],
    cooldown: 5,
    guildOnly: true,
    execute,
};