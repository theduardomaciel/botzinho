const { MessageEmbed } = require('discord.js')

const https = require('https');
const express = require('express');
let bodyParser = require('body-parser');
const app = express();

let rolename = "Roblox Admin"
let toBan = [];

let client;

function byUID(method, args, message) {
  client = message.client;
  https.get("https://api.roblox.com/users/" + args[2], (res) => {
      
    let data = '';
    res.on('data', d => {
        data += d
    })
    res.on('end', () => {
        if (res.statusCode == 200) {
            toBan.push({method: method,username: JSON.parse(data).Username,value: args[2],cid: message.channel.id});
            message.channel.send(new MessageEmbed().setDescription(`As ações de \`${method}\` para ${args[2]} foram tomadas com sucesso.`).setColor('#FFFF00'));
        } else {
          message.channel.send(method + " failed: Invalid userId " + args[2]);
        }
      });
  }).on('error', error => {
    console.error("RBLX API (UID) | " + error);
  });
}

function byUser(method, args, message) {
  client = message.client;
  const options = {
    hostname: 'api.roblox.com',
    port: 443,
    path: '/users/get-by-username?username=' + args[2],
    method: 'GET'
  }
  https.get("https://api.roblox.com/users/get-by-username?username=" + args[2], (res) => {
      let data = '';
      res.on('data', d => {
        data += d
      })
      res.on('end', () => {
        if (JSON.parse(data).Id != undefined) {
          toBan.push({method: method,value: JSON.parse(data).Id,username: JSON.parse(data).Username,cid: message.channel.id});
          message.channel.send(new MessageEmbed().setDescription(`As ações de \`${method}\` para ${args[2]} foram tomadas com sucesso.`).setColor('#FFFF00'));
        } else {
          message.channel.send(method + " failed: Invalid username " + args[2]);
        }
      });
  }).on('error', error => {
    console.error("RBLX API (Username) | " + error);
  });
}

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

let listener = app.listen(process.env.PORT, function() {
  console.log('Não que importe, mas o aplicativo está escutando na porta: ' + listener.address().port);
});

module.exports = {
    byUID,
    byUser,
}