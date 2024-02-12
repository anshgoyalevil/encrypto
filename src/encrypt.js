const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');
require('dotenv').config();

const writeFileAsync = promisify(fs.writeFile);

const algorithm = 'aes-256-cbc'; // Using AES encryption algorithm

function encryptFile(inputFilePath) {
    const inputFile = fs.readFileSync(inputFilePath);
    const base64Data = Buffer.from(inputFile).toString('base64');
    const cipher = crypto.createCipher(algorithm, process.env.ENCRYPTION_KEY);
    let encryptedData = cipher.update(base64Data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

async function encrypt(inputFilePath) {
    const encryptedData = encryptFile(inputFilePath);
    const outputPath = path.join(path.dirname(inputFilePath), 'encrypted.txt');
    await writeFileAsync(outputPath, encryptedData, 'utf8');
    console.log('File encrypted successfully:', outputPath);
}

module.exports = encrypt;