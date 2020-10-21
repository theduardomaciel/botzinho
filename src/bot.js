require('dotenv').config();
const Discord = require('discord.js');
const { registerCommands, registerEvents } = require('./utils/registry');
const client = new Discord.Client();

const express = require('express');
let bodyParser = require('body-parser');
const app = express();

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

app.use(express.static('public'));

app.get('/', function(request, response) {
  if (request.headers.username != undefined) { 
      const channel = client.channels.get(request.headers.cid);
      if (request.headers.rblxerror == undefined) {
        channel.send('Successfully ' + request.headers.method + 'ned user ' + request.headers.username + " | ID: " + request.headers.value);
      } else {
        channel.send("Failed to " + request.headers.method + " user: " + request.headers.username + " | ID: " + request.headers.value + " | `Rblx-Error:  " + request.headers.rblxerror + "`"); 
      }
  }
  response.send(toBan[0]);
  toBan.shift();
});