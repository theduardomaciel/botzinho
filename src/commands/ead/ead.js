const mongoose = require('mongoose')
const Guild = require('../../database/models/GuildConfig');

const Discord = require('discord.js');
const diasLetivosArray = require('./diasLetivos.json')


const inicioDasAulasMensagem = { 'materia': 'AS AULAS AINDA NÃO INICIARAM!', 'horario': 'somente 7:10', 'link': 'Vá separando seus livros e seu material pra quando o professor chegar! \nMas... enquanto o professor não chega, relaxe ao som de megalovania: https://www.youtube.com/watch?v=0TmoYBcLul8&t=104s...' };
const fimDasAulasMensagem = { 'materia': 'TODAS AS AULAS JÁ ACABARAM!', 'horario': 'pelo menos as de hoje', 'link': 'O dia letivo já acabou, e agora só nos resta completar as aulas e atividades no e-class: https://cpbedu.me/.\nAproveite seu resto de dia!' };

// Horários
const time = new Date();

const ano = time.getFullYear();
const mes = time.getMonth();
const diaMes = time.getDate();
const dia = time.getDay();

// Cada aula possui um adiantamento de 5 minutos;
// 7:10, 8:00, 9:35, 10:20, 10:40, 11:30, 12:15, 13:00
// O adiantamento padrão é de 3 horas, para compensar o horário UTC (3 horas a mais que o brasileiro)

const adiantamento = 5;
let offset = 3;
let horarios;

let aula1Time;
let aula2Time;
let aula3Time;
let aula4Time;
let aula5Time;
let aula6Time;
let aula7Time;
let aula8Time;

function updateTime() {
    aula1Time = new Date(ano, mes, diaMes, 7 + offset, 10 - adiantamento);
    aula2Time = new Date(ano, mes, diaMes, 7 + offset, 60 - adiantamento);
    aula3Time = new Date(ano, mes, diaMes, 8 + offset, 50 - adiantamento);
    aula4Time = new Date(ano, mes, diaMes, 9 + offset, 35 - adiantamento);
    aula5Time = new Date(ano, mes, diaMes, 10 + offset, 20);
    aula6Time = new Date(ano, mes, diaMes, 10 + offset, 40 - adiantamento);
    aula7Time = new Date(ano, mes, diaMes, 11 + offset, 30 - adiantamento);
    aula8Time = new Date(ano, mes, diaMes, 12 + offset, 15 - adiantamento);
    fimDasAulas = new Date(ano, mes, diaMes, 13 + offset, 0);
}

updateTime();

// Dias
const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const diaNome = dias[time.getDay()];

const aulaDia = diasLetivosArray['dia' + time.getDay()];

// aulaDia.unshift(inicioDasAulasMensagem);
// aulaDia.push(fimDasAulasMensagem);

// Verificando se há aula e qual a aula atual;

let aula = 0;
let aulaAtual;
let proximaAula;
let aulaAnterior;

let proximaAulaEmbed = new Discord.MessageEmbed()
proximaAulaEmbed.setAuthor('PRÓXIMA AULA • EAD')
proximaAulaEmbed.setColor()
proximaAulaEmbed.setColor('#0099ff')

if (hasClass()) {
    aulaAtual = inicioDasAulasMensagem;
    proximaAula = aulaDia['aula1'];
    proximaAulaEmbed.setTitle(`${aulaAtual['materia']}`)
    proximaAulaEmbed.setDescription(`aulaAtual['link'] • @everyone`);
}

let aulaCheck;

let diaLenght;

if (aulaDia) {
    diaLenght = Object.keys(aulaDia).length;
}

let ready = false;
let textChannel;
let role;

