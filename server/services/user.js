const User = require('../models/user');
const error = require('../utils/error');

const showUsersService = function(){
    User.find({}, function(err, users){
        // if (err) return res.status(400).json({ success: false, err });
        if (err) return error(false, 400);

        // Bring new users into the array to security purpose..
        let newUsers = [];
        users.forEach((user) => {
            newUsers.push({
                _id: user._id,
                firstname: user.firstname,
                lastname: user.lastname,
                email: user.email,
                title: user.title,
                profilePhoto: user.profilePhoto
            });
        });

        // Sends all of the users..
        return newUsers;
    });
};

module.exports = {
    showUsersService
};