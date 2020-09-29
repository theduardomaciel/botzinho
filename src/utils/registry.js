const { eventNames } = require('cluster');
const fs = require('fs');
const path = require('path');

function registerCommands(client, dir) {
    //Ler o diretório/arquivo
    const filePath = path.join(__dirname, dir);
    let files = fs.readdirSync(filePath);
    // Loopar através de cada arquivo
    for (let file of files) {
        let stat = fs.lstatSync(path.join(filePath, file));
        if (stat.isDirectory()) {
            registerCommands(client, path.join(dir, file))
        } else {
            // Checar se o arquivo é um .js
            if (file.endsWith('.js')) {
                try {
                    const command = require(path.join(filePath, file));
                    // Pegar cada arquivo de comando e inserir no map: commands do cliente do bot
                    client.commands.set(command.name, command);   
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

async function registerEvents(client, dir) {
    client.removeAllListeners();
    //Ler o diretório/arquivo
    const filePath = path.join(__dirname, dir);
    let files = fs.readdirSync(filePath);
    // Loopar através de cada arquivo
    for (let file of files) {
        let stat = fs.lstatSync(path.join(filePath, file));
        if (stat.isDirectory()) {
            registerEvents(client, path.join(dir, file))
        } else {
            // Checar se o arquivo é um .js
            if (file.endsWith('.js')) {
                let eventName = file.substring(0, file.indexOf(".js"));
                try {
                    let eventModule = require(path.join(__dirname, dir, file));
                    client.on(eventName, eventModule.bind(null, client));
                    console.log(`Evento carregado: ${eventName}`);
                } catch (error) {
                    console.log(error);
                }
            }
        }
    }
}

module.exports = { 
    registerEvents,
    registerCommands,
};