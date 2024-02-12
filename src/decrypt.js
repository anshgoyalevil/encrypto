const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const algorithm = 'aes-256-cbc'; // Using AES encryption algorithm

function decryptFile(encryptedData, token) {
    const decipher = crypto.createDecipher(algorithm, token);
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');
    const base64Data = Buffer.from(decryptedData, 'base64');
    return base64Data;
}

async function decrypt(inputFilePath, token) {
    const encryptedData = await readFileAsync(inputFilePath, 'utf8');
    const decryptedData = decryptFile(encryptedData, token);
    const outputPath = path.join(path.dirname(inputFilePath), 'decrypted.txt');
    await writeFileAsync(outputPath, decryptedData);
    console.log('File decrypted successfully:', outputPath);
}

module.exports = decrypt;