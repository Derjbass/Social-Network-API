// import mongoose
const { Schema, model, Types} = require('mongoose');
//import moment
const moment = require('moment');

//thought schema
const ThoughtSchema = new Schema({
    thoughtTest: {
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