const Discord = require('discord.js');

const inicioDasAulasMensagem = { 'materia': 'AS AULAS AINDA NÃO INICIARAM!', 'horario': 'somente 7:10', 'link': 'Vá separando seus livros e seu material pra quando o professor chegar! \nMas... enquanto o professor não chega, relaxe ao som de megalovania: https://www.youtube.com/watch?v=0TmoYBcLul8&t=104s...' };
const fimDasAulasMensagem = { 'materia': 'TODAS AS AULAS JÁ ACABARAM!', 'horario': 'pelo menos as de hoje', 'link': 'O dia letivo já acabou, e agora só nos resta completar as aulas e atividades no e-class: https://cpbedu.me/.\nAproveite seu resto de dia!' };

const diasLetivos = {
    'Domingo': '',
    'dia1': {
        'aula1': {
            'materia': 'História', 'horario': '7:10', 'link': 'Aguardando...' },
        'aula2': {
            'materia': 'Espanhol', 'horario': '8:00', 'link': 'Aguardando...' },
        'aula3': {
            'materia': 'Espanhol', 'horario': '8:50', 'link': 'Aguardando...' },
        'aula4': {
            'materia': 'Filosofia', 'horario': '9:35', 'link': 'Aguardando...' },
        'aula5': { 'materia': 'INTERVALO...', 'horario': '10:20', 'link': 'Relaxe...' },
        'aula6': {
            'materia': 'Sociologia', 'horario': '10:40', 'link': 'Aguardando...' },
        'aula7': {
            'materia': 'Química', 'horario': '11:30', 'link': 'Aguardando...' },
        'aula8': {
            'materia': 'Arte', 'horario': '12:15', 'link': 'Aguardando...' },
    },
    'dia2': {
        'aula1': {
            'materia': 'Redação', 'horario': '7:10', 'link': 'Aguardando...',
        },
        'aula2': {
            'materia': 'Literatura', 'horario': '8:00', 'link': 'Aguardando...',
        },
        'aula3': {
            'materia': 'Geografia', 'horario': '8:50', 'link': 'Aguardando...',
        },
        'aula4': {
            'materia': 'Português', 'horario': '9:35', 'link': 'Aguardando...',
        },
        'aula5': { 'materia': 'INTERVALO...', 'horario': '10:20', 'link': 'Relaxe...' },
        'aula6': {
            'materia': 'Geografia', 'horario': '10:40', 'link': 'Aguardando...',
        },
        'aula7': {
            'materia': 'Física', 'horario': '11:30', 'link': 'Aguardando...',
        },
        'aula8': {
            'materia': 'Capela', 'horario': '12:15', 'link': 'https://www.instagram.com/colegioadventistademaceio/',
        },
    },
    'dia3': {
        'aula1': {
            'materia': 'Religião', 'horario': '7:10', 'link': 'Aguardando...' },
        'aula2': {
            'materia': 'Física', 'horario': '8:00', 'link': 'Aguardando...' },
        'aula3': {
            'materia': 'Português', 'horario': '8:50', 'link': 'Aguardando...' },
        'aula4': {
            'materia': 'Redação', 'horario': '9:35', 'link': 'Aguardando...' },
        'aula5': { 'materia': 'INTERVALO...', 'horario': '10:20', 'link': 'Relaxe...' },
        'aula6': {
            'materia': 'Física', 'horario': '10:40', 'link': 'Aguardando...' },
        'aula7': {
            'materia': 'Literatura', 'horario': '11:30', 'link': 'Aguardando...' },
        'aula8': {
            'materia': 'Biologia', 'horario': '12:15', 'link': 'Aguardando...' },
    },
    'dia4': {
        'aula1': {
            'materia': 'História (Ari)', 'horario': '7:10', 'link': 'Aguardando...' },
        'aula2': {
            'materia': 'Matemática', 'horario': '8:00', 'link': 'Aguardando...' },
        'aula3': {
            'materia': 'Química', 'horario': '8:50', 'link': 'Aguardando...' },
        'aula4': {
            'materia': 'Português', 'horario': '9:35', 'link': 'Aguardando...' },
        'aula5': { 'materia': 'INTERVALO...', 'horario': '10:20', 'link': 'Relaxe...' },
        'aula6': {
            'materia': 'Matemática', 'horario': '10:40', 'link': 'Aguardando...' },
        'aula7': {
            'materia': 'Química', 'horario': '11:30', 'link': 'Aguardando...' },
        'aula8': {
            'materia': 'Inglês', 'horario': '12:15', 'link': 'Aguardando...' },
    },
    'dia5': {
        'aula1': {
            'materia': 'História', 'horario': '7:10', 'link': 'Aguardando...',
        },
        'aula2': {
            'materia': 'Matemática', 'horario': '8:00', 'link': 'Aguardando...',
        },
        'aula3': {
            'materia': 'Matemática', 'horario': '8:50', 'link': 'Aguardando...',
        },
        'aula4': {
            'materia': 'Biologia', 'horario': '9:35', 'link': 'Aguardando...',
        },
        'aula5': { 'materia': 'INTERVALO...', 'horario': '10:20', 'link': 'Relaxe...' },
        'aula6': {
            'materia': 'Geografia', 'horario': '10:40', 'link': 'Aguardando...',
        },
        'aula7': {
            'materia': 'Biologia', 'horario': '11:30', 'link': 'Aguardando...',
        },
        'aula8': {
            'materia': 'Inglês', 'horario': '12:15', 'link': 'Aguardando...',
        },
        'aula9': {
            'materia': 'Educação Física', 'horario': '13:00', 'link': 'No e-class...',
        },
    },
    'Sábado': '',
};

