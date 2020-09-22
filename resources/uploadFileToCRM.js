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

const readFile = (currentToken) => {



    files.forEach(file => {
        archivos++;
        const data = new FormData()
        let url = `https://www.zohoapis.com/crm/v2/${process.env.ZOHO_MODULE}/${file.ID_DEAL_ZOHO}/Attachments`;
        if (fs.existsSync(`${directoryPath}/${file.ID_STORE_EXT}.pdf`)) {
            data.append('file', fs.createReadStream(`${directoryPath}/${file.ID_STORE_EXT}.pdf`));
        } else if (fs.existsSync(`${directoryPath}/${file.ID_STORE_EXT}.zip`)) {
            data.append('file', fs.createReadStream(`${directoryPath}/${file.ID_STORE_EXT}.zip`));
        } else if (fs.existsSync(`${directoryPath}/${file.ID_STORE_EXT}.docx`)) {
            data.append('file', fs.createReadStream(`${directoryPath}/${file.ID_STORE_EXT}.docx`));
        } else if (fs.existsSync(`${directoryPath}/${file.ID_STORE_EXT}.jpg`)) {
            data.append('file', fs.createReadStream(`${directoryPath}/${file.ID_STORE_EXT}.jpg`));
        } else if (fs.existsSync(`${directoryPath}/${file.ID_STORE_EXT}.jpeg`)) {
            data.append('file', fs.createReadStream(`${directoryPath}/${file.ID_STORE_EXT}.jpeg`));
        } else if (fs.existsSync(`${directoryPath}/${file.ID_STORE_EXT}.jfif`)) {
            data.append('file', fs.createReadStream(`${directoryPath}/${file.ID_STORE_EXT}.jfif`));
        }
        else {
            logger.error(`the zoho id: ${file.ID_DEAL_ZOHO}  the file: ${file.ID_STORE_EXT} doesnt exist`);
        }
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
        if (data._overheadLength > 0) {
            axios(config)
                .then(function (response) {
                    logger.info(JSON.stringify(response.data), `the zoho id: ${file.ID_DEAL_ZOHO}`);
                })
                .catch(function (error) {
                    logger.error(error);
                });
            contador++;
        }
    }
    );

    console.log(`Listo! Se cargaron ${contador} de ${archivos}`);
}
module.exports = { readFile };