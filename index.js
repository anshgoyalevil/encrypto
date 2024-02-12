#!/usr/bin/env node

const fs = require('fs');
const encrypt = require('./src/encrypt');
const decrypt = require('./src/decrypt');

if (process.argv.length < 5) {
    console.error('Usage: node script.js <command> <file> <token>');
    process.exit(1);
}

const command = process.argv[2];
const filePath = process.argv[3];
const token = process.argv[4];

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

if (command === 'encrypt') {
    encrypt(filePath, token).catch(console.error);
} else if (command === 'decrypt') {
    decrypt(filePath, token).catch(console.error);
}
