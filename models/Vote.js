const { Schema, model } = require('mongoose');

const VoteSchema = new Schema({
    os: {
        type: String,
        required: true
    },
    points: {
        type: String,
        required: true
    }
});

module.exports = model('Vote', VoteSchema);