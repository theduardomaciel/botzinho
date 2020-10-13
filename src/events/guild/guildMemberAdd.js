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
    
    const role = member.guild.roles.cache.find(settings.defaultRole);

    member.roles.add(role);

    try {
        const channel = member.guild.channels.get('aulas-ead');
        channel.send(joinResponse);
    } catch (error) {
        console.log(error);
    }

}