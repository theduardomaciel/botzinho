const dotenv = require('dotenv');
dotenv.config();

const prefix = process.env.PREFIX;

module.exports = {
	name: 'help',
	description: 'Uou! Inception! Mas enfim, é a lista de todos os meus comandos ou uma informação específica de um comando, assim como esta.',
	aliases: ['commands'],
	usage: '[command name]',
	cooldown: 5,
	execute(client, message, args) {
		const data = [];
        const { commands } = message.client;

        if (!args.length) {

            data.push('Aqui está uma lista de todos os meus comandos:');
            data.push(commands.map(command => command.name).join(', '));
            data.push(`\nVocê pode enviar \`${prefix}help [nome do comando]\` para acessar um comando específico.`);

            return message.author.send(data, { split: true })
                .then(() => {
                    if (message.channel.type === 'dm') return;
                    message.reply('**lhe enviei uma DM com todos os meus comandos!**');
                })
                .catch(error => {
                    console.error(`Não foi possível mandar DM para ${message.author.tag}.\n`, error);
                    message.reply(`**Parece que eu não consigo lhe mandar mensagens diretas (DMs)!** ${message.author.tag} ,você as desativou?`);
                });
        }

        const name = args[0].toLowerCase();
        const command = commands.get(name) || commands.find(c => c.aliases && c.aliases.includes(name));

        if (!command) {
            return message.reply('Este comando não é válido');
        }

        data.push(`**NOME:** ${command.name}`);

        if (command.aliases) data.push(`**Sinônimos:** \`${command.aliases.join(', ')}\``);
        if (command.description) data.push(`**Descrição:** \`${command.description}\``);
        // if (command.usage) data.push(`**Uso:** ${prefix}${command.name} ${command.usage}`);

        data.push(`Cooldown: \`${command.cooldown || 3} segundo(s)\``);

        message.channel.send(data, { split: true });

	},
};