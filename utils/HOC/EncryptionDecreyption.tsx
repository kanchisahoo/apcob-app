import 'react-native-get-random-values';
import CryptoJS from 'crypto-js';
const removeNoise = (data: string): string => {
  for (let i = data.length - 1; i >= 0; i--) {
    if (data[i] === '}') {
      return data.slice(0, i + 1);
    }
  }
  return data;
};

export const encryptRequest = (responseBody: string, key: string): string => {
  // Generate a random 16-byte IV
  const ivBytes = new Uint8Array(16);
  for (let i = 0; i < 16; i++) {
    ivBytes[i] = Math.floor(Math.random() * 256);
  }

  // Convert Uint8Array -> WordArray
  const iv = CryptoJS.lib.WordArray.create(ivBytes);

  // Convert Base64 key to WordArray
  const decodedKey = CryptoJS.enc.Base64.parse(key);

  // Encrypt the data
  const encrypted = CryptoJS.AES.encrypt(
    CryptoJS.enc.Utf8.parse(responseBody),
    decodedKey,
    {
      iv,
      mode: CryptoJS.mode.CBC,
      padding: CryptoJS.pad.Pkcs7,
    },
  );

  // Concatenate IV + ciphertext
  const combined = iv.concat(encrypted.ciphertext);

  // Return as Base64 string
  return CryptoJS.enc.Base64.stringify(combined);
};

export const decryptResponse = (
  encryptedString: string | undefined,
  key: string,
): string | null => {
  if (typeof encryptedString !== 'string' || encryptedString.trim() === '') {
    // console.warn('decryptResponse received invalid encrypted string:', encryptedString);
    return null; // or return ''; based on how you handle empty decrypts
  }

  try {
    // Decode Base64 string to WordArray
    const byteCipherText = CryptoJS.enc.Base64.parse(encryptedString);

    // Extract IV (first 16 bytes = 4 words)
    const iv = CryptoJS.lib.WordArray.create(
      byteCipherText.words.slice(0, 4),
      16,
    );

    // Extract ciphertext (remaining bytes)
    const cipherText = CryptoJS.lib.WordArray.create(
      byteCipherText.words.slice(4),
      byteCipherText.sigBytes - 16,
    );

    // Decode Base64 key
    const decodedKey = CryptoJS.enc.Base64.parse(key);

    // Decrypt
    const decrypted = CryptoJS.AES.decrypt(
      { ciphertext: cipherText },
      decodedKey,
      {
        iv,
        mode: CryptoJS.mode.CBC,
        padding: CryptoJS.pad.Pkcs7,
      },
    );

    // Convert to UTF-8 string
    const decryptedString = decrypted.toString(CryptoJS.enc.Utf8);
    return removeNoise(decryptedString);
  } catch (error) {
    console.error('Error during decryption:', error);
    return null;
  }
};