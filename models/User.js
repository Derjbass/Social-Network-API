//import mongoose
const { Schema, model} = require('mongoose');

//user schema
const UserSchema = new Schema({
    user_name: {
        type: String,
        unique: true,
        required: true
    },
    email: {
        type: String,
        match: [/.+@.+\..+/],
        unique: true,
        required: true
    },
    friends: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    thoughts: [{
        type: Schema.Types.ObjectId,
        ref: 'Thought'
    }]
},
{
    toJSON: {
        virtuals: true
    }
});

//get number of friends
UserSchema.virtual('numFriends').get(function() {
    return this.friends.length;
})

//create model
const User = model('User', UserSchema);

//export
module.exports = User;