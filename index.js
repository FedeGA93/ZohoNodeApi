require("dotenv").config();
require('./resources/db/mongo');
const mongoose = require('mongoose');
const Token = mongoose.model('Token');
const { logger } = require('./resources/logger/logs');
const { createToken } = require('./resources/db/getToken');
const { readFile } = require('./resources/uploadFileToCRM');
// const { getAttachmentList } = require('./resources/getAttachmentsList');
// const { deleteAttachment } = require('./resources/deleteAttachments');

async function httpRequest() {
    try {
        const response = await Token.findOne({});
        if (response == null || Date.now() > response.hour) {
            createToken();
        } else {
            const currentToken = response.access_token;
            logger.info(`Success Message and variables: ${currentToken}`);
            readFile(currentToken);
            // getAttachmentList(currentToken);
            //deleteAttachment(currentToken);
        }
    } catch (error) {
        logger.error(`Error Message : ${error}`);
    }
}

httpRequest();
