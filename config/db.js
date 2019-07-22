const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
// adding mongodb altas
mongoose.connect('mongodb+srv://pusher-polling:pusher-polling@cluster0-nhqvl.mongodb.net/test?retryWrites=true&w=majority', {
    useNewUrlParser: true,
})
.then(db => console.log('>> DB Mlab connected'))
.catch(e => console.log(e));