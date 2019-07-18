const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

mongoose.connect('mongodb://pusher:pusher2019@ds353007.mlab.com:53007/app-polling', {
    useNewUrlParser: true,
})
.then(db => console.log('>> DB Mlab connected'))
.catch(e => console.log(e));