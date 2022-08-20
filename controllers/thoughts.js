//import models
const Thought = require('../models/Thought');
const User = require('../models/User');

const thoughtFuncs = {
    allThoughts(req, res) {
        Thought.find({})
            .populate({
                path: 'reactions',
                select: '-__v'
            }).select('-__v')
            .sort({ _id: -1 })
            .then(query => res.json(query))
    },

    // get thought by supplied id
    thoughtById(req, res) {
        Thought.findOne({ _id: req.params.id })
            .populate({
                path: 'reactions',
                select: '-__v'
            }).select('-__v')
            .sort({ _id: -1 })
            .then(query => {
                if (!query) return res.json({ message: 'No data for this id' });
                res.json(query)
            }
            )
    },

    // create a new thought
    createThought(req, res) {
        Thought.create(req.body)
            .then(({ _id }) => {
                return User.findOneAndUpdate(
                    {
                        _id: req.body.userId
                    },
                    {
                        $push: { thoughts: _id }
                    },
                    {
                        new: true
                    }
                )
            }).then(query => {
                res.json(query)
            })
    },

    //updated a thought when passed id param
    updateThought(req, res) {
        Thought.findOneAndUpdate({ _id: req.params.id }, req.body,)
            .then(query => res.json(query))
            .save();
    },

    //delete thoughts
    deleteThought(req, res) {
        Thought.findOneAndDelete(req.params.id)
            .then(query => {
                if (!query) return res.json({ message: 'no thoughts found to delete' })

                return User.findOneAndUpdate(
                    {
                        _id: req.params.userId
                    },
                    {
                        $pull: { thoughts: req.params.id }
                    },
                    {
                        new: true
                    }
                )
            })
    },

    //reactions
    //create reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $push: { reactions: req.body }
            },
            {
                new: true
            }
        ).populate({
            path: 'reactions',
            select: '-__v'
        }).then(query => {
                res.json(query);
            })
    },

    //delete reaction
    deleteReaction(req, res) {
        Thought.findOneAndUpdate(
            {
                _id: req.params.id
            },
            {
                $pull: { reactions: { reactionId: req.params.reacId } }
            },
            {
                new: true
            }
        ).then(query => res.json(query));
    }

}

module.exports = thoughtFuncs;