require("dotenv").config();
const mongoose = require('mongoose');
const moment = require('moment');
const { logger } = require('../logger/logs');

mongoose.connect(`${process.env.MONGO}`, { useNewUrlParser: true });
const Schema = mongoose.Schema;

const db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'), logger.error(console, 'connection error:'));
db.once('open', function () {
    console.log("we're connected!");
    logger.info(`Connect to dB ${moment().format('MMMM Do YYYY, h:mm:ss a')}`)

});



const Token = new Schema({
    access_token: String,
    createDate: { type: Date, default: moment().format() },
    hour: { type: String, default: moment().add(1, "hour").format('h:mm') },
    expiresAt: { type: Date }
});

Token.indexes({ "expiresAt": 1 }, { expireAfterSeconds: 3000 });

mongoose.model('Token', Token);
