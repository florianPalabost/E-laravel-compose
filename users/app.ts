// server
require('dotenv').config();
const compression = require('compression');
const express = require('express');
const bodyParser = require('body-parser');
const cookieParser = require('cookie-parser');
const cors = require("cors");
const app = express();
const userRoutes = require('./routes/user');
const port = process.env.PORT || 8081;
const db = require('./db');

db.sequelize
    .authenticate()
    .then(() => {
        console.log('Connection has been established successfully.');
    })
    .catch(err => {
        console.error('Unable to connect to the database:', err);
    });

db.sequelize.sync({ force: true }).then(() => {
    console.log("Drop and re-sync db.");
});

// handle cors
const corsOptions = {
    origin: "http://localhost:8888"
};
app.use(cors(corsOptions));

// parsing request type application/json
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


// reduce size body response  -> improve speed
app.use(compression());

// routing
app.use('/users', userRoutes);

app.listen(port, () => {
    console.log('Run on port : ', port);
});