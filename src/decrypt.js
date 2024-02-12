const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const algorithm = 'aes-256-cbc'; // Using AES encryption algorithm

async function decrypt(inputFilePath, token) {
    const encryptedData = await readFileAsync(inputFilePath, 'utf8');
    const decipher = crypto.createDecipher(algorithm, token);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    const separatorIndex = decryptedData.indexOf('@');
    if (separatorIndex === -1) {
        throw new Error('Invalid encrypted file format');
    }
    const fileInfoString = decryptedData.slice(0, separatorIndex);
    const base64Data = decryptedData.slice(separatorIndex + 1);
    const fileInfo = JSON.parse(fileInfoString);
    const outputPath = path.join(path.dirname(inputFilePath), 'decrypted_' + fileInfo.name);
    await writeFileAsync(outputPath, Buffer.from(base64Data, 'base64'));
    console.log('File decrypted successfully:', outputPath);
}

module.exports = decrypt;
