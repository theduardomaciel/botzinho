const Discord = require('discord.js');

const noCorrectAnswer = new Discord.MessageEmbed().setDescription(`Parece que ninguém acertou desta vez... infelizmente :(`)

const quiz = require('./quiz.json');

const execute = (client, message, args, isModerator) => {

    const questionsAmount = args[0]

    if (!args[0])

    const item = quiz[Math.floor(Math.random() * quiz.length)];
    const filter = response => {
        return item.respostas.some(answer => answer.toLowerCase() === response.content.toLowerCase());
    };

    // Formato: [0 = tipo(texto ou reações)]

    message.channel.send(item.pergunta).then(() => {
        message.channel.awaitMessages(filter, { max: 1, time: 15000, errors: ['time'] })
            .then(collected => {
                const correctAnswer = new Discord.MessageEmbed().setDescription(`${collected.first().author} respondeu corretamente! Parabéns!`)
                message.channel.send(correctAnswer);
            })
            .catch(collected => {
                message.channel.send(noCorrectAnswer);
            });
    });


}

module.exports = {
    name: 'quiz',
    description: 'Disponível somente para moderadores. É responsável por iniciar um novo quiz no canal.',
    cooldown: 5,
    guildOnly: true,
    execute,
};