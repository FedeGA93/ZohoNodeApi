require("dotenv").config();
require('./resources/db/mongo');
const mongoose = require('mongoose');
const Token = mongoose.model("Token");
const { logger } = require('./resources/logger/logs');
const { createToken } = require('./resources/db/getToken');
const { readFile } = require('./resources/readFile');

async function httpRequest() {
    try {
        const response = await Token.findOne({});
        if (response == null || Date.now() > response.hour) {
            createToken();
        } else {
            const currentToken = response.access_token;
            logger.info(`Success Message and variables: ${currentToken}`);
            readFile(currentToken);
        }
    } catch (error) {
        logger.error(`Error Message : ${error}`);
    }
}

httpRequest();
