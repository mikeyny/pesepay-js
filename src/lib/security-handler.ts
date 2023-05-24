import CryptoJS from 'crypto-js';

export class PesePaySecurity {
  private key;
  private iv;

  constructor(encryptionKey: string) {
    // Convert the encryption key to a WordArray, which is the format required by crypto-js.
    // Also create the IV, which is the first 16 characters of the key.
    this.key = CryptoJS.enc.Utf8.parse(encryptionKey);
    this.iv = CryptoJS.enc.Utf8.parse(encryptionKey.slice(0, 16));
  }

  encryptData(data: object): string {
    // First, convert the data object to a JSON string.
    const jsonString = JSON.stringify(data);

    // Then encrypt the JSON string using AES.
    const encrypted = CryptoJS.AES.encrypt(jsonString, this.key, { 
      iv: this.iv, 
      mode: CryptoJS.mode.CBC, 
      padding: CryptoJS.pad.Pkcs7 
    });

    // Finally, convert the result to a string.
    return encrypted.toString();
  }

  decryptData(encryptedData: string): object {
    // First, decrypt the encrypted data string.
    const decrypted = CryptoJS.AES.decrypt(encryptedData, this.key, { 
      iv: this.iv, 
      mode: CryptoJS.mode.CBC, 
      padding: CryptoJS.pad.Pkcs7 
    });

    // Then convert the decrypted data back to a JSON string.
    const jsonString = decrypted.toString(CryptoJS.enc.Utf8);

    // Finally, parse the JSON string back to an object.
    return JSON.parse(jsonString);
  }
}
