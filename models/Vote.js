const { Schema, model } = require('mongose');

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