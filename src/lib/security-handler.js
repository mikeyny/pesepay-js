"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PesePaySecurity = void 0;
const crypto_js_1 = __importDefault(require("crypto-js"));
class PesePaySecurity {
    constructor(encryptionKey) {
        // Convert the encryption key to a WordArray, which is the format required by crypto-js.
        // Also create the IV, which is the first 16 characters of the key.
        this.key = crypto_js_1.default.enc.Utf8.parse(encryptionKey);
        this.iv = crypto_js_1.default.enc.Utf8.parse(encryptionKey.slice(0, 16));
    }
    encryptData(data) {
        // First, convert the data object to a JSON string.
        const jsonString = JSON.stringify(data);
        // Then encrypt the JSON string using AES.
        const encrypted = crypto_js_1.default.AES.encrypt(jsonString, this.key, {
            iv: this.iv,
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7
        });
        // Finally, convert the result to a string.
        return encrypted.toString();
    }
    decryptData(encryptedData) {
        // First, decrypt the encrypted data string.
        const decrypted = crypto_js_1.default.AES.decrypt(encryptedData, this.key, {
            iv: this.iv,
            mode: crypto_js_1.default.mode.CBC,
            padding: crypto_js_1.default.pad.Pkcs7
        });
        // Then convert the decrypted data back to a JSON string.
        const jsonString = decrypted.toString(crypto_js_1.default.enc.Utf8);
        // Finally, parse the JSON string back to an object.
        return JSON.parse(jsonString);
    }
}
exports.PesePaySecurity = PesePaySecurity;
