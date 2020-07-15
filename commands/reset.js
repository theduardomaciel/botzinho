const dotenv = require('dotenv');
dotenv.config();

const token = process.env.TOKEN;

const execute = (client, message) => {
    // Turn bot off (destroy), then turn it back on
        // send channel a message that you're resetting bot [optional]
    message.channel.send('Resetando...')
    .then(msg => client.destroy())
    .then(() => client.login(token));
};

module.exports = {
    name: 'reset',
    description: 'Disponível somente para moderadores',
    cooldown: 1,
    execute,
};