async function UpdateDependencies(message) {
    const settings = await Guild.findOne({
        guildId: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
            
            const createGuild = require('..//database/CreateGuild')
            createGuild(mongoose.Types.ObjectId(), message.guild.id, message.guild.name, process.env.PREFIX)
    
            return message.channel.send(new Discord.MessageEmbed().setDescription('Este servidor não estava em meu banco de dados, ou algumas informações estavam desatualizadas. Já configurei tudo para você, então você agora estará apto a usar os comandos do bot!'));
        }
    })
    
    const serverChannelId = await settings.eadChannel;
    const serverDefaultRole = await settings.defaultRole;

    const channel = message.client.channels.cache.get(serverChannelId);
    const getRole = message.guild.roles.cache.find(role => role.id === serverDefaultRole);

    textChannel = await channel;
    role = await getRole
}

async function SendClass(isUpdating) {

    if (aula < 1) {
        aulaAtual = inicioDasAulasMensagem;
    } else if (aula > diaLenght) {
        aulaAtual = fimDasAulasMensagem;
    } else {
        aulaAtual = aulaDia['aula' + [aula]];
        aulaAnterior = aulaDia['aula' + [aula - 1]]
    }

    if (aula <= diaLenght) {
        proximaAula = aulaDia['aula' + [aula + 1]];
    } else {
        proximaAula = {'materia': 'Tchau e benção! O dia letivo terá acabado.', 'horario': '13:00', 'link': 'Aguardando...' };
    }

    if (aulaAtual !== aulaCheck) {

        if (aula < 1) {
            proximaAulaEmbed.setTitle(`${inicioDasAulasMensagem['materia']} (${inicioDasAulasMensagem['horario']})`);
            proximaAulaEmbed.setDescription(`${inicioDasAulasMensagem['link']}`);
        } else if (aula >= diaLenght + 1) {
            proximaAulaEmbed.setTitle(`${fimDasAulasMensagem['materia']} (${fimDasAulasMensagem['horario']})`);
            proximaAulaEmbed.setDescription(`${fimDasAulasMensagem['link']}`);
        } else if (aula > 1 && aulaAtual['link'] !== 'Aguardando...' && aulaDia['aula' + [aula + 1]]['link'] === aulaAtual['link']) {

            proximaAulaEmbed.setTitle(`${aulaAtual['materia']} (${aulaAtual['horario']}-${aulaDia['aula' + [aula + 1]]['horario']})`);
            proximaAulaEmbed.setDescription(`${aulaAtual['link']} • ${role}`);
        } else {
            proximaAulaEmbed.setTitle(`${aulaAtual['materia']} (${aulaAtual['horario']}`);
            proximaAulaEmbed.setDescription(`${aulaAtual['link']} • ${role}`);
        }

        console.log(`Nova aula de ${aulaAtual['materia']} (${aula}) iniciando, enviado mensagem ao servidor com o link.`);

       if (aula > 1) {
            if (aulaAtual['link'] === aulaAnterior['link']) return;
       }

        if (aulaAtual['link'] === 'Aguardando...') {
            const allLinksEmbed = new Discord.MessageEmbed().setDescription(`Desculpe, mas o link da aula atual não foi inserido por nenhum moderador.\nPor favor, entre no site https://cpbedu.me/e-class para o link da aula atual.\nUm moderador deve inserir os links corretamente em breve.`)
            return textChannel.send(allLinksEmbed);
        }

        textChannel.send(proximaAulaEmbed).then(eadMessage => {
            
            if (parseInt(aula) === 0 || parseInt(aula) === 5 || parseInt(aula) === diaLenght + 1) return;

            eadMessage.react("🔄")

            const waitingFilter = (reaction, user) => {
                return reaction.emoji.name === '🔄' && reaction.users
            };

            const beginFilter = (reaction) => {
                return reaction.emoji.name === '✅' && reaction.users
            };
            const endFilter = (reaction) => {
                return reaction.emoji.name === '❌' && reaction.users
            };
            
            const waitingCollector = new Discord.ReactionCollector(eadMessage, waitingFilter);
            const beginCollector = new Discord.ReactionCollector(eadMessage, beginFilter);
            const endCollector = new Discord.ReactionCollector(eadMessage, endFilter);

            waitingCollector.on('collect', (reaction, user) => {
                if (!user.bot) {
                    eadMessage.reactions.removeAll().catch(error => console.error('Falha ao remover as reações:', error));
                    eadMessage.react('✅');
                }
            })
            beginCollector.on('collect', (reaction, user) => {
                if (!user.bot) {
                    eadMessage.reactions.removeAll().catch(error => console.error('Falha ao remover as reações:', error));
                    eadMessage.react('❌');
                }
            })
            endCollector.on('collect', (reaction, user) => {
                if (!user.bot) {
                    eadMessage.reactions.removeAll().catch(error => console.error('Falha ao remover as reações:', error));
                    eadMessage.react('✅');
                }
            })
        })

    }

    if (isUpdating) {
        console.log(`Atualizando offset para ${offset} hora(s), aula atual: ${aula}`);
    }
    
    aulaCheck = aulaAtual;
    
}

