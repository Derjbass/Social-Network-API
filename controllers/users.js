//import models
const Thought = require('../models/Thought');
const User = require('../models/User');

const userFuncs = {
    //create a new user
    createUser(req, res) {
        User.create(req.body)
            .then(data => res.json(data));
    },

    //get all users
    getUsers(req, res) {
        User.find({})
            .populate({
                path: 'thoughts',
                select: '-__v'
            }).sort({_id: -1})
                .then(query => {
                    res.json(query);
                })
    }
}

module.exports = userFuncs;