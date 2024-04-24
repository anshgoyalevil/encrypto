const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const crypto = require('crypto');

const writeFileAsync = promisify(fs.writeFile);
const readFileAsync = promisify(fs.readFile);

const algorithm = 'aes-256-cbc'; // Using AES encryption algorithm

async function decrypt(inputFilePath, token, outputFolderPath) {

    // Generate key from token
    const key = token.slice(0, 32);

    const encryptedDataWithIV = await readFileAsync(inputFilePath, 'utf8');

    // Extract IV from the beginning of encrypted data
    const iv = Buffer.from(encryptedDataWithIV.slice(0, 32), 'hex');
    const encryptedData = encryptedDataWithIV.slice(32); // Remove IV from encrypted data

    // Create a decipher using createDecipheriv
    const decipher = crypto.createDecipheriv(algorithm, key, iv);

    // Decrypt the data
    let decryptedData = decipher.update(encryptedData, 'hex', 'utf8');
    decryptedData += decipher.final('utf8');

    // Parse the decrypted data to extract file info and base64 data
    const separatorIndex = decryptedData.indexOf('@');
    if (separatorIndex === -1) {
        throw new Error('Invalid encrypted file format');
    }
    const fileInfoString = decryptedData.slice(0, separatorIndex);
    const base64Data = decryptedData.slice(separatorIndex + 1);
    const fileInfo = JSON.parse(fileInfoString);

    // Define the output path for the decrypted file
    const outputPath = path.join(outputFolderPath, 'decrypted_' + fileInfo.name);

    // Write the base64 data to file after decoding it
    await writeFileAsync(outputPath, Buffer.from(base64Data, 'base64'));

    console.log('File decrypted successfully:', outputPath);
}

module.exports = decrypt;