function CheckClass(isUpdating)
{
    if (textChannel && ready === true) {
        horarios = [aula1Time, aula2Time, aula3Time, aula4Time, aula5Time, aula6Time, aula7Time, aula8Time, fimDasAulas];
        const now = new Date();
        for (let i = 0; i <= diaLenght; i++) {
            if (now > horarios[i])
            {
                aula = i + 1;
            }
        }
        if (aulaAtual['link'] === 'Aguardando...') return;
        SendClass();
    }
}

if (hasClass()) {
    console.log('Hoje há aula... iniciando verificações de novas aulas...');
    setInterval(CheckClass, 60000);
} else {
    console.log('Hoje não há aula... encerrando verificações de novas aulas...');
}

function hasClass()
{
    if (dia === 0 || dia === 6) {
        return false;
    } else {
        return true;
    }
}

// Comandos Handler

let aulasEAD;

async function execute(client, message, args, isModerator) {

    await UpdateDependencies(message);

    if (!role) {
        console.log(role);
        return message.channel.send(new Discord.MessageEmbed().setDescription(`Não é possível enviar mensagens, pois o servidor não possui cargo padrão.
        Para configurar isso, por favor utilize o comando: \`!role default [nome do cargo]\``));
    }

    if (!textChannel) {
        return message.channel.send(new Discord.MessageEmbed().setDescription(`Não é possível enviar mensagens, pois o servidor não possui canal de EAD padrão.
        Para configurar isso, por favor utilize o comando: \`!ead-channel [id do canal]\``));
    }

    // client.channels.cache.get('727537392415932488');
    let aulaAtualEmbed = undefined;
    if (hasClass()) {
        aulasEAD = new Discord.MessageEmbed()
        .setColor(0x0099ff)
        .setTitle(`AULAS DE HOJE: (${diaNome})`)
        .setURL('https://cpbedu.me/')
        .setAuthor('Colégio Adventista de Maceió', 'https://www.educacaoadventista.org.br/wp-content/uploads/2019/11/logo-ea.png', 'https://twitter.com/theduardomaciel')
        .setDescription('Aqui estão as aulas do dia, com seus determinados links:')
        .setThumbnail('https://www.educacaoadventista.org.br/wp-content/uploads/2019/11/logo-ea.png')

        for (let i = 1; i < diaLenght + 1; i++) {
            let aulaAtual = aulaDia['aula' + i];
            if (i < diaLenght && aulaAtual['link'] !== 'Aguardando...' && aulaDia['aula' + [i + 1]]['link'] === aulaAtual['link']) {
                aulasEAD.addField(`${aulaAtual['materia']} e ${aulaDia['aula' + [i + 1]]['materia']}  (${aulaAtual['horario']}-${aulaDia['aula' + [i + 2]]['horario']})`, aulaAtual['link'], true);
                i += 1
            } else {
                aulasEAD.addField(`${aulaAtual['materia']}  (${aulaAtual['horario']})`, aulaAtual['link'], true);
            }
        }

        //
        aulaAtualEmbed = new Discord.MessageEmbed()
        .setColor(0x0099ff)
        .setTitle('AULA ATUAL:')
        .setURL('https://cpbedu.me/')
        .setThumbnail('https://www.educacaoadventista.org.br/wp-content/uploads/2019/11/logo-ea.png')
        if (proximaAula) {
            aulaAtualEmbed.setFooter('Próxima Aula: ' + `${proximaAula['materia']}`);
        }
        if (aulaAtual) {
            aulaAtualEmbed.setDescription(`**${aulaAtual['materia']}**\n${aulaAtual['link']}`)
        }

    }

    const finalDeSemana = new Discord.MessageEmbed()
    .setColor(0x0099ff)
    .setTitle('RELAXE!')
    .setDescription('**Aproveite seu fim de semana para relaxar e descansar desta semana de estudos!**')
    .setURL('https://www.youtube.com/watch?v=0TmoYBcLul8')
    .setFooter('Próxima aula somente SEGUNDA.');

    // EAD Commands
    if (hasClass()) {
        if (!args.length) {
            if (!ready && !isModerator) return message.channel.send(`**As aulas de hoje ainda não foram atualizadas por nenhum moderador, por favor, volte mais tarde.**`)
            message.channel.send(aulasEAD);
            message.delete();
        } else if (args[0] === 'atual') {
            if (!ready) return message.channel.send(`**As aulas de hoje ainda não foram atualizadas por nenhum moderador, por favor, volte mais tarde.**`)
            message.channel.send({ embed: aulaAtualEmbed });
            message.delete();
        } else if (args[0] === 'offset' && isModerator) {
            message.channel.send(`Offset de horário atualizado para: \`${args[1]}\`.`);
            offset = parseInt(args[1]);
            updateTime();
            CheckClass(true);
            
        } else if (args[0] === 'true' && isModerator) {
            ready = true
            message.reply(`o status do EAD foi atualizado para:  \`${ready}\`. Agora as notificações de novas aulas passarão a ser enviadas ao servidor.`);
            message.delete()
        } else if (args[0] === 'false' && isModerator) {
            ready = false
            message.reply(`o status do EAD foi atualizado para:  \`${ready}\`. Agora as notificações de novas aulas não serão mais enviadas ao servidor.`);
            message.delete()
            // COMEÇANDO INSERÇÃO DE LINKS
        } else if (args[0] === 'set' && isModerator) {
            aulaDia['aula' + args[1]]['link'] = args[2];
            message.channel.send(new Discord.MessageEmbed().setDescription(`O link da aula: ${aulaDia['aula' + args[2]]['materia']} foi setado para \`${args[2]}\``));
            message.delete();
        } else if (args[0] === 'list' && isModerator) {
            const listEmbed = new Discord.MessageEmbed()
            listEmbed.setTitle('AULAS DE HOJE:')
            for (let i = 1; i < diaLenght + 1; i++) {
                let aulaAtual = aulaDia['aula' + i];
                listEmbed.addField(aulaAtual['materia'], aulaAtual['horario']);
            }
            textChannel.send(listEmbed);
            message.delete();
        } else if (args[0] === 'all' && isModerator) {
            console.log('Aulas no dia: ' + diaLenght);
            if (args.length > diaLenght) return  message.channel.send(new Discord.MessageEmbed().setDescription(`me foi dado mais argumentos do que preciso (${args.length - 1} de ${diaLenght})!`));
            for (let i = 1; i < args.length + 1; i++) {
                if (i < 5) {
                    aulaDia['aula' + i]['link'] = args[i];
                    console.log(`Aula ${i}: ${aulaDia['aula' + i]['link']}`);
                } else if (i > 5) {
                    const value = i - 1;
                    aulaDia['aula' + i]['link'] = args[value];
                    console.log(`Aula ${i}: ${aulaDia['aula' + i]['link']}`);
                }
            }
            const allLinksEmbed = new Discord.MessageEmbed().setDescription('Todos os links foram inseridos corretamente.')
            message.channel.send(allLinksEmbed)
        }
    } else {
        message.channel.send({ embed: finalDeSemana });
    }
}

module.exports = {
    name: 'ead',
    cooldown: 2.5,
    aliases: ['aulas', 'aula'],
    guildOnly: true,
	description: 'Comando responsável por informar: matérias do dia, horário das aulas, status das aulas, aula atual, link das aulas online entre outras funções...',
	execute,
};