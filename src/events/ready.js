const message = require('./message/message');

module.exports = async (client) => {

    const mongo = require('../database/mongoose');

    await mongo().then(mongoose => {
        try {
            console.log('Conectado ao Banco de Dados (DB) com sucesso!');
        } catch(error) {
            console.error(error)
        }
    })

    console.log('O bot foi iniciado');

    let i = 0;
    let activities = undefined;
    
    activities = [
        'ENSINO HÍBRIDO... Parece que o EAD não sai de nós de forma alguma.',
        '🐞REPORTE! Muitos dos comandos que deveriam funcionar podem estar quebrados!',
        'é isso ae',
    ],

    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ %
        activities.length]}`, {
        type: 'PLAYING' }), 60000);
    // WATCHING, LISTENING, PLAYING, STREAMING

}