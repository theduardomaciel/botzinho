module.exports = (client, member) => {
    const joinResponse = `Olá! **${member.user.username}**, seja bem vindo ao servidor: **${member.guild.name}**!`
    const role = member.guild.roles.cache.find(role => role.name === 'EAD');

    if (!role) return console.log('Este cargo não existe');

    member.addRole(role);
    const channel = member.guild.channels.get('aulas-ead');
    if(!channel) return console.log("Canal não existe.");
    channel.send(joinResponse);
}