const crypto = require('crypto')
class CryptoUtils {
    static generateRandomKey() {
        const key = crypto.randomBytes(32);
        return key.toString('hex');
    }
    static computeHMAC(key, message) {
        const hmac = crypto.createHmac('sha3-256', key);
        hmac.update(message);
        return hmac.digest('hex');
    }
}
module.exports=CryptoUtils