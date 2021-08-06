const Discord = require('discord.js');

const execute = (client, message, args) => {

    const channel = message.channel;

    if (args[1] === 'admin') {
        const embed = new Discord.MessageEmbed()
        embed.setTitle('Pojeto Sala Comunitária - BETA')
        embed.setDescription(`Com o acesso ao Microsoft Teams provido pela rede do Colégio um projeto interno surgiu sugerindo a implementação deste sistema na sala.\n
        A ferramenta da Microsoft possui um armazenamento na nuvem de 1TB, mais do que suficiente para os arquivos relacionados ao colégio como arquivos de atividades e provas.\n
        Antes de solicitar sua participação no projeto, leia o documento que explica com maior eficácia o objetivo do projeto, além de informações de como participar: https://github.com/theduardomaciel/botzinho/wiki/Introdu%C3%A7%C3%A3o-ao-Microsoft-Teams`)
    
        embed.react("☄️");

    }

};

module.exports = {
    name: 'teams',
    description: 'Responsável por enviar a solicitação de permissão de utilização do Microsoft Teams da turma.',
	aliases: ['microsoft', 'office'],
    cooldown: 5,
    guildOnly: true,
    execute,
};