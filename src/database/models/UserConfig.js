const mongoose = require('mongoose');

const guildSchema = new mongoose.Schema({
    _id: mongoose.Types.ObjectId,
    userId: mongoose.SchemaTypes.String,
    userName: mongoose.SchemaTypes.String,
    playlistLenght: mongoose.SchemaTypes.Number,
    playlist: mongoose.SchemaTypes.Array,
})

module.exports = mongoose.model('User', guildSchema, 'users')