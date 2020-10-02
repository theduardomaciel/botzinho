const mongoose = require('mongoose')
const Guild = require('../../database/models/GuildConfig');

const { MessageEmbed } = require('discord.js');

const execute = async (client, message, args, isModerator) => {

    if (!isModerator) return message.reply('somente moderadores podem executar esse comando.');
    if (!args) return message.reply('você precisa mencionar alguém, ou usar \`!role all\` para adicionar o cargo para todos os membros!');
    
    let role;

    if (args[0] === 'default') {
        role = message.guild.roles.cache.find(role => role.name === args[1]);

        const settings = await Guild.findOne({
            guildId: message.guild.id
        }, (err, guild) => {
            if (err) console.error(err);
            if (!guild) {
                const createGuild = require('../../database/CreateGuild')
                createGuild(mongoose.Types.ObjectId(), message.guild.id, message.guild.name, process.env.PREFIX, role, undefined, undefined)
            }
        })

        await settings.updateOne({
            defaultRole: role.id
        });

        message.channel.send(new MessageEmbed().setDescription(`O cargo padrão do seu servidor foi atualizado para: ${role.name}`));

        return;

    } else if (args[0] === 'create') {
        if (!args[1] || !args[2]) return message.channel.send(new MessageEmbed().setDescription(`Você precisa seguir o padrão do construtor de cargos:
        \`!role [create] [nome do cargo] [cor do cargo]\``));
        try {
            role = message.guild.roles.create({data: {
                name: args[1],
                color: args[2],
            }});
        } catch (error) {
            console.error(error);
            return message.channel.send(new MessageEmbed().setDescription(`Verifique se você seguiu o padrão do construtor de cargos:
            \`!role [create] [nome do cargo] [cor do cargo]\``));
        }

    } else if (args[0] === 'all') {

        role = message.guild.roles.cache.find(role => role.name === args[1]);

        try {
            if (!role) return message.channel.send(new MessageEmbed().setDescription('Não foi possível criar um cargo novo ou encontrar o cargo pedido.'));
            message.guild.members.fetch().then(allMembers => {
                const members = allMembers.filter(member => !member.user.bot);
                members.forEach(member => member.roles.add(role));
            });
            message.channel.send(new MessageEmbed().setDescription(`O cargo: **${role.name}** foi adicionado para todos os membros do servidor.`));
        } catch (error) {
            console.log(error);
        }

    } else {
        role = message.guild.roles.cache.find(role => role.name === args[1]);
        const member = message.mentions.members.first();

        if (!member) return message.channel.send(new MessageEmbed().setDescription(`Não foi possível encontrar uma pessoa através da sua menção.`));
        member.roles.add(role)
        message.channel.send(new MessageEmbed().setDescription(`**O cargo** \`${role.name}\` **foi adicionado à** \`${member.displayName}\` **corretamente.**`));
    }

}

module.exports = {
    name: 'role',
    description: `Adiciona um cargo a um determinado membro do servidor através de uma menção. Ao usar \`!role all\` adiciona o cargo do argumento seguinte a todos os usuários do servidor. Somente disponível para moderadores.`,
	aliases: ['cargo', 'cargos'],
    cooldown: 5,
    guildOnly: false,
    execute,
};