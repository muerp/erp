import JSEncrypt from 'jsencrypt'
import CryptoJS from 'crypto-js'
import { bytesToUint8Array, stringToUint8Array, uint8ArrayToString } from '.'

const Storage: any = {
    config: {
        aesIv: 'afef2802e7764d98759fd8e7c7188b75',
        aesKey: '15e7db49d05f4a7626581fde6e4e27a742b81c411e8cc821788cbf8ed56603ce',
        rsa: {
            privateKey: '-----BEGIN PRIVATE KEY-----\n' +
                'MIIEvAIBADANBgkqhkiG9w0BAQEFAASCBKYwggSiAgEAAoIBAQCyYoI7sCLFWRsI\n' +
                'EOc16Fr7oG2+iufbE9WF3acB4edLkQ4vLafdJyDpCqA8dF35+9DoxeTQqTv89EUt\n' +
                'aBNqnklACf767OFYTVM7rak/cqVMYqlat7/a6IradCJDlA4y/6MVzXZ7CdB1bkuV\n' +
                '7a9w3PPhlSj6Q5Miv1zM/6VF9ecyE6W42Tj3VLmE8thGPIIgrpA9V16yr5o9hExZ\n' +
                'qjXn49P7zDdiBLUiH2cqhEWBdx65ohIYlZyLcB4YL3QW4e6+kwqysaDzgDWiknJE\n' +
                'dl0qYl7kFz4GAdjuMOWlFZAx7ViCYX4NgXDC3Bd36Zj2Ng2fbW2tKYwHeMMbZjHN\n' +
                '1UBswpbhAgMBAAECggEACg58Q0thRaXwQuRAQxPbEtkb05FDxyzwxzZUd+P/8aZd\n' +
                'jQxYxjxL+/qRrdOgbq6JiKElDrYG8z8XXU5DD5CZfMcNFtSSIBov4vfqrqO5RohA\n' +
                'MVfIznMSTOsdX8wlGfvuekhJV/nMKxELD6QR1XeN0KRjmVEdwBvXHZmCyRU2/pjw\n' +
                'YHrQjQ6Mlg/2B6MroKlXLcHb4Jdu3O30BkICbIYcFQNtGSXStk1CL5cbBsXOyS6f\n' +
                'ISN/GlA/8/j1EvFZ3jY3SgV2xNT8aBNjR5lWPmiLCPVe+hpF0pbjqceVjAMj6jm8\n' +
                'fRg7Xmt9A1u71tY9i+BbcjzZOyb+mL21HW0EmlibJwKBgQD5fcGYgjuKuegRhM0h\n' +
                'n+bfxq35GZnmY0xh4ZDA2dMalQdR5FJflh4rvGGPqKJ5E0VTGWD+UnOZlAkas105\n' +
                'F7mVLy3s1OvzrdZWUmXxMG9EawEwT4+5hSHBkyTlqjN3PifSN5e8jljIVcQXUxm6\n' +
                '1fy5y5NsVDulAZSy7/uEwu7tuwKBgQC3Cd0KkVVZki5EN17ze37bgXKC11Ux15kj\n' +
                'QBBDkRu0vmB51Ro97LvHPK9dXf5lbxx1n4mFb/vh7CMd+xeQ0EyE9J4DWd9UORvp\n' +
                'Ey0KuFBHjUwTR0MaEF5+SSjiiw9L/m1vhlj6DRyPGqrDGJHfVJP/Ir7hpvydE43r\n' +
                '7mTyBcy2EwKBgDmKenr9FlRxegeIVHM72NiljvxTnj4XisdMacFAu8J2uqB1g1YO\n' +
                'XlkB8pJad1ZrTmLTCJ6/T3ANR2hEE+0V/rRclD/5/41M+5EfIenVnOPvte95ehF0\n' +
                'lgt6L1lUvtfymuaN8c4IGovh0/75KIcB0W7cd9zVNIhi6/O1C5JcDxT/AoGAI2Wy\n' +
                '65JDkTjl3adfo3Kki8qy3H7MKQFqyhhfjNGJLCENA0Kk+ojHn7Yqq8G7qt4cANtD\n' +
                'exy292/1Mp0WZ5kA002DKV6+A8mvjhl5QnN2gv/eUHQdk/LKc12unHEMGkQv4bt3\n' +
                'hZP3i+06TNR5kVkH7fVIONdUTwQzFAdcWjmo5yUCgYAmlrcwMAv71XHdpoSv6vUw\n' +
                'FW0bUgIwQjCQd71qcGRmObJdGSH0kwc/FbbDjDWuD2yIQsI7/1mJrtoUQbBGMkzc\n' +
                'NJd2bkY+whgh6jxvFrI6zToMazA5qz6D5R7M8ssHXSsbLvO2P99o6AT2Ereal9YX\n' +
                'dmGTaBWlGO/E4pCdcJos1g==\n' +
                '-----END PRIVATE KEY-----',
            publicKey: '-----BEGIN PUBLIC KEY-----\n' +
                'MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEAsmKCO7AixVkbCBDnNeha\n' +
                '+6Btvorn2xPVhd2nAeHnS5EOLy2n3Scg6QqgPHRd+fvQ6MXk0Kk7/PRFLWgTap5J\n' +
                'QAn++uzhWE1TO62pP3KlTGKpWre/2uiK2nQiQ5QOMv+jFc12ewnQdW5Lle2vcNzz\n' +
                '4ZUo+kOTIr9czP+lRfXnMhOluNk491S5hPLYRjyCIK6QPVdesq+aPYRMWao15+PT\n' +
                '+8w3YgS1Ih9nKoRFgXceuaISGJWci3AeGC90FuHuvpMKsrGg84A1opJyRHZdKmJe\n' +
                '5Bc+BgHY7jDlpRWQMe1YgmF+DYFwwtwXd+mY9jYNn21trSmMB3jDG2YxzdVAbMKW\n' +
                '4QIDAQAB\n' +
                '-----END PUBLIC KEY-----'
        }
    },
    setItem(key: string, data: any) {
        let text = this.aesEncrypt(JSON.stringify(data))
        localStorage.setItem(key, text)
    },
    getItem(key: string) {
        let text = localStorage.getItem(key)
        return text ? JSON.parse(this.aesDecrypt(text)) : ''
    },
    removeItem(key: string) {
        localStorage.removeItem(key);
    },
    getAESKey() {
        if (this.aes) {
            return this.aes
        }
        let slot = localStorage.getItem('__slot')
        if (slot) {
            let p = slot.split('@')
            if (p.length > 0) {
                const aes = {
                    key: uint8ArrayToString(p[0].split(',')),
                    iv: uint8ArrayToString(p[1].split(',')),
                };
                return aes
            }
        }
        this.aes = this.initAESKey()
        localStorage.setItem('__slot', stringToUint8Array(this.aes.key).toString() + '@' + stringToUint8Array(this.aes.iv).toString())
        return this.aes
    },
    getRsaKey(callback: (data: { pub: string, pri: string }) => void) {
        let slot = localStorage.getItem('__slot_p')
        if (slot) {
            slot = uint8ArrayToString(bytesToUint8Array(slot.split(',')))
            let p = slot.split('@')
            callback && callback({
                pub: p[0],
                pri: p[1]
            })
            return
        }
        this.getRsaKeys((pri: string, pub: string) => {
            let s = pub + '@' + pri
            localStorage.setItem('__slot_p', stringToUint8Array(s).toString())
            callback && callback({
                pub: pub,
                pri: pri
            })
        })
    },
    getRsaKeys(callback: (privateKey: string, publicKey: string) => void) {
        let vm = this
        window.crypto.subtle.generateKey({
            name: 'RSA-OAEP',
            modulusLength: 2048,
            publicExponent: new Uint8Array([0x01, 0x00, 0x01]),
            hash: { name: 'SHA-512' },
        }, true, ['encrypt', 'decrypt']
        ).then(function (key) {

            window.crypto.subtle.exportKey('pkcs8', key.privateKey).then(function (keydata1) {
                window.crypto.subtle.exportKey(
                    'spki',
                    key.publicKey
                ).then(function (keydata2) {
                    let privateKey = vm.rsa2Text(keydata1, 1)
                    let publicKey = vm.rsa2Text(keydata2)
                    callback(privateKey, publicKey)
                }).catch(function (err) {
                    console.error(err)
                })
            })
                .catch(function (err) {
                    console.error(err)
                })
        })
            .catch(function (err) {
                console.error(err)
            })
    },
    initAESKey() {
        let hex = '1234567890abcdef'
        let iv = ''
        let key = ''
        for (let i = 0; i < 64; ++i) {
            key += hex.charAt(Math.floor(Math.random() * hex.length))
        }
        for (let i = 0; i < 32; ++i) {
            iv += hex.charAt(Math.floor(Math.random() * hex.length))
        }
        return {
            key: key,
            iv: iv,
        }
    },
    rsa2Text(buffer: any, isPrivate = 0) {
        let binary = ''
        let bytes = new Uint8Array(buffer)
        let len = bytes.byteLength
        for (let i = 0; i < len; i++) {
            binary += String.fromCharCode(bytes[i])
        }
        let base64 = window.btoa(binary)
        let text = '-----BEGIN ' + (isPrivate ? 'PRIVATE' : 'PUBLIC') + ' KEY-----\n'
        text += base64.replace(/[^\\x00-\\xff]/g, '$&\x01').replace(/.{64}\\x01?/g, '$&\n')
        text += '\n-----END ' + (isPrivate ? 'PRIVATE' : 'PUBLIC') + ' KEY-----'
        return text
    },
    aesEncrypt(str: string) {
        //去掉所有的换行符
        let aes = this.getAESKey()
        const iv = CryptoJS.enc.Utf8.parse(aes.iv)
        const key = CryptoJS.enc.Utf8.parse(aes.key)
        let ub = CryptoJS.enc.Utf8.parse(str)
        let encrypted = CryptoJS.AES.encrypt(ub, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 })
        return encrypted.ciphertext.toString()
    },
    aesDecrypt(text: string) {
        try {
            const aes = this.getAESKey()
            const iv = CryptoJS.enc.Utf8.parse(aes.iv)
            const key = CryptoJS.enc.Utf8.parse(aes.key)
            let encryptedHexStr = CryptoJS.enc.Hex.parse(text);
            let ub = CryptoJS.enc.Base64.stringify(encryptedHexStr);
            let decrypt = CryptoJS.AES.decrypt(ub, key, { iv: iv, mode: CryptoJS.mode.CBC, padding: CryptoJS.pad.Pkcs7 });
            let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
            return decryptedStr.toString();
        } catch (e) {
            return '';
        }

    },
    rsaEncrypt(text: string, callback: (res: string) => void) {
        Storage.getRsaKey((rsa: { pub: any }) => {
            let encryptor = new JSEncrypt() // 新建JSEncrypt对象
            encryptor.setPublicKey(rsa.pub) // 设置公钥
            callback && callback(encryptor.encrypt(encodeURI(text)) || '')
        })
    },
    rsaDecrypt(text: string, callback: (res: string) => void) {
        this.getRsaKey((rsa: { pri: any }) => {
            let decrypt = new JSEncrypt() // 新建JSEncrypt对象
            decrypt.setPrivateKey(rsa.pri)
            const s = decrypt.decrypt(text);
            callback && callback(s? decodeURI(s):'') // 解密
        })
    },
    rsaEncryptByConfig(text: string) {
        if (!text) return '';
        let encryptor = new JSEncrypt() // 新建JSEncrypt对象
        encryptor.setPublicKey(this.config.rsa.publicKey) // 设置公钥
        return text && encryptor.encrypt(encodeURI(text));
    },
    rsaDecryptByConfig(text: any) {
        if (!text) return '';
        let encryptor = new JSEncrypt() // 新建JSEncrypt对象
        encryptor.setPrivateKey(this.config.rsa.privateKey) // 设置公钥
        const result = encryptor.decrypt(text);
        return result && decodeURI(result);
    },
    stringToMD5(str: any) {
        return CryptoJS.MD5(str).toString();
    }
}
export default Storage;

export const arrayToMd5Base64 = function (array: any) {
    const wordArray = CryptoJS.lib.WordArray.create(array)
    return CryptoJS.MD5(wordArray).toString(CryptoJS.enc.Base64)
}

export const arrayToMd5 = function (array: any) {
    const wordArray = CryptoJS.lib.WordArray.create(array)
    return CryptoJS.MD5(wordArray)
}
