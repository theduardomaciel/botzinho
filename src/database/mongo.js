const mongoose = require('mongoose');
const mongoPath = 'mongodb+srv://meninocoiso:botzinhobonitinho@botzinho.luhh1.mongodb.net/<dbname>?retryWrites=true&w=majority'

module.exports = async () => {
    await mongoose.connect(mongoPath, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    })
    return mongoose;
}