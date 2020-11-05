const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const userSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    phoneNumber: {
        type: String,
        required: true
    },
    status: {
        type: Boolean,
        required: true
    }, 
    createdLog: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Mare'
        }
    ]
});
