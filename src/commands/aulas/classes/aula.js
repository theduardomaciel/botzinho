const Discord = require('discord.js');
const mongoose = require('mongoose');

const Guild = require('..//..//..//database/models/GuildConfig');

const execute = async (client, message, args, user) => {

    const id = user.id;
    const guildId = message.guild.id;
    const name = user.username;

    const errorMessage = new Discord.MessageEmbed().setDescription(`Infelizmente ocorreu um erro ao tentar gerenciar uma aula. Por favor, tente novamente, \`${name}\`!`);

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

    let classId = parseInt(args[0]);
    const classIdIsNotANumber = isNaN(classId)

    let commandType;
    if (classIdIsNotANumber) {
        commandType = 0;
        classId = settings.actualClassInfo['class'];
    } else {
        commandType = 1;
    }

    if (settings.guildClasses.length < 1) {
        try {
            // Criar a array de guildClasses caso o servidor já existissse antes da função ser implementada
            await settingsLoaded.updateOne(
                { guildClasses: mongoose.SchemaTypes.Array }
            )
        } catch (error) {
            console.error(error)
        }
        console.log(`Array de aulas foi criada no servidor ${message.guild.name}.`)
    }
    if (settings.guildQuestions.length < 1) {
        try {
            await settingsLoaded.updateOne(
                { guildQuestions: mongoose.SchemaTypes.Array }
            )
        } catch (error) {
            console.error(error)
        }
        console.log(`Array de perguntas foi criada no servidor ${message.guild.name}.`);
    }

    const [materia, data, horario, aluno, ...restArgs] = args;
    const assuntos = restArgs.join(' ');

    const listEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setAuthor('Botzinho', 'https://pbs.twimg.com/profile_images/1030607655478415366/LBoC35SF_400x400.jpg', 'https://twitter.com/theduardomaciel')

    if (args[0] == 'lista' || args[0] == 'list') {
        if (settings.guildClasses.length == 0) {
            listEmbed.setDescription(`Não há nenhuma aula cadastrada neste servidor!`);
        }
        listEmbed.setTitle(`Aulas Cadastradas em: ${message.guild.name}`);
        for (let i = 0; i < settings.guildClasses.length; i++) {
            listEmbed.addField(`**${settings.guildClasses[i]['materia']}** (ID: ${i})`, 
            `**Data:** ${settings.guildClasses[i]['data']}
            **Horário:**, ${settings.guildClasses[i]['horario']}
            **Assunto(s):** ${settings.guildClasses[i]['assuntos']}
            **Aluno Ministrador:** ${settings.guildClasses[i]['aluno']}
            `, true);
        }
        try {
            message.channel.send(listEmbed);
        } catch (error) {
            console.log(error);
            const limitEmbed = new Discord.MessageEmbed()
            .setDescription(`Não foi possível enviar a lista com as aulas do servidor por que há muitas aulas cadastradas no banco de dados.`)
            message.channel.send(limitEmbed);
        }
        message.delete();
        return;
    } else if (args[0] == 'publish' || args[0] == 'publicar') {

        let authorImage = 'https://pbs.twimg.com/profile_images/1030607655478415366/LBoC35SF_400x400.jpg';

        /* if (commandType === 0 && args[1]) {
            authorImage = args[1];
        } else if (commandType === 1 && args[2]) {
            authorImage = args[2];
        }
 */
        const title = `Aula de ${settings.guildClasses[classId]['materia']}`
        const publicationEmbed = new Discord.MessageEmbed()
            .setColor('#0099ff')
            //.setAuthor(`Aluno Ministrador: ${settings.guildClasses[classId]['aluno']}`, authorImage, 'https://github.com/theduardomaciel/botzinho')
            .setTitle(title.toUpperCase())
            .setDescription(`No dia **${settings.guildClasses[classId]['data']}** no horário *previsto* de **${settings.guildClasses[classId]['horario']}** teremos uma aula de ***${settings.guildClasses[classId]['materia']}*** ministrada pelo aluno *${settings.guildClasses[classId]['aluno']}*.
            Na aula proposta, os assuntos a serem estudados serão: **${settings.guildClasses[classId]['assuntos']}**.
            Pedimos aos alunos que irão participar que cheguem no horário proposto para que a aula possa acabar em um horário adequado.
            *Obs.: Qualquer mudança de horário será avisada pelo aluno que irá ministrar a aula.*
            **Nos vemos lá!**`)
            .addFields(
                { name: `**Matéria:**`, value: settings.guildClasses[classId]['materia'], inline: true },
                { name: `**Data e Horário:**`, value: `Dia ${settings.guildClasses[classId]['data']} às ${settings.guildClasses[classId]['horario']}`, inline: true },
                { name: `**Assunto:**`, value: settings.guildClasses[classId]['assuntos'], inline: true },
            )
            .setFooter(`Aluno Ministrador: ${settings.guildClasses[classId]['aluno']}`); //,authorImage
            message.channel.send(publicationEmbed)
            .then(async sentMessage => {
                await sentMessage.react('🚀');
            })
        return message.delete()

        /* const wrongArgs = new Discord.MessageEmbed()
        .setDescription(`**O ID da aula informado não é um número. Por favor, revise os dados informados.**`)
        .setColor('ffff00');
        return message.channel.send(wrongArgs); */

    } else if (args[0] == 'remove' || args[0] == 'apagar' || args[0] == 'remover' || args[0] == 'deletar' || args[0] == 'delete') {
        const classId = args[1]
        const isNotANumber = isNaN(parseInt(classId))
        if (classId || !isNotANumber) {
            const confirmDelete = new Discord.MessageEmbed()
            .setTitle(`Deseja prosseguir com a remoção da aula com ID: ${args[1]}?`)
            .setDescription(`Verifique as informações abaixo e confirme através da reação:
            **Informações da Aula:**`)
            .addFields(
                { name: `**Matéria:**`, value: settings.guildClasses[classId]['materia'] },
                { name: `**Data:**`, value: settings.guildClasses[classId]['data'] },
                { name: `**Horário:**`, value: settings.guildClasses[classId]['horario'] },
                { name: `**Assunto:**`, value: settings.guildClasses[classId]['assuntos'] },
                { name: `**Aluno Ministrador:** `, value: settings.guildClasses[classId]['aluno'] },
            )
            .setFooter(`AVISO: Todas as questões da aula serão apagadas permanentemente ao excluir esta aula.`);
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
                    .setDescription(`**A remoção da aula foi cancelada.**\nPara tentar remover uma aula novamente utilize o comando: \`!aula remove [id da aula]\`.`);
                    return message.channel.send(remotionCancelled);
                }

                const collector = sentMessage.createReactionCollector(filter, { time: 15000 });

                let alreadyConfirmed = false;
                collector.on('collect', (reaction, user) => {
                    if (reaction.emoji.name === '✅') {
                        RemoveClass(classId);
                        sentMessage.delete();
                    } else {
                        CancelDeleteRequirement
                    }
                    alreadyConfirmed = true;
                });
                collector.on('end', collected => {
                    if (alreadyConfirmed == false) {
                        CancelDeleteRequirement();
                    }
                });
            })
        } else {
            const wrongArgs = new Discord.MessageEmbed()
            .setDescription(`**O ID da aula informado não é um número. Por favor, revise os dados informados.**`)
            .setColor('ffff00');
            return message.channel.send(wrongArgs);
        }
    } else {
        const confirmCreation = new Discord.MessageEmbed()
        .setTitle(`Deseja prosseguir com a criação da aula?`)
        .setDescription(`Verifique as informações abaixo e confirme através da reação:
        **Informações da Aula:**`)
        .addFields(
            { name: `**Matéria:**`, value: materia },
            { name: `**Data:**`, value: data },
            { name: `**Horário:**`, value: horario },
            { name: `**Assunto:**`, value: assuntos },
            { name: `**Aluno Ministrador:**`, value: aluno }
        );
        confirmCreation.setColor('#00ff00');
        message.channel.send(confirmCreation)
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
            
            function CancelCreationRequirement() {
                sentMessage.delete();
                message.delete();
                const creationCancelled = new Discord.MessageEmbed()
                .setDescription(`**A criação da aula foi cancelada.**\nPara tentar criar uma nova aula novamente utilize o comando: \`!aula [matéria] [data da aula] [horário da aula] [seu nome] [assunto(s) da aula]\`.`)
                .setColor('#FFFF00');
                return message.channel.send(creationCancelled);
            }

            const collector = sentMessage.createReactionCollector(filter, { time: 15000 });
            let alreadyConfirmed = false;
            collector.on('collect', (reaction, user) => {
                if (reaction.emoji.name === '✅') {
                    sentMessage.delete();
                    CreateClass();
                } else {
                    CancelCreationRequirement();
                }
                alreadyConfirmed = true
            });
            collector.on('end', collected => {
                if (alreadyConfirmed == false) {
                    CancelCreationRequirement();
                }
            });
        })
    }

    async function CreateClass() {
        try {
            await settings.updateOne(
                { $push: { guildClasses: { 
                    materia: materia,
                    data: data,
                    horario: horario,
                    aluno: aluno,
                    assuntos: assuntos,
                }}}
            )
            await settings.updateOne(
                { $push: { guildQuestions: [] }}
            )
        } catch (error) {
            console.error(error);
            message.channel.send(errorMessage);
            return message.delete();
        }

        const aulaCriada = new Discord.MessageEmbed()
        .setDescription(`**A aula foi criada e inserida no banco de dados do servidor com sucesso.**\nPara acessar a lista de aulas com suas respectivas informações digite: \`!aula lista\`.`)
        .setColor('#00FF00');
        message.channel.send(aulaCriada);
        message.delete();
        return;
    }

    async function RemoveClass(id) {
        try {
            await settings.updateOne(
                { $pull: { guildClasses: { materia: settings.guildClasses[id]['materia'], data: settings.guildClasses[id]['data'], assuntos: settings.guildClasses[id]['assuntos'] } }} 
            )
            // Agora removemos todas as questões
            //const question = settings.guildQuestions[classId][questionId]
            await settings.updateOne(
                { $unset: { ["guildQuestions." + classId]: 1 } }
            )
            await settings.updateOne(
                { $pull: { ["guildQuestions"]: null } }
            )
        } catch (error) {
            console.error(error)
        }
        const aulaRemovida = new Discord.MessageEmbed().setDescription(`**A aula foi deletada e removida do banco de dados do servidor com sucesso.**\nPara acessar a lista de aulas com suas respectivas informações digite: \`!aula lista\`.`);
        return message.channel.send(aulaRemovida);
    }

};

module.exports = {
    name: 'aula',
    description: `Comando relacionado a todas as funções do sistema de aulas. Para mais informações, consulte a página do comando \`!aula\` na documentação do botzinho: https://github.com/theduardomaciel/botzinho/wiki/Início.\n***Disponível somente para moderadores.***`,
	aliases: ['aulas'],
    cooldown: 5,
    guildOnly: true,
    execute,
};