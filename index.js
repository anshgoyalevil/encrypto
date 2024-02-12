const fs = require('fs');
const encrypt = require('./src/encrypt');
const decrypt = require('./src/decrypt');

if (process.argv.length < 4) {
    console.error('Usage: node script.js <command> <file>');
    process.exit(1);
}

const command = process.argv[2];
const filePath = process.argv[3];

if (!['encrypt', 'decrypt'].includes(command)) {
    console.error('Invalid command. Please use "encrypt" or "decrypt"');
    process.exit(1);
}

if (!filePath) {
    console.error('Please specify the file path');
    process.exit(1);
}

if (!fs.existsSync(filePath)) {
    console.error('File not found:', filePath);
    process.exit(1);
}

if (command === 'encrypt') {
    encrypt(filePath).catch(console.error);
} else if (command === 'decrypt') {
    decrypt(filePath).catch(console.error);
}
