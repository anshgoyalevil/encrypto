#!/usr/bin/env node

const fs = require('fs');
const path = require('path');
const encrypt = require('./src/encrypt');
const decrypt = require('./src/decrypt');

if (process.argv.length < 5) {
    console.error('Usage: node script.js <command> <file> <token> [<outputFolderPath>]');
    process.exit(1);
}

const command = process.argv[2];
const filePath = process.argv[3];
const token = process.argv[4];
let outputFolderPath = process.argv[5];

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

if (!token) {
    console.error('Please specify the token');
    process.exit(1);
}

if (!outputFolderPath) {
    // If output folder path is not provided, use the same folder as the input file
    outputFolderPath = path.dirname(filePath);
} else if (!fs.existsSync(outputFolderPath)) {
    console.error('Output folder does not exist:', outputFolderPath);
    process.exit(1);
}

if (command === 'encrypt') {
    encrypt(filePath, token, outputFolderPath).catch(console.error);
} else if (command === 'decrypt') {
    decrypt(filePath, token, outputFolderPath).catch(console.error);
}
