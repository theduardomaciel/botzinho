const mongoose = require('mongoose');
const Guild = require('../../database/models/GuildConfig');

const Discord = require('discord.js');

const collectorUtil = require('..//..//utils/musicCollector');

module.exports = async (client, reaction, user) => {

    const commandsCheck = {
        '🔷': '',
        '⏯️': client.commands.get('resume'),
    }    

    if (user.bot) return;

    if (reaction.emoji.name === '🔷') {
    
        collectorUtil.execute(client, reaction.message, user, reaction, false);
        console.log('O modo de coleta de músicas foi desativado.')

    } else if (reaction.emoji.name === '⏯️') {
        commandsCheck['⏯️'].execute(client, reaction.message)
    }

}