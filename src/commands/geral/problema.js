const problemaSave = require('./problema.json')

function addDay() {
    problemaSave.quantidadeDias = problemaSave.quantidadeDias.parseInt() + 1
}

const execute = (client, message, args, isModerator) => {

    const problemaEmbed = new Discord.MessageEmbed()
    .setColor(0xff0000)
    .setTitle(`**DIAS SEM PROBLEMAS:**`)
    .setDescription(`Estamos há ${problemaSave.quantidadeDias} dia(s) sem problemas! \n Se esse número for maior que 1 já é um avanço :)`);

    message.channel.send(problemaEmbed)

}

setInterval(addDay,86400000)

module.exports = {
    name: 'problema',
    description: 'Mostra a quanto tempo o bot está funcionando sem problemas. Provavelmente o número será bem baixo constantemente.',
    cooldown: 10,
    execute,
};