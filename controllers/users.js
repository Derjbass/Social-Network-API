//import models
const Thought = require('../models/Thought');
const User = require('../models/User');

const userFuncs = {
    //create a new user
    createUser(req, res) {
        User.create(req.body)
            .then(query => res.json(query));
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
    },

    //get user by id
    getUserById(req, res) {
        User.findOne({_id: req.params.id})
            .populate({
                path: 'thoughts'
            }).then(query => res.json(query));
    },

    //update user
    updateUser(req, res) {
        User.findOneAndUpdate({_id: req.params.id}, req.body, {new:true})
            .then(query => res.json(query))
    }
}

module.exports = userFuncs;