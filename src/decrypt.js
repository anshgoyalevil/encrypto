const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');
require('dotenv').config();

const writeFileAsync = promisify(fs.writeFile);

const algorithm = 'aes-256-cbc'; // Using AES encryption algorithm

function decryptFile(encryptedData) {
    const decipher = crypto.createDecipher(algorithm, process.env.ENCRYPTION_KEY);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    const base64Data = Buffer.from(decryptedData, 'base64');
    return base64Data;
}

async function decrypt(inputFilePath) {
    const encryptedData = await readFileAsync(inputFilePath, 'utf8');
    const decryptedData = decryptFile(encryptedData);
    const outputPath = path.join(path.dirname(inputFilePath), 'decrypted.txt');
    await writeFileAsync(outputPath, decryptedData);
    console.log('File decrypted successfully:', outputPath);
}

module.decrypt = decrypt;