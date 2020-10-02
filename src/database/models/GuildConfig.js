const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    guildId: mongoose.SchemaTypes.String,
    guildName: mongoose.SchemaTypes.String,
    prefix: mongoose.SchemaTypes.String,
    defaultRole: mongoose.SchemaTypes.String,
    eadChannel: mongoose.SchemaTypes.String,
    musicChannel: mongoose.SchemaTypes.String
})

module.exports = mongoose.model('Guild', guildSchema, 'guilds')