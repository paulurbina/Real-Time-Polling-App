const express = require('express');
const cors = require('cors');
const path = require('path');

// Initialize variable
const app = express();
app.set('port', 3000 || process.env.PORT());

// set public folder
app.use(express.static(path.join(__dirname, 'public')));

// Set middlewares
app.use(express.json());
app.use(express.urlencoded({extended: false}));

// Enable Cors
app.use(cors());

// Server Listerning
app.listen(app.get('port'), () => {
    console.log(`>> Server on port ${app.get('port')}`);
});