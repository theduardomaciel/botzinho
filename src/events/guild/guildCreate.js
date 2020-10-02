const mongoose = require('mongoose')
const Guild = require('../../database/models/GuildConfig')

module.exports = async (client, guild) => {
    guild = new Guild({
        _id: mongoose.Types.ObjectId(),
        guildId: guild.id,
        prefix: process.env.PREFIX,
        defaultRole: undefined,
        eadChannel: undefined,
    });
    guild.save()
    .then(result => console.log(result))
    .catch(error => console.error(error));

    console.log(`Eu fui adicionado ao servidor: ${guild.name}!`)
}