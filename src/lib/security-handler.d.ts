export declare class PesePaySecurity {
    private key;
    private iv;
    constructor(encryptionKey: string);
    encryptData(data: object): string;
    decryptData(encryptedData: string): object;
}