// const status = ['Esperando...', 'Em progresso...', 'TERMINADO', 'LINK QUEBRADO.'];

// Horários
const time = new Date();

const ano = time.getFullYear();
const mes = time.getMonth();
const diaMes = time.getDate();

const dia = time.getDay();

// Cada aula possui um adiantamento de 5 minutos;
// 7:10, 8:00, 9:35, 10:20, 10:40, 11:30, 12:15, 13:00
// E possui um adimantamento de 3 horas, para compensar o horário UTC (3 horas a mais que o brasileiro)

const adiantamento = 5;
let offset = 0;
const offsetEmHoras = time.getTimezoneOffset() / 60; // Caso o cliente seja local

const aula1Time = new Date(ano, mes, diaMes, 7 + offset, 10 - adiantamento);
const aula2Time = new Date(ano, mes, diaMes, 7 + offset, 60 - adiantamento);
const aula3Time = new Date(ano, mes, diaMes, 8 + offset, 50 - adiantamento);
const aula4Time = new Date(ano, mes, diaMes, 9 + offset, 35 - adiantamento);
const aula5Time = new Date(ano, mes, diaMes, 10 + offset, 20);
const aula6Time = new Date(ano, mes, diaMes, 10 + offset, 40 - adiantamento);
const aula7Time = new Date(ano, mes, diaMes, 11 + offset, 30 - adiantamento);
const aula8Time = new Date(ano, mes, diaMes, 12 + offset, 15 - adiantamento);
const fimDasAulas = new Date(ano, mes, diaMes, 13 + offset, 0);

// Dias
const dias = ['Domingo', 'Segunda', 'Terça', 'Quarta', 'Quinta', 'Sexta', 'Sábado'];
const diaNome = dias[time.getDay()];

const aulaDia = diasLetivos['dia' + time.getDay()];

// Verificando se há aula e qual a aula atual;

let aula = 0;
let aulaAtual = undefined;
let proximaAula = undefined;

let proximaAulaEmbed = undefined;
console.log(hasClass());
if (hasClass()) {
    aulaAtual = inicioDasAulasMensagem;
    proximaAula = aulaDia['aula1'];

    // Embed: Próxima Aula
    proximaAulaEmbed = new Discord.MessageEmbed()
    .setColor('#0099ff')
    .setTitle(`${aulaAtual['materia']}`)
    .setAuthor('PRÓXIMA AULA • EAD')
    .setDescription(aulaAtual['link']);
}

let aulasEAD = undefined;
let aulaCheck = undefined;

let diaLenght = undefined;

if (aulaDia) {
    diaLenght =  Object.keys(aulaDia).length;;
}

