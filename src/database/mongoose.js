const mongoose = require('mongoose');
const mongoPath = process.env.MONGO_PATH

module.exports = async () => {

    const dbOptions = {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }
    await mongoose.connect(mongoPath, dbOptions)

    mongoose.connection.on('err', err => {
        console.error(`Houve um erro ao tentar conectar:\n${err.stack}`);
    })

    mongoose.connection.on('disconnected', () => {
        console.warn('A conexão com o Banco de Dados (DB) foi perdida!');
    })

    return mongoose;
}