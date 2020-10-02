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
        'EAD! Também conhecido como: Estresse-A-Distância.',
        '🐞REPORTE! Muitos dos comandos que deveriam funcionar podem estar quebrados!',
    ],

    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ %
        activities.length]}`, {
        type: 'PLAYING' }), 60000);
    // WATCHING, LISTENING, PLAYING, STREAMING

}