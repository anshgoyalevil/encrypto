## Encryptox

A powerful encryption tool that can encrypt and decrypt any file type using the `AES-256-CBC` encryption algorithm.

### How to use?

1. Install the NPM package globally by running the following command:
```bash
npm install -g encryptox
```
2. Run the program like
```bash
encryptox <encrypt/decrypt> <filepath> <password>
```

#### Note:
- The `encrypt` and `decrypt` commands are case-sensitive.
- The`password` needs to be at least 32 characters long since the `AES-256-CBC` encryption algorithm requires a 32-byte (256-bit) key.
- You can generate a 32-character password using the following command:
    ```bash
    openssl rand -hex 32
    ```
- Make sure you store the generate password in a secure location since it is required to decrypt the file/s.

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