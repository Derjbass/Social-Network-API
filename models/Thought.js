// import mongoose
const { Schema, model, Types} = require('mongoose');
//import moment
const moment = require('moment');

const ReactionSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId(),
    },
    reactionBody: {
        type: String,
        required: true,
        maxlength: 280
    },
    username: {
        type: String,
        required: true
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: val => moment(val).format('MMM DD, YYYY [at] hh:mm a')
    }
},
{
    toJSON:{
        virtuals: true,
        getters: true
    }
})

//thought schema
const ThoughtSchema = new Schema({
    thoughtText: {
        type: String,
        required: true,
        maxlength: 280
    },
    createdAt: {
        type: Date,
        default: Date.now,
        get: val => moment(val).format('MMM DD, YYYY [at] hh:mm a')
    },
    username: {
        type: String,
        required: true
    },
    reactions: [ReactionSchema]
},
{
    toJSON: {
        virtuals: true,
        getters: true
    }
});

//get number of friends
ThoughtSchema.virtual('reactionCount').get(function() {
    return this.reactions.length;
})

//create model
const Thought = model('Thought', ThoughtSchema);

module.exports = Thought;