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
            'materia': 'Educação Física', 'horario': '13:00', 'link': 'Aguardando...',
        },
    },
    'Sábado': '',
};

// const status = ['Esperando...', 'Em progresso...', 'TERMINADO', 'LINK QUEBRADO.'];

function isModerator(member) {
    if (member.roles.cache.has('728794307099885660')) {
        return true;
    } else {
        return false;
    }
}

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

let ready = false;

function checkClass(isUpdating)
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

        if (isUpdating) {
            console.log('Atualizando offset, aula atual:');
            console.log(aula);
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
	execute(client, message, args, eadChannel) {
        textChannel = message.channel;
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
            .setTimestamp()
            .setFooter('Botzinho (by Edu)', 'https://images.emojiterra.com/twitter/512px/1f44c.png');

            for (let i = 1; i < diaLenght + 1; i++) {
                aulasEAD.addField(`${aulaDia['aula' + i]['materia']}  (${aulaDia['aula' + i]['horario']})`, aulaDia['aula' + i]['link'], true);
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
            } else {
                aulaAtualEmbed.setDescription(`As aulas ainda não começaram...`);
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
                if (!ready && !isModerator(message.member)) return message.channel.send(`**As aulas de hoje ainda não foram atualizadas por nenhum moderador, por favor, volte mais tarde.**`)
                message.channel.send({ embed: aulasEAD });
                message.delete();
            } else if (args[0] === 'atual') {
                if (!ready) return message.channel.send(`**As aulas de hoje ainda não foram atualizadas por nenhum moderador, por favor, volte mais tarde.**`)
                message.channel.send({ embed: aulaAtualEmbed });
                message.delete();
            } else if (args[0] === 'offset' && isModerator(message.member)) {
                message.channel.send(`Offset de horário atualizado para: \`${args[1]}\`.`);
                offset = parseInt(args[1]);
                updateTime();
                checkClass(true);
                
            } else if (args[0] === 'true' && isModerator(message.member)) {
                ready = true
                message.reply(`o status do EAD foi atualizado para:  \`${ready}\``);
                message.delete();
                return;
            } else if (args[0] === 'false' && isModerator(message.member)) {
                ready = false
                message.reply(`o status do EAD foi atualizado para:  \`${ready}\``);
                message.delete();
                return;

                // COMEÇANDO INSERÇÃO DE LINKS
            } else if (args[0] === 'set' && isModerator(message.member)) {
                aulaDia['aula' + args[1]]['link'] = args[2];
                message.channel.send(`Link da aula: ${args[1]} foi setado para ${args[2]}`);
                message.delete();
            } else if (args[0] === 'all' && isModerator(message.member)) {
                console.log('Aulas no dia: ' + diaLenght);
                if (args.length > diaLenght + 1) return message.reply(`me foi dado mais argumentos do que preciso (${args.length - 1} de ${diaLenght})!`);
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
            }
        } else {
            message.channel.send({ embed: finalDeSemana });
        }

    },
};