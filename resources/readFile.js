require('dotenv');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { logger } = require('./logger/logs');
const directoryPath = path.join(__dirname, './pdf/');
const { jsonParser } = require('./csvParser/jsonParser');
const files = jsonParser();


const readFile = (currentToken) => {
    files.forEach(file => {
        const data = new FormData()
        let url = `https://www.zohoapis.com/crm/v2/${process.env.ZOHO_MODULE}/${file.ID_DEAL_ZOHO}/Attachments`;
        data.append('file', fs.createReadStream(`${directoryPath}${file.ID_STORE_EXT}.pdf`));

        const config = {
            method: 'post',
            url,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Zoho-oauthtoken ${currentToken}`,
                ...data.getHeaders()
            },
            data: data
        };

        axios(config)
            .then(function (response) {
                logger.info(JSON.stringify(response.data));
                console.log(JSON.stringify(response.data));
            })
            .catch(function (error) {
                logger.error(error);
                console.log(error);
            });

    });
}
module.exports = { readFile };