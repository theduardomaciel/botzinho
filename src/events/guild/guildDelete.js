const mongoose = require('mongoose')
const Guild = require('..//..//database/models/GuildConfig')

module.exports = async (client, guild) => {
    Guild.findOneAndDelete({
        guildID: guild.id
    }, (err, res) => {
        if (err) console.error(err)
        console.log(`Eu fui removido do servidor: ${guild.name}!`)
    })
}