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
        'TÁ ACABANDO! Finalmente o EAD nos deixará livres! (pelo menos é o que nós esperamos)',
        'O QUE SÃO ESSAS MENSAGENS?',
        'QUAL PORQUÊ DEVERIA SER USADO AQUI MESMO?',
        '👀 VOCÊ NÃO VIU NADA...',
        '🐞REPORTE! Muitos dos comandos que deveriam funcionar podem estar quebrados!',
    ],

    i = 0;
    setInterval(() => client.user.setActivity(`${activities[i++ %
        activities.length]}`, {
        type: 'PLAYING' }), 60000);
    // WATCHING, LISTENING, PLAYING, STREAMING

}