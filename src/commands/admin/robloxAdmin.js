const { MessageEmbed } = require('discord.js')

const https = require('https');
const express = require('express');
let bodyParser = require('body-parser');
const app = express();

let rolename = "Roblox Admin"
let toBan = [];

let lastChangelog;
let changelog = 'Loading...'

let channel;

function byUID(method, args, message) {
  channel = message.channel;
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
  channel = message.channel;
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

function updateChangelog(method, updatedChangelog, message) {
  channel = message.channel;
  changelog = updatedChangelog;
  message.channel.send(new MessageEmbed().setDescription(`O changelog de **Extreme Adventures** foi atualizado por \`${message.author.username}\` para:\n${updatedChangelog}`).setColor('#FFFF00'));
}

app.use(express.static('public'));

app.get('/', function(request, response) {
  if (request.headers.username != undefined) {
      console.log(request.headers.cid);
      if (request.headers.method == 'changelog') {
        if (request.headers.rblxerror == undefined) {
          channel.send(`O changelog de **Extreme Adventures** foi atualizado com sucesso.`);
        } else {
          channel.send(`Não foi possível atualizar o changelog de **Extreme Adventures**.\nErro da API do Roblox:\n${request.headers.rblxerror}`);
        }
      } else {
        if (request.headers.rblxerror == undefined) {
          channel.send('Successfully ' + request.headers.method + 'ned user ' + request.headers.username + " | ID: " + request.headers.value);
        } else {
          channel.send("Failed to " + request.headers.method + " user: " + request.headers.username + " | ID: " + request.headers.value + " | `Rblx-Error:  " + request.headers.rblxerror + "`"); 
        }
      }   
  }
  if (request.headers.method == 'changelog') {
    response.send(changelog);
  } else {
    response.send(toBan[0]);
    toBan.shift();
  }
});

let listener = app.listen(process.env.PORT, function() {
  console.log('Não que importe, mas o aplicativo está escutando na porta: ' + listener.address().port);
});

module.exports = {
    byUID,
    byUser,
    updateChangelog,
}