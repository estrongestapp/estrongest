const CryptoJS =  require("crypto-js");

export default function sendEncryptedInfo (info) {
    const number = process.env.REACT_APP_NUMERO_CELULAR;
    const encryptedInfo = encryptInfo(info);
    window.open(`https://wa.me/${number}?text=${encodeURIComponent(encryptedInfo)}`);
}

function encryptInfo(info) {
    const encrypted = CryptoJS.AES.encrypt(info, 'chave');
    return encrypted.toString();
}