var Pusher = require('pusher');
const mongoose = require('mongoose');
const Vote = require('../models/Vote');
const { Router } = require('express');
const router = Router();


// Initialiance pusher
var pusher = new Pusher({
  appId: '822753',
  key: '549c2bdbf09152653457',
  secret: 'dcad4d343bd2fd3a71b4',
  cluster: 'us2',
  //encrypted: true
});


router.get('/', (req, res) => {
    Vote.find().then(votes => {
        res.json({
            success: true,
            votes: votes
        });
    })
});

router.post('/', (req, res) => {

    const newVote = {
        os: req.body.os,
        points: 1
    };

    new Vote(newVote).save().then(vote => {
        pusher.trigger('os-poll', 'os-vote', {
            points: parseInt(vote.points),
            os: vote.os
        });
    });

    return res.json({
        success: true,
        message: 'Thank you vote post!'
    })
});

module.exports = router;