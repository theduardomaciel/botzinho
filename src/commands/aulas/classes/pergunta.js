const Discord = require('discord.js');
const { response } = require('express');
const { toUpperCase } = require('ffmpeg-static');
const mongoose = require('mongoose');

const Guild = require('../../../database/models/GuildConfig');

const execute = async (client, message, args, user) => {

    const guildId = message.guild.id;
    const name = user.username;

    const errorMessage = new Discord.MessageEmbed().setDescription(`Infelizmente ocorreu um erro ao tentar adicionar a pergunta ao banco de dados.`);

    const settings = await Guild.findOne({
        guildId: guildId
    }, (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
            return message.channel.send(new Discord.MessageEmbed().setDescription(`Não consegui encontrar as informações do servidor atual.\n**Por favor procure um moderador do servidor para verificar se o servidor foi corretamente cadastrado.**`))
        }
        return;
    })

    const settingsLoaded = await settings;

    if (settings.actualClassInfo.length < 1) {
        try {
            await settingsLoaded.updateOne(
                { actualClassInfo: mongoose.SchemaTypes.Array }
            )
        } catch (error) {
            console.error(error)
        }
        console.log(`Array de pergunta e aula atual foi criada no servidor ${message.guild.name}.`);
    }

    let classId = parseInt(args[0]);
    let questionId = parseInt(args[2])
    const classIdIsNotANumber = isNaN(classId)
    const questionIdIsNotANumber = isNaN(questionId)

    let commandType;
    if (classIdIsNotANumber) {
        commandType = 0;
        classId = settings.actualClassInfo['class'];
    } else {
        commandType = 1;
    }

    // Caso o usuário não vá inserir nenhum id
    if (commandType === 0 || !args[2]) {
        questionId = settings.actualClassInfo['question'];
    }

    let questionTime = 10;

    if (args[1]) {
        questionTime = parseInt(args[1]);
    }

    const aula = settings.guildClasses[classId]
    
    console.log(questionId);

    let question;
    if (!questionIdIsNotANumber) {
        question = settings.guildQuestions[classId][questionId];
    } else {
        console.error(`Não foi possível identificar o ID da questão.`);
    }
    //const question = settings.guildQuestions[classId][questionId]

    // Estrutura da pergunta salva no banco de dados:
    // enunciado, attachmentUrl, tipo, resposta, tempo (de resposta)

    const usersThatWereCorrectArray = []

    function EndPublishedQuestion(questionId, totalSize) {
        const usersArray = usersThatWereCorrectArray[questionId]
        const usersThatWereCorrectMessage = new Discord.MessageEmbed()
            .setTitle(`Uopa. **O tempo da questão ${questionId} acabou.**`)
        if (usersArray && usersArray.length > 1) {
            usersThatWereCorrectMessage.setDescription(`Parabéns às **${totalSize} pessoas** que participaram e aos usuários ${usersArray} que acertaram a questão.`)
        } else if (usersArray && usersArray.length == 1) {
            usersThatWereCorrectMessage.setDescription(`Parabéns às **${totalSize} pessoas** que participaram e ao usuário ${usersArray} que foi **o único que acertou a questão.**`)
        } else if (usersArray && usersArray.length == 0) {
            usersThatWereCorrectMessage.setDescription(`Parabéns às **${totalSize} pessoas** que participaram, mas desta vez não deu certo.
            **Ninguém acertou a questão!**`)
        }
        return message.channel.send(usersThatWereCorrectMessage);
    }

    if (args[commandType] === 'list' || args[commandType] === 'lista') {

        const listEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setAuthor('Botzinho', 'https://pbs.twimg.com/profile_images/1030607655478415366/LBoC35SF_400x400.jpg', 'https://twitter.com/theduardomaciel')

        // Caso não queira mostrar o título, colocar o título dentro do else
        listEmbed.setTitle(`Questões Cadastradas na aula de ID: ${classId}`);
        if (settings.guildQuestions.length == 0) {
            listEmbed.setDescription(`Não há nenhuma questão cadastrada nesta aula!`);
        } else if (!settings.guildClasses[classId]) {
            listEmbed.setDescription(`Não há nenhuma aula cadastrada no servidor com o ID: ${classId}!`)
        } else {
            if (settings.guildQuestions[classId].length == null) {
                return;
            }
            for (let i = 0; i < settings.guildQuestions[classId].length; i++) {
                const iterationQuestion = settings.guildQuestions[classId][i]
                const full = iterationQuestion['enunciado']
                const enunciado = full.substring(0, 25)
                if (iterationQuestion['tipo'] === 'aberta') {
                    listEmbed.addField(`**Repostas Possíveis**: ${iterationQuestion['respostas']}`, 
                    `**${i}.** ${enunciado}...`, true);
                } else {
                    //A: ${question['respostas'][0]} | B: ${question['respostas'][1]} | C: ${question['respostas'][2]} | D: ${question['respostas'][3]} | E: ${question['respostas'][4]} |
                    listEmbed.addField(`**Reposta: **${iterationQuestion['respostas'][5]}`, 
                    `**${i}.** ${enunciado}...`, true);
                }
            }
        }
        try {
            message.channel.send(listEmbed);
        } catch (error) {
            const limitEmbed = new Discord.MessageEmbed()
            .setDescription(`Não foi possível enviar a lista com as questões desta aula por que há muitas questões cadastradas na aula.`)
            message.channel.send(limitEmbed);
        }
        message.delete();
        return;
    } else if (args[commandType] === 'publicar' || args[commandType] === 'publish') {

        // Após verificarmos se a array existe (caso não exista, criamos uma) vamos atualizá-la com as informações de ID que temos
        await settingsLoaded.updateOne(
            { actualClassInfo: {
                class: classId,
                question: questionId,
            } }
        )

        const questionMessage = new Discord.MessageEmbed()
        const materia = aula['materia']
        questionMessage.setTitle(`QUESTÃO DE ${materia.toUpperCase()}:`)
        questionMessage.setDescription(`${questionId}. ${question['enunciado']}`)
        questionMessage.setImage(question['attachment'])
        questionMessage.setAuthor(`${question['tempo']} minuto(s) restantes`)

        if (question['tipo'] === 'aberta') {
            questionMessage.setFooter(`Envie a resposta via DM para o Botzinho através do comando: !resposta [resposta].`);
            return message.channel.send(question);
        } else if (question['tipo'] === 'fechada') {
            questionMessage.addFields(
                { name: `A:`, value: question['respostas'][0] },
                { name: `B:`, value: question['respostas'][1] },
                { name: `C:`, value: question['respostas'][2] },
                { name: `D:`, value: question['respostas'][3] },
                { name: `E:`, value: question['respostas'][4] },
            )
            message.channel.send(questionMessage)
            .then(async sentMessage => {
                // É necessário colocar um ID (que neste caso é o index/posição da array de usuários na array de usuários geral) em cada objeto de usuários que acertaram, caso mais de uma pergunta seja publicada
                usersThatWereCorrectArray.splice(questionId, 1, [])
                try {
                    await sentMessage.react('🇦')
                    await sentMessage.react('🇧')
                    await sentMessage.react('🇨')
                    await sentMessage.react('🇩')
                    await sentMessage.react('🇪')
                } catch (error) {
                    console.error('Não foi possível reagir a algum dos emojis.');
                }
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '🇦' 
                    || reaction.emoji.name === '🇧' 
                    || reaction.emoji.name === '🇨' 
                    || reaction.emoji.name === '🇩' 
                    || reaction.emoji.name === '🇪' && user.id === message.author.id;
                };
                let time = (question['tempo']) * 60000
                console.log(time)

                const usersThatCorrect = usersThatWereCorrectArray[questionId]
                
                function CheckAlternative(alternative, user) {
                    if (question['respostas'][5] === alternative) {
                        // Manter essa verificação antes da inserção na array para que ele não detecte o usuário no primeiro clique
                        if (usersThatCorrect.indexOf(user) !== -1) {
                            const index = usersThatCorrect.indexOf(user);
                            usersThatCorrect.splice(index, 1);
                        }
                        usersThatCorrect.push(user);
                    }
                }

                const collector = sentMessage.createReactionCollector(filter, { time: time });
                collector.on('collect', (reaction, user) => {
                    let alternative;
                    switch (reaction.emoji.name) {
                        case '🇦':
                            alternative = 'A'
                            CheckAlternative(alternative, user)
                            break;
                        case '🇧':
                            alternative = 'B'
                            CheckAlternative(alternative, user)
                            break;
                        case '🇨':
                            alternative = 'C'
                            CheckAlternative(alternative, user)
                            break;
                        case '🇩':
                            alternative = 'D'
                            CheckAlternative(alternative, user)
                            break;
                        case '🇪':
                            alternative = 'E'
                            CheckAlternative(alternative, user)
                            break;
                    }
                });
                collector.on('end', collected => {
                    EndPublishedQuestion(questionId, collected.size);
                    collector.stop();
                });
                let update;
                function ReloadMessage() {
                    try {
                        time -= 60000;
                        if (time < 1) {
                            return clearInterval(update);
                        }
                        if (time)
                        questionMessage.setAuthor(`${[time / 60000]} minuto(s) restantes`);
                        sentMessage.edit(questionMessage);
                        console.log(`Atualizando mensagem...`);
                    } catch (error) {
                        console.log(error);
                    }
                }
                update = setInterval(ReloadMessage, 60000)
            })
        }
    } else if (args[commandType] === 'end' || args[commandType] === 'stop') {
        // Caso a aula e a questão não forem informadas que deve ser encerrada, utilizamos as informações de aula e questão atual
        EndPublishedQuestion(usersThatWereCorrectArray[questionId], '(indisponível)');
    } else if (args[commandType] === 'apagar' || args[commandType] == 'remove' || args[commandType] == 'remover' || args[commandType] == 'deletar' || args[commandType] == 'delete') {
            const confirmDelete = new Discord.MessageEmbed()
            .setTitle(`Deseja prosseguir com a remoção da questão com ID: ${questionId}?`)
            .setDescription(`Verifique as informações abaixo e confirme através da reação:
            **Informações da Questão:**`)
            confirmDelete.addField(`Enunciado:`, `${questionId}. ${question['enunciado']}`)
            
            confirmDelete.setColor('#ff0000');
            message.channel.send(confirmDelete)
            .then(async sentMessage => {
                try {
                    await sentMessage.react('✅');
                    await sentMessage.react('❌');
                } catch (error) {
                    console.error('Não foi possível reagir a algum dos emojis.');
                }

                const filter = (reaction, user) => {
                    return reaction.emoji.name === '✅' || reaction.emoji.name === '❌' && user.id === message.author.id;
                };
                
                function CancelDeleteRequirement() {
                    sentMessage.delete();
                    message.delete();
                    const remotionCancelled = new Discord.MessageEmbed()
                    .setColor('#FFFF00')
                    .setDescription(`**A remoção da questão foi cancelada.**\nPara tentar remover uma questão novamente utilize o comando: \`!questão remove [id da aula] [id da questão]\`.`);
                    return message.channel.send(remotionCancelled);
                }

                const collector = sentMessage.createReactionCollector(filter, { time: 15000 });

                let alreadyConfirmed = false;
                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '✅') {
                        RemoveQuestion(questionId);
                        sentMessage.delete();
                    } else {
                        CancelDeleteRequirement();
                    }
                    alreadyConfirmed = true;
                });
                collector.on('end', collected => {
                    if (alreadyConfirmed == false) {
                        CancelDeleteRequirement();
                        collector.stop();
                    }
                });
            })
        /* const wrongArgs = new Discord.MessageEmbed()
        .setDescription(`**O ID da aula informado não é um número. Por favor, revise os dados informados.**`)
        .setColor('ffff00');
        return message.channel.send(wrongArgs); */
    } else {
        if (!settings.guildClasses[classId]) {
            const errorMessage = new Discord.MessageEmbed().setDescription(`Não há nenhuma aula cadastrada no servidor com o ID: ${classId}!`)
            message.channel.send(errorMessage);
            return message.delete();
        }
        Step1();
    }

    // Primeira Etapa
    // Legenda: 0 = id da aula | 1 = tempo da atividade

    async function CancelCreation() {
        const inactivityMessage = new Discord.MessageEmbed()
        .setDescription('A inserção da questão foi cancelada por conta de inatividade. Por favor inicie o processo de criação novamente.')
        message.channel.send(inactivityMessage);
        message.delete();
        return;
    }

    // Passos: 1 = enunciado e anexos | 2 = tipo de pergunta | 3 = respostas, que dependendo do tipo de pergunta é diferente
    // No caso de questão aberta, o moderador deve inserir até 5 respostas para a pergunta
    // No caso de questão fechada, o moderador deve selecionar qual das alternativas de A a E está correta

    // Passo 1: inserção do enunciado e anexos
    function Step1() {
        const step1 = new Discord.MessageEmbed()
        .setAuthor(`Passo 1 | enunciado e anexos:`)
        .setTitle(`Já tenho o ID da aula (ID: ${classId}) e o tempo máximo (${questionTime} minuto(s)) de resposta.`)
        .setDescription(`Agora **envie no chat atual o enunciado da questão** e um anexo, caso necessário.`)
        .setColor('#ffff00')
        message.channel.send(step1)
        .then(async step1Message => {
            let alreadyConfirmed = false
            const maxResponseTime = 180000;
            const filter = response => {
                return message.author.id === response.author.id;
            }
            const collector = message.channel.createMessageCollector(filter, { max:1 , time: 100000 });
            collector.on('collect', collectedMessage => {
                alreadyConfirmed = true;
                const enunciado = collectedMessage.content;

                let attachment;
                const attachments = (collectedMessage.attachments).array();
                if (attachments && attachments[0]) {
                    attachment = attachments[0].url;
                }

                Step2(enunciado, attachment);
                step1Message.delete()
            });
            collector.on('end', collected => {
                if (alreadyConfirmed == false) {
                    CancelCreation();
                    collector.stop();
                }
            });
        });
    }

    // Função de Pergunta aberta para o Passo 2
    async function PerguntaAberta(enunciado, attachmentUrl) {
        let maxResponses = 5;
        let leftResponses = maxResponses;

        const openQuestion = new Discord.MessageEmbed()
        .setAuthor(`Passo 2 | questão aberta:`)
        .setTitle('Digite agora as respostas para a questão aberta inserida.')
        .setDescription(`**Observações:**`)
        .setColor('#ffff00')
        .setDescription(`**Observações:**
            - Comece agora **digitando a primeira resposta possível para a pergunta**.
            - Digite uma resposta e aperte ENTER para em seguida inserir outra, com um máximo de ${maxResponses} respostas.`)

        let responses = [];

        let firstMessage = true;
        let alreadyConfirmed = false;

        async function UpdateMessage(messageToEdit) {

            openQuestion.setTitle(`Escreva agora a Resposta ${(maxResponses + 1) - leftResponses}`)
            openQuestion.setDescription(`**Observações:**
            - Reaja com o símbolo ✅ para concluir a inserção de respostas caso não queira inserir o máximo de respostas.
            (ainda podem ser inseridas **${leftResponses}** respostas)`)

            if (firstMessage == true) {
                try {
                    await messageToEdit.react('✅');
                } catch (error) {
                    console.error('Não foi possível reagir a algum dos emojis.');
                    messageToEdit.delete();
                    message.channel.send(errorMessage);
                    return;
                }
    
                const reactionFilter = (reaction, user) => {
                    return reaction.emoji.name === '✅' && user.id === message.author.id;
                };
                const reactionCollector = messageToEdit.createReactionCollector(reactionFilter, { time: 120000 });
                reactionCollector.on('collect', (reaction, user) => {
                    alreadyConfirmed = true
                    CadastrarPergunta(enunciado, attachmentUrl, 'aberta', responses);
                    reactionCollector.stop();
                    return;
                });
            }

            firstMessage = false;
            messageToEdit.edit(openQuestion);

        }

        message.channel.send(openQuestion)
        .then(async sentMessage => {

            const filter = response => {
                return message.author.id === response.author.id;
            }
            const collector = message.channel.createMessageCollector(filter, { time: 120000 });
    
            collector.on('collect', collectedMessage => {
                if (leftResponses > 0) {
                    leftResponses -= 1;
                    responses.push(collectedMessage.content);
                    if (leftResponses < maxResponses) {
                        UpdateMessage(sentMessage);
                    }
                } else {
                    alreadyConfirmed = true;
                    CadastrarPergunta(enunciado, attachmentUrl, 'aberta', responses);
                    return;
                }
            });
            collector.on('end', collected => {
                if (alreadyConfirmed == false) {
                    sentMessage.delete();
                    CancelCreation();
                }
            });  
        }); 

    }

    async function PerguntaFechada(enunciado, attachmentUrl) {
        const closedQuestion = new Discord.MessageEmbed()
        .setAuthor(`Passo 2 | questão fechada:`)
        .setTitle(`Digite o valor de cada uma das letras da questão.`)
        .setDescription(`**Observações:**
        - Os valores de cada alternativa devem ser separado por pontos-e-vírgulas (;), sem espaço entre valores.
        **- Exemplo: 24.5;12.8;14.25;23.4;[valor vazio]**`)
        .setColor('#ffff00')
        message.channel.send(closedQuestion);

        let string = null;

        const filter = response => {
            return message.author.id === response.author.id;
        }
        const collector = message.channel.createMessageCollector(filter, { max:1 });
        collector.on('collect', collectedMessage => {
            const string = collectedMessage.content;
            const responsesTable = string.split(`;`)
            if (responsesTable.length <= 4) {
                responsesTable.push(null);
            }
            console.log(responsesTable)
            ClosedQuestionAnswer(responsesTable);
        });

        async function ClosedQuestionAnswer(responsesTable) {
            let alreadyConfirmed = false;
            const correctAnswer = new Discord.MessageEmbed()
                .setAuthor(`Passo 2 | questão fechada:`)
                .setDescription(`Agora informe qual das alternativas é a correta.`)
                .setColor('#ffff00')

            message.channel.send(correctAnswer)
            .then(async sentMessage => {
                try {
                    await sentMessage.react('🇦')
                    await sentMessage.react('🇧')
                    await sentMessage.react('🇨')
                    await sentMessage.react('🇩')
                    await sentMessage.react('🇪')
                } catch (error) {
                    console.error('Não foi possível reagir a algum dos emojis.');
                }
                const filter = (reaction, user) => {
                    return reaction.emoji.name === '🇦' 
                    || reaction.emoji.name === '🇧' 
                    || reaction.emoji.name === '🇨' 
                    || reaction.emoji.name === '🇩' 
                    || reaction.emoji.name === '🇪' && user.id === message.author.id;
                };
                const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
                collector.on('collect', (reaction, user) => {
                    let alternative = null;
                    switch (reaction.emoji.name) {
                        case '🇦':
                            alternative = 'A';
                            break;
                        case '🇧':
                            alternative = 'B';
                            break;
                        case '🇨':
                            alternative = 'C';
                            break;
                        case '🇩':
                            alternative = 'D';
                            break;
                        case '🇪':
                            alternative = 'E';
                            break;
                        default:
                            alternative = 'Deu errado galera :)';
                            break;
                    }
                    alreadyConfirmed = true
                    sentMessage.delete();
                    responsesTable.push(alternative)
                    console.log(responsesTable);
                    CadastrarPergunta(enunciado, attachmentUrl, 'fechada', responsesTable);
                });
                collector.on('end', collected => {
                    if (alreadyConfirmed == false) {
                        sentMessage.delete();
                        CancelCreation();
                        collector.stop();
                    }
                });
            });
        }
    }

    // Passo 2: tipo de pergunta
    async function Step2(enunciado, attachmentUrl) {
        const step2 = new Discord.MessageEmbed()
        .setAuthor(`Passo 2 | tipo de pergunta:`)
        .setTitle('Agora que já tenho a questão salva, qual é o seu formato?')
        .setDescription(`ABERTA ✍️ ou MÚLTIPLA ESCOLHA ⭕
        (Caso você tenha inserido a questão de forma errada, clique no ícone de voltar ↩️ para inseri-la novamente.)`)
        .setColor('#ffff00')
        message.channel.send(step2)
        .then(async step2Message => {
            try {
                await step2Message.react('✍️');
                await step2Message.react('⭕');
                await step2Message.react('↩️');
            } catch (error) {
                console.error('Não foi possível reagir a algum dos emojis.');
            }
            const filter = (reaction, user) => {
                return reaction.emoji.name === '✍️' || reaction.emoji.name === '↩️' || reaction.emoji.name === '⭕' && user.id === message.author.id;
            };

            const collector = step2Message.createReactionCollector(filter, { time: 15000 });
            let alreadyConfirmed = false;
            collector.on('collect', async (reaction, user) => {
                if (reaction.emoji.name === '✍️') {
                    step2Message.delete();
                    PerguntaAberta(enunciado, attachmentUrl)
                } else if (reaction.emoji.name === '⭕') {
                    step2Message.delete();
                    PerguntaFechada(enunciado, attachmentUrl);
                } else if (reaction.emoji.name === '↩️') {
                    step2Message.delete();
                    Step1();
                }
                alreadyConfirmed = true
            });
            collector.on('end', collected => {
                if (alreadyConfirmed == false) {
                    CancelCreation();
                    collector.stop();
                }
            });

        })
    }

    async function CadastrarPergunta(enunciado, attachmentUrl, tipo, respostas) {

        //let questionsCount = settings.guildQuestions[classId].length

        try {
            await settings.updateOne(
                { $push: { ["guildQuestions." + classId]: {
                    class: classId,
                    enunciado: enunciado,
                    attachment: attachmentUrl,
                    tipo: tipo,
                    respostas: respostas,
                    tempo: questionTime,
                }}}
            )
            const perguntaCriada = new Discord.MessageEmbed()
            .setDescription(`**A questão foi criada e inserida no banco de dados do servidor com sucesso.**\nPara acessar a lista de questões com suas respectivas informações digite: \`!pergunta [id da aula] lista\`.`)
            .setColor('#00FF00');
            message.channel.send(perguntaCriada);
            message.delete();
            return;
        } catch (error) {
            console.error(error);
            message.channel.send(errorMessage);
            return message.delete();
        }
    }

    async function RemoveQuestion(id) {
        try {
            await settings.updateOne(
                { $pull: { ["guildQuestions." + classId]: { class: question['class'], tipo: question['tipo'], enunciado: question['enunciado'] } } }
            )
        } catch (error) {
            console.error(error)
        }
        const questionRemoved = new Discord.MessageEmbed().setDescription(`**A questão foi deletada e removida do banco de dados da aula com sucesso.**\nPara acessar a lista de questões com suas respectivas informações digite: \`!questão [id da aula] lista\`.`);
        return message.channel.send(questionRemoved);
    }

};

module.exports = {
    name: 'pergunta',
    description: `Cria uma pergunta e a adiciona na aula especificada (pelo seu ID) através do primeiro argumento do comando. As questões possuem enunciado, podem possuir anexo e podem ser ou abertas ou de múltipla escolha.\nExemplo: \`!pergunta [ID da aula] [enunciado] [anexo/imagem - opcional]\`\n***Disponível somente para moderadores.***`,
	aliases: ['questão', 'question', 'perguntas', 'questões'],
    cooldown: 5,
    guildOnly: true,
    execute,
};