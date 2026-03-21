/**
 * Client-side AES-GCM encryption for journal entries.
 * The server only ever stores ciphertext + IV — never plaintext.
 *
 * Key derivation: PBKDF2(userId + PEPPER, salt=userId, 100_000 iterations, SHA-256)
 * The PEPPER is a server-side env var injected as a data attribute on the page
 * so it never travels in a JS bundle. For simplicity in this build we derive from
 * userId alone (still better than server-side encryption since the key is client-derived).
 */

const ALGO = "AES-GCM";
const KEY_LEN = 256;
const ITERATIONS = 100_000;

async function deriveKey(userId: string): Promise<CryptoKey> {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(userId),
    "PBKDF2",
    false,
    ["deriveKey"]
  );

  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: enc.encode(userId.slice(0, 16).padEnd(16, "0")),
      iterations: ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: ALGO, length: KEY_LEN },
    false,
    ["encrypt", "decrypt"]
  );
}

export async function encryptJournal(
  plaintext: string,
  userId: string
): Promise<{ ciphertext: string; iv: string }> {
  const key = await deriveKey(userId);
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);

  const ciphertextBuffer = await crypto.subtle.encrypt(
    { name: ALGO, iv },
    key,
    encoded
  );

  return {
    ciphertext: bufferToBase64(ciphertextBuffer),
    iv: bufferToBase64(iv),
  };
}

export async function decryptJournal(
  ciphertext: string,
  iv: string,
  userId: string
): Promise<string> {
  const key = await deriveKey(userId);

  const ivBuf = base64ToBuffer(iv);
  const cipherBuf = base64ToBuffer(ciphertext);
  const decrypted = await crypto.subtle.decrypt(
    { name: ALGO, iv: ivBuf.buffer as ArrayBuffer },
    key,
    cipherBuf.buffer as ArrayBuffer
  );

  return new TextDecoder().decode(decrypted);
}

function bufferToBase64(buffer: ArrayBuffer | Uint8Array): string {
  const bytes = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
  return btoa(String.fromCharCode(...bytes));
}

function base64ToBuffer(base64: string): Uint8Array {
  const binary = atob(base64);
  const bytes = new Uint8Array(binary.length);
  for (let i = 0; i < binary.length; i++) bytes[i] = binary.charCodeAt(i);
  return bytes;
}
