const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');

const writeFileAsync = promisify(fs.writeFile);
const statAsync = promisify(fs.stat);

const algorithm = 'aes-256-cbc'; // Using AES encryption algorithm

async function encrypt(inputFilePath, token) {
    const inputFile = fs.readFileSync(inputFilePath);
    const fileStats = await statAsync(inputFilePath);
    const fileInfo = {
        name: path.basename(inputFilePath),
        type: path.extname(inputFilePath).slice(1), // Get rid of the dot
        size: fileStats.size
    };
    const fileInfoString = JSON.stringify(fileInfo);
    console.log(fileInfoString)
    const base64Data = Buffer.from(inputFile).toString('base64');
    const dataToEncrypt = fileInfoString + '@' + base64Data; // Use ':' as a separator
    const cipher = crypto.createCipher(algorithm, token);
    let encryptedData = cipher.update(dataToEncrypt, 'utf8', 'hex');
    encryptedData += cipher.final('hex');
    const outputPath = path.join(path.dirname(inputFilePath), fileInfo.name + '.txt');
    await writeFileAsync(outputPath, encryptedData, 'utf8');
    console.log('File encrypted successfully:', outputPath);
}

module.exports = encrypt;
