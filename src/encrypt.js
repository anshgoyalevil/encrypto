const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');

const writeFileAsync = promisify(fs.writeFile);

const algorithm = 'aes-256-cbc'; // Using AES encryption algorithm

function encryptFile(inputFilePath, token) {
    const inputFile = fs.readFileSync(inputFilePath);
    const base64Data = Buffer.from(inputFile).toString('base64');
    const cipher = crypto.createCipher(algorithm, token);
    let encryptedData = cipher.update(base64Data, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    return encryptedData;
}

async function encrypt(inputFilePath, token) {
    const encryptedData = encryptFile(inputFilePath, token);
    const outputPath = path.join(path.dirname(inputFilePath), 'encrypted.txt');
    await writeFileAsync(outputPath, encryptedData, 'utf8');
    console.log('File encrypted successfully:', outputPath);
}

module.exports = encrypt;