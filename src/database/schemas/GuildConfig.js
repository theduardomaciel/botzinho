const moongose = require('mongoose');

const GuildConfigSchema = new moongose.Schema( {
    guildId: {
        type: moongose.SchemaTypes.String,
        required: true,
        unique: true,
    },
    prefix: {
        type: moongose.SchemaTypes.String,
        required: true,
        default: '!',
    },
    defaultRole: {
        type: moongose.SchemaTypes.String,
        required: false,
    },
    memberLogChannel: {
        type: moongose.SchemaTypes.String,
        required: false,
    },
});

module.exports = moongose.model('GuildConfig', GuildConfigSchema);