function checkClass()
{
    const horarios = [aula1Time, aula2Time, aula3Time, aula4Time, aula5Time, aula6Time, aula7Time, aula8Time, fimDasAulas];

    if (textChannel) {

        const now = new Date();

        for (let i = 0; i <= diaLenght; i++) {
            if (now > horarios[i])
            {
                aula = i + 1;
            }
        }

        if (aula < diaLenght) {
            aulaAtual = inicioDasAulasMensagem;
        } else if (aula > diaLenght) {
            aulaAtual = fimDasAulasMensagem;
        } else {
            aulaAtual = aulaDia['aula' + [aula]];
        }

        if (aula <= diaLenght) {
            proximaAula = aulaDia['aula' + [aula + 1]];
        } else {
            proximaAula = {'materia': 'Tchau e benção! O dia letivo terá acabado.', 'horario': '13:00', 'link': 'Aguardando...' };
        }

        if (aulaAtual !== aulaCheck) {

            if (aula < 1) {
                proximaAulaEmbed.setTitle(`${inicioDasAulasMensagem['materia']} (${inicioDasAulasMensagem['horario']})`);
                proximaAulaEmbed.setDescription(`${inicioDasAulasMensagem['link']} • <@&729017153897889812>`);
            } else if (aula >= diaLenght + 1) {
                proximaAulaEmbed.setTitle(`${fimDasAulasMensagem['materia']} (${fimDasAulasMensagem['horario']})`);
                proximaAulaEmbed.setDescription(`${fimDasAulasMensagem['link']} • <@&729017153897889812>`);
            } else {
                proximaAulaEmbed.setTitle(`${aulaDia['aula' + aula]['materia']} (${aulaDia['aula' + aula]['horario']})`);
                proximaAulaEmbed.setDescription(`${aulaDia['aula' + aula]['link']} • <@&729017153897889812>`);
            }

            console.log('Nova aula iniciando, enviado mensagem ao servidor com o link.');
            console.log(aula);
            textChannel.send({ embed: proximaAulaEmbed });
        }

        aulaCheck = aulaAtual;
        
    }
}
if (hasClass()) {
    console.log('Hoje há aula... iniciando verificações de novas aulas...');
    setInterval(checkClass, 60000);
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

let textChannel = undefined;

module.exports = {
    name: 'ead',
    cooldown: 2.5,
    aliases: ['aulas', 'aula'],
	description: 'Comando responsável por informar: matérias do dia, horário das aulas, status das aulas, aula atual, link das aulas online entre outras funções...',
	execute(client, message, args, ops) {
        textChannel = message.channel;

        let aulaAtualEmbed = undefined;
        if (hasClass()) {
            aulasEAD = new Discord.MessageEmbed()
            .setColor(0x0099ff)
            .setTitle(`AULAS DE HOJE: (${diaNome})`)
            .setURL('https://cpbedu.me/')
            .setAuthor('Colégio Adventista de Maceió', 'https://www.educacaoadventista.org.br/wp-content/uploads/2019/11/logo-ea.png', 'https://twitter.com/theduardomaciel')
            .setDescription('Aqui estão as aulas do dia, com seus determinados links:')
            .setThumbnail('https://www.educacaoadventista.org.br/wp-content/uploads/2019/11/logo-ea.png')
            .setTimestamp()
            .setFooter('Botzinho (by Edu)', 'https://images.emojiterra.com/twitter/512px/1f44c.png');

            for (let i = 1; i < diaLenght + 1; i++) {
                aulasEAD.addField(`${aulaDia['aula' + i]['materia']}  (${aulaDia['aula' + i]['horario']})`, aulaDia['aula' + i]['link'], true);
            }

            //
            aulaAtualEmbed = new Discord.MessageEmbed()
            .setColor(0x0099ff)
            .setTitle('AULA ATUAL:')
            .setDescription(`**${aulaAtual['materia']}**\n${aulaAtual['link']}`)
            .setURL('https://cpbedu.me/')
            .setThumbnail('https://www.educacaoadventista.org.br/wp-content/uploads/2019/11/logo-ea.png')
            .setFooter('Próxima Aula: ' + `${proximaAula['materia']}`);

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
                message.channel.send({ embed: aulasEAD });
                message.delete();
            } else if (args[0] === 'atual') {
                message.channel.send({ embed: aulaAtualEmbed });
                message.delete();
            } else if (args[0] === 'offset') {
                offset = args[1];
                message.channel.send('Offset de horário atualizado para: ' + args[1] + ', mesmo que o comando ainda não funcione...');

                // COMEÇANDO INSERÇÃO DE LINKS
            } else if (args[0] === 'set' && message.member.roles.cache.has('728794307099885660')) {
                aulaDia['aula' + args[1]]['link'] = args[2];
                message.channel.send(`Link da aula: ${args[1]} foi setado para ${args[2]}`);
                message.delete();
            } else if (args[0] === 'all') {
                if (args.length > diaLenght + 1) return message.reply(`me foi dado mais argumentos do que preciso (${args.length - 1} de ${diaLenght})!`);
                for (let i = 1; i < args.length; i++) {
                    console.log(args.length);
                    if (i < 5) {
                        aulaDia['aula' + i]['link'] = args[i];
                        console.log('Aula ' + i + ': ' + aulaDia['aula' + i]['link']);
                    } else if (i > 5) {
                        const value = i - 1;
                        aulaDia['aula' + i]['link'] = args[value];
                        console.log('Aula ' + i + ': ' + aulaDia['aula' + i]['link']);
                    }
                }
            }
        } else {
            message.channel.send({ embed: finalDeSemana });
        }

    },
};