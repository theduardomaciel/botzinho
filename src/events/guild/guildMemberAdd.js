module.exports = async (client, member) => {

    const settings = await Guild.findOne({
        guildId: message.guild.id
    }, (err, guild) => {
        if (err) console.error(err);
        if (!guild) {
            return console.log(`Não há configurações básicas para o servidor: ${member.guild.name}. Interrompendo inserção de cargo.`);
        }
    })

    const joinResponse = `Olá! **${member.user.username}**, seja bem vindo ao servidor: **${member.guild.name}**!`
    
    const role = member.guild.roles.cache.find(role => role.name === 'EAD');
    member.roles.add(role);

    try {
        return message.author.send(joinResponse)
        .catch(error => {
            console.error(`Não foi possível enviar a DM de boas vindas para ${message.author.tag}.\n`, error);
        });
    } catch (error) {
        console.log(error);
    }

}