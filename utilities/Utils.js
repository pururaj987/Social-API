const UUID_int = require('uuid-int');
const UUID = require('uuid');
const id = 0;
const crypto = require("crypto");
const generator = UUID_int(id);
const jwt = require("jsonwebtoken");
module.exports = new class Utils {

    publicKey = "-----BEGIN PUBLIC KEY-----\n" + "MIIBIjANBgkqhkiG9w0BAQEFAAOCAQ8AMIIBCgKCAQEA7rL0MimYZ+Fxi85MQdon\n" + "vuJNLxJVZbRvG5AII1vJoQW2mws34NPLyR8Zrr4fuuqCpjP3PuM/9xsUfKRMpC9m\n" + "NEDu6zfB1cDtb1aS+5gK9Qr8uS92LuLPkY35Gh65hpyEunv7XTpnC1cL4i6CR1J8\n" + "PkMkORcF9vmG03IfvaF2u8ZXVdzeQx7kwYKWYIAkcG721UFwzkdo1JN75lliehmv\n" + "n/SaUbuaYzvn2W7akiHA7qj0PS6th/YzE9M8NpMLDn3gdvUSyrTAu+6vmrL2kzOM\n" + "WqnAtGzTokcv100Vv4eYiQnBpj8Ou+NZnfQjHI5T2EWjWZomGA8f2qSeLSZNzVEX\n" + "EwIDAQAB\n" + "-----END PUBLIC KEY-----\n"
    privateKey = "-----BEGIN PRIVATE KEY-----\n" + "MIIEvgIBADANBgkqhkiG9w0BAQEFAASCBKgwggSkAgEAAoIBAQDusvQyKZhn4XGL\n" + "zkxB2ie+4k0vElVltG8bkAgjW8mhBbabCzfg08vJHxmuvh+66oKmM/c+4z/3GxR8\n" + "pEykL2Y0QO7rN8HVwO1vVpL7mAr1Cvy5L3Yu4s+RjfkaHrmGnIS6e/tdOmcLVwvi\n" + "LoJHUnw+QyQ5FwX2+YbTch+9oXa7xldV3N5DHuTBgpZggCRwbvbVQXDOR2jUk3vm\n" + "WWJ6Ga+f9JpRu5pjO+fZbtqSIcDuqPQ9Lq2H9jMT0zw2kwsOfeB29RLKtMC77q+a\n" + "svaTM4xaqcC0bNOiRy/XTRW/h5iJCcGmPw6741md9CMcjlPYRaNZmiYYDx/apJ4t\n" + "Jk3NURcTAgMBAAECggEAOHym5zwKsgKa0T/nsenDYBvDsjD/for9hCNImb198Joe\n" + "hYBZH95fKmAuvriFX8FhW52OlBZJK9v/tCNZc703zYPURluyhjgauC9fpyRq62RH\n" + "PDesGxpXjpVvbqv4sY9WpZ7zdDN+8SMPT947vE8b0cwnxU7afYC9VEp8km6kX3jy\n" + "YDtRT/58cV9d5Mc19br5SM8Wduh+mcgD2Z/jYIejz6Ji8AO2HI0aOVL/P4H0uIU8\n" + "nZvUjSr5D41t36GY2XfM8/dAGd+vnxeqAU8hTjG4wkMcb2RDxRnFCEiRMfHhk9/s\n" + "iH0ziSUjCdzdnc2R725D3c599RTJugdbv4Zudp9ISQKBgQD/eSpjzbUrD8e9ZFYB\n" + "R4UaUUa4x7Mury9O/UzXHIDDBdeBC4SXc8yztDSAP5QKLapLNxXb21mrgMs2rBoK\n" + "r4xvS61TY/E0ip/GSP1+dVYy6dNtlMUGJOQA4SSEXTXW1DqEIpbizvidUfOmM9sT\n" + "dFGkhDsJlVbPTZEg+wBxqvLTfwKBgQDvMO9lIIXthvKzi7hlIy/VF1f577fXANGz\n" + "0wRfpj4M0Xkt5p1iCqqp+oWYwiakq935nH9J/ZFAeNPN7eq1BHXEoUg945cBOkh4\n" + "5L825NnAcR61/VOqihasZNdp8QRl+8NMoKFaneOVzbp5y3KREw0dDke5udslib2L\n" + "C/tW18/2bQKBgEVHKkOeSP7AbL3jM59tMZ8NY0xAe0qxnvagofHDfPdl4ibQZMhd\n" + "Uql4uLP+ibqo34E+EuNn/E0RxAmzaexz5nVX5Ey00XgaD3HJ4VQlpZZw6jDRIwyj\n" + "fGDwrOJoFG2JZ8TlTF19GtYunw/3B/WimXEvmoLiyIO22SBEcL5iSS8pAoGBAOmM\n" + "d4PfsMWPqbUkbQTbyZ2gsHdL2M6nbxrNpQyb7yRm+JKYBf4v+hoEkqPolwDdC93p\n" + "L+SYIVa5Y95EO5NKao93B2neqpg5R4A7onVAGVotWdZLJ4FyWdc0k51PB4Now3Yz\n" + "tbkcR5cDDNxViWUcHAbN5bz0O4W4q4l0RpKyIM41AoGBAK8anG/eOc/+cVLF3c3P\n" + "Wp5EIe4MkSZ0XXqAi1GXzFDmt2gL8GfXLpr51d2hFWc0vnbMXyO0VosdHhSlIc/w\n" + "jwgrmCWgW8rjYzwijFJBl7h/2TfJqmNnqtR8N0UpJAg1QiyAgvEKWfXu9xgy1lK8\n" + "4tW5fuKID6A2h5ZHx4JBHx+/\n" + "-----END PRIVATE KEY-----\n"

    verifyToken(token) {
        try {
            return jwt.verify(token, this.publicKey, {algorithm: 'RS256', complete: true});
        } catch (err) {
            return null;
        }
    }

    generateToken(payload) {
        try {
            const token = jwt.sign({
                payload
            }, this.privateKey, {algorithm: 'RS256', expiresIn: '24h'});
            const refreshToken = jwt.sign({
                payload
            }, this.privateKey, {algorithm: 'RS256', expiresIn: '2160h'});
            return {
                token: token,
                refreshToken: refreshToken
            }
        } catch (err) {
            return null;
        }
    }

    getNumUUID() {
        return generator.uuid();
    }

    getRandomInt(min, max) {
        min = Math.ceil(min);
        max = Math.floor(max);
        return Math.floor(Math.random() * (max - min + 1)) + min;
    }

    getUUID() {
        return UUID.v4();
    }

    hashPassword(password, callback) {
        var salt = crypto.randomBytes(128).toString('base64');
        var iterations = 10000;
        crypto.pbkdf2(password, salt, 10000, 512, "sha256", (err, derivedKey) => {
            callback({
                salt: salt, hash: Buffer.from(derivedKey).toString('base64'), iterations: iterations
            });
        });
    }

    isPasswordCorrect(savedHash, savedSalt, savedIterations, passwordAttempt) {
        return savedHash === Buffer.from(crypto.pbkdf2Sync(passwordAttempt, savedSalt, savedIterations, 512, "sha256")).toString('base64');
    }
}