import cryptoJs from 'crypto-js';

export default class CommonUtils {

    private secretKey: string;


    /**
     * Initializing the secret key
     */
    constructor() {

        if (process.env.SECRET_KEY) {
            this.secretKey = process.env.SECRET_KEY;
        } else {
            throw new Error("Please provide secret key while execution")
        }

    }

    /**
     * Provide Encrypted data from string.
     * @param data 
     * @returns 
     */
    public encryptData(data: string) {
        const encryptData = cryptoJs.AES.encrypt(data, this.secretKey).toString();
        console.log(encryptData)
        return encryptData;
    }

    /**
     * Decrypted data from encrypted data
     * @param encdata 
     * @returns 
     */
    public decryptData(encdata: string) {
        const decryptData = cryptoJs.AES.decrypt(encdata, this.secretKey).toString(cryptoJs.enc.Utf8);
        return decryptData;
    }
}