## Encryptox

A powerful encryption tool that can encrypt and decrypt any file type.

### How to use?

1. Install the NPM package globally by running the following command:
```bash
npm install -g encryptox
```
2. Run the program like
```bash
encryptox <encrypt/decrypt> <filepath> <password>
```

### Example Usage:

- To encrypt a text file:
```bash
encryptox encrypt letter.txt mysecret
```

This would output a `encrypted.txt` file with the encrypted text.


- To decrypt this `encrypted.txt` file, run:
```bash
encryptox decrypt encrypted.txt mysecret
```

This would output a `decrypted.txt` file with the decrypted text.