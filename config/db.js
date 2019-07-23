const mongoose = require('mongoose');
const urlMongoAtlas = 'mongodb+srv://pusher-polling:pusher-polling@cluster0-nhqvl.mongodb.net/test?retryWrites=true&w=majority';
const urlMongoNative = 'mongodb://localhost:27017/app-polling';

mongoose.Promise = global.Promise;
// adding mongodb altas
mongoose.connect(urlMongoNative, {
    useNewUrlParser: true,
})
.then(db => console.log('>> DB Mlab connected'))
.catch(e => console.log(e));