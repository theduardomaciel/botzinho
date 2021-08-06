const mongoose = require('mongoose');
const Guild = require('../../database/models/GuildConfig');

const Discord = require('discord.js');
const collectorUtil = require('..//..//utils/musicCollector');

module.exports = async (client, reaction, user) => {
    
    //console.log("UMA REAÇÃO FOI ADICIONADA");

    if (user.bot) return;

    const message = reaction.message;

    // Checando se a mensagem é parcial ou não
	if (reaction.partial) {
		// Se a mensagem da reação não existir mais, haverá um erro de API que precisamos segurar
		try {
			await reaction.fetch();
		} catch (error) {
			console.error('Something went wrong when fetching the message: (não tentei traduzir fetch) ', error);
			// Returnar como se o `reaction.message.author` fosse undefined/null
			return;
		}
	}
    
    const reactionsArray = [ '🔷', '⏯️', '⏹', '⏭', '🔁', '🔀', '⭐', '✖️' ];
    const commandsCheck = {
        '🔷': '',
        '⏯️': client.commands.get('pause'),
        '⏹': client.commands.get('stop'),
        '⏭': client.commands.get('skip'),
        '🔁': client.commands.get('loop'),
        '🔀': client.commands.get('shuffle'),
        '⭐': client.commands.get('favorite'),
        '❌': client.commands.get('desfavorite'),
    }

    // Verificando caso a reação seja uma das reações do sistema de música
    for (let i = 0; i < reactionsArray.length; i++) {
        if (reaction.emoji.name === reactionsArray[i]) {
            if (reaction.emoji.name === '🔷') {
                collectorUtil.execute(client, reaction.message, user, reaction, true);
                console.log('O modo de coleta de músicas foi ativado.')
            } else if (reaction.emoji.name === '⏯️') {
                const queue = client.queues.get(message.guild.id);
                if (!queue) {
                    collectorUtil.execute(client, reaction.message, user, reaction);
                } else {
                    commandsCheck[reaction.emoji.name].execute(client, reaction.message, {}, user)
                }
            } else {
                try {
                    await reaction.users.remove(user);
                    console.log(`A reação de ${user.username} foi removida!`);
                } catch (error) {
                    console.error(error);
                }
                commandsCheck[reaction.emoji.name].execute(client, reaction.message, {}, user)
            }
        }
    }

}