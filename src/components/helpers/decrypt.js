const CryptoJS =  require("crypto-js");

function descryptInfo(info) {
    const decrypted = CryptoJS.AES.decrypt(info, process.env.REACT_APP_CRYPT_KEY);
    return decrypted.toString(CryptoJS.enc.Utf8);
}