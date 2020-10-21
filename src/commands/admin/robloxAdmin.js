const https = require('https');

let rolename = "Roblox Admin"

let toBan = [];
function byUID(method,args,message) {
  https.get("https://api.roblox.com/users/" + args[2], (res) => {
      
    let data = '';
    res.on('data', d => {
        data += d
    })
    res.on('end', () => {
        if (res.statusCode == 200) {
            toBan.push({method: method,username: JSON.parse(data).Username,value: args[2],cid: message.channel.id});
        } else {
          
          message.channel.send(method + " failed: Invalid userId " + args[2]);
        }
      });
  }).on('error', error => {
    console.error("RBLX API (UID) | " + error);
  });
}

function byUser(method,args,message) {
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
        } else {
          message.channel.send(method + " failed: Invalid username " + args[2]);
        }
      });
  }).on('error', error => {
    console.error("RBLX API (Username) | " + error);
  });
}

module.exports = {
    byUID,
    byUser,
}