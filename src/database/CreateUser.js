const mongoose = require('mongoose');
const User = require('./models/UserConfig');

module.exports = async (_id, userId, userName, playlistLenght, playlist) => {

    try {
        const newUser = new User({
            _id: mongoose.Types.ObjectId(),
            userId: userId,
            userName: userName,
            playlistLenght: 0,
            playlist: []
        })
        newUser.save()
        console.log(newUser);
    } catch (error) {
        console.error(error);
    }

}