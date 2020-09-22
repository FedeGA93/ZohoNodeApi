require('dotenv');
const axios = require('axios');
const { logger } = require('./logger/logs');

let contador = 0;
let archivos = 0;
let invalid = 0;
const directoryPath = require('../resources/pdf/borrando.json');
const arr = directoryPath;


const deleteAttachment = (currentToken) => {
    arr.forEach(file => {
        archivos++;
        let url = `https://www.zohoapis.com/crm/v2/${process.env.ZOHO_MODULE}/${file.record_id}/Attachments/${file.attachment_id}`
        const config = {
            method: 'DELETE',
            url,
            headers: {
                'content-type': 'application/json',
                'Authorization': `Zoho-oauthtoken ${currentToken}`,
            },
        };
        axios(config)
            .then(function (response) {
                contador++;
                logger.info(response.data);

            })
            .catch(function (error) {
                logger.error(error);
            });

    }
    );

    console.log(`Listo! Se eliminaron ${contador} de ${archivos} archivos invalidos ${invalid}`);
}
module.exports = { deleteAttachment };