require('dotenv');
const path = require('path');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { logger } = require('./logger/logs');
const directoryPath = path.join(__dirname, './pdf/Contratos');
const { jsonParser } = require('./csvParser/jsonParser');
const files = jsonParser();
let contador = 0;
let archivos = 0;

const getAttachmentList = (currentToken) => {

    files.forEach(file => {
        console.log(file)
    });

    let idZohoTest = 4302002000155774764;

    archivos++;
    let url = `https://www.zohoapis.com/crm/v2/${process.env.ZOHO_MODULE}/${idZohoTest}/Attachments`;


    const config = {
        method: 'get',
        url,
        headers: {
            'content-type': 'application/json',
            'Authorization': `Zoho-oauthtoken ${currentToken}`,
        }
    };


    axios(config)
        .then(function (response) {
            console.log(response.data.data[0].id);
        })
        .catch(function (error) {
            logger.error(error);
        });
    contador++;

    console.log(`Listo! Se cargaron ${contador} de ${archivos}`);
}


module.exports = { getAttachmentList };