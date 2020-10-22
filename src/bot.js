require('dotenv').config();
const Discord = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Discord.Client();

client.on("ready", () => {
  console.log("Successfully logged in Discord bot.");
})

client.queues = new Map();

(async () => {
    client.commands = new Discord.Collection();
    await registerCommands(client, '../commands');
    await registerEvents(client, '../events');
    await client.login(process.env.TOKEN);
})();