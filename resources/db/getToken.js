require("dotenv").config();
const axios = require('axios').default;
const mongoose = require('mongoose');
const Token = mongoose.model("Token");
const { logger } = require('../logger/logs');

URL = `https://accounts.zoho.com/oauth/v2/token?refresh_token=${process.env.REFRESH_TOKEN}&client_id=${process.env.CLIENT_ID}&client_secret=${process.env.CLIENT_SECRET}&grant_type=refresh_token`;

const getToken = async () => {
    response = await axios.post(URL);
    return response.data
}
const createToken = () => {
    setTimeout(async () => {
        const accessToken = await getToken();
        accessToken.expiresAt = new Date();
        const token = new Token(accessToken);
        token.save();
        console.log("Token Sucessfully created!");
        logger.info(`Token sucessfully Created! ${token}`)
    }, 2000);
}
module.exports = {
    createToken
}