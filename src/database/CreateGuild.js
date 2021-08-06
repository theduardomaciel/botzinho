const mongoose = require('mongoose');
const Guild = require('../database/models/GuildConfig');

module.exports = async (_id, guildId, guildName, prefix, defaultRole, eadChannel, musicChannel, musicMessage) => {

    try {
        const newGuild = new Guild({
            _id: _id,
            guildId: guildId,
            guildName: guildName,
            prefix: prefix,
            defaultRole: defaultRole,
            eadChannel: eadChannel,
            musicChannel: musicChannel,
            musicMessage: musicMessage,
            guildClasses: [],
            guildQuestions: [],
            actualClassInfo: {
                class: 0,
                question: 0,
            },
        })
        newGuild.save()
    } catch (error) {
        console.error(error);
    }

}