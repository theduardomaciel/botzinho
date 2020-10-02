const { MessageEmbed } = require('discord.js')

function CreateChannel(message, name){
    const server = message.guild;
    const channelName = channel;

    server.createChannel(channelName, "text");
}

module.exports = async (message, name) => {

    let channel;

    CreateChannel(message, name).then(createdChannel => {
        channel = createdChannel;
    })

    const introMessage = new MessageEmbed()
    introMessage.setTitle('CANALZINHO DE MÚSICAS (BETA)')
    introMessage.setDescription(`Para pesquisar uma música, simplesmente digite o nome da sua música neste canal, que a sua música entrará na fila.
    Os botões abaixo desta mensagem são responsáveis por controlar a atual playlist, e a legenda está disponível na descrição do canal.`)
    introMessage.setImage('https://i.imgur.com/kK3O4Di.png')

    

    message.channel.send(introMessage);

    return 

};