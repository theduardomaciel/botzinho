const Discord = require('discord.js');
const mongoose = require('mongoose');

const Guild = require('../../../database/models/GuildConfig');

const fs = require('fs');
const fileName = './users.json'
const file = require(fileName);

const execute = async (client, message, args, user) => {

    const id = user.id;
    const name = user.username;

    const errorMessage = new Discord.MessageEmbed().setDescription(`Infelizmente ocorreu um erro ao enviar sua resposta. Por favor, tente novamente, \`${name}\`!`);

    const settings = await Guild.findOne({
        guildId: '739813765381619742'
    }, (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Não consegui encontrar as informações do servidor atual.\n**Por favor procure um moderador do servidor para verificar se o servidor foi corretamente cadastrado.**`))
        }
        return;
    })

    const correctAnswerMeesage = new Discord.MessageEmbed()
    .setTitle(`PARABÉNS! Você acertou a questão em cheio!`)
    .setDescription(`Agora aguarde o tempo da questão acabar para que o aluno ministrador possa explicar a questão aos que não entenderam.
    (ou a você que não entendeu e por algum motivo do além conseguiu chutar/raciocionar e acertar)`)
    .setColor(`#00ff00`)
    .setImage(`https://i.pinimg.com/originals/7f/3a/68/7f3a68fe9ae08dfcfb26a0863a20d375.gif`);
    
    const wrongAnswerMessage = new Discord.MessageEmbed()
    .setTitle(`Que pena! Não foi dessa vez...`)
    .setDescription(`Infelizmente você errou, mas como não fui programado com uma inteligência artificial que pode analisar sua resposta detalhadamente, você pode estar certo.
    Caso você realmente ache que sua resposta está correta, tente novamente escrevendo de outra maneira, como por exemplo:
    **- Exemplo: 12,5 -> 12.5**`)
    .setColor(`#ff0000`)

    const string = args.join(' ');
    const respostaDoUsuario = string.toLowerCase();
    console.log(respostaDoUsuario)

    function AlreadyAnswered() {
        for (let i = 0; i < file.users.length; i++) {
            const userId = file.users[i]
            let alreadyAnswered = false
            if (id == userId) {
                alreadyAnswered = true;
            }
            if (alreadyAnswered == true) {
                return true;
            } else {
                return false;
            }
        }
    }

    let acertou = false

    for (let i = 0; i < settings.guildQuestions.length; i++) {
        // if filtra somente as questões da aula que o usuário precisa
        const classId = settings.actualClassInfo['class']
        const questionId = settings.actualClassInfo['question']
        if (settings.guildQuestions[i]['class'] === classId) {
            const questionId = settings.actualClassInfo['question']
            // Filtramos agora a questão atual e agora só precisamos loopar entre as respostas para saber se alguma é a informada pela pessoa
            if (settings.guildQuestions[i]['id'] === questionId) {
                const respostasPossiveis = settings.guildQuestions[i]['respostas']
                for (let index = 0; index < respostasPossiveis.length; index++) {
                    const possibleAnswer = (respostasPossiveis[index]).toLowerCase();
                    if (respostaDoUsuario == possibleAnswer) {
                        acertou = true
                    } 
                }
            }
        }
    }

    function WriteInJSON() {
        fs.writeFile(fileName, JSON.stringify(file), function writeJSON(err) {
            if (err) return console.log(err);
            console.log(JSON.stringify(file));
            console.log(`Atualizando o arquivo: ${fileName}`);
          });
    }

    if (acertou == false) {
        message.channel.send(wrongAnswerMessage);
        const respondeu = AlreadyAnswered();
        if (!respondeu) {
            file.total = parseInt(file.total) + 1
            file.users.push(id);
        }
        WriteInJSON();
    } else {
        message.channel.send(correctAnswerMeesage);

        const respondeu = AlreadyAnswered();
        if (!respondeu) {
            file.total = parseInt(file.total) + 1
            file.correct = parseInt(file.correct) + 1
            file.users.push(id);
            file.usersCorrect.push(id);
            WriteInJSON();
            return;
        } else {
            if (file.usersCorrect.includes(id) === false) {
                file.correct = parseInt(file.correct) + 1
                file.usersCorrect.push(id);
                WriteInJSON();
            }
            return;
        }   

    }

};

module.exports = {
    name: 'resposta',
    description: `Utilizado para questões abertas de alguma aula criada.`,
	aliases: ['answer'],
    cooldown: 5,
    guildOnly: false,
    execute,
};