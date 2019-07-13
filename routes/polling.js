var Pusher = require('pusher');
const { Router } = require('express');
const router = Router();


// Initialiance pusher
var pusher = new Pusher({
  appId: '822753',
  key: '549c2bdbf09152653457',
  secret: 'dcad4d343bd2fd3a71b4',
  cluster: 'us2',
  encrypted: true
});


router.get('/', (req, res) => {
    res.send('welcome from router');
});

router.post('/', (req, res) => {
    pusher.trigger('os-poll', 'os-vote', {
        points: 1,
        os: req.body.os
    });

    return res.json({
        success: true,
        message: 'Thank you vote post!'
    })
});

module.exports = router;