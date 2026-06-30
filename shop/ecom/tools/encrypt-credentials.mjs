/**
 * One-time tool to encrypt database credentials using XOR cipher.
 * Run: node tools/encrypt-credentials.mjs
 */

const KEY = "ShoPv3r$3cr3tK3y!2026";

function xorEncrypt(plaintext, key) {
  const bytes = [];
  for (let i = 0; i < plaintext.length; i++) {
    const charCode = plaintext.charCodeAt(i) ^ key.charCodeAt(i % key.length);
    bytes.push(charCode.toString(16).padStart(2, "0"));
  }
  return bytes.join("");
}

const url = "libsql://ecommercelog-spurno.aws-us-east-1.turso.io";
const token =
  "eyJhbGciOiJFZERTQSIsInR5cCI6IkpXVCJ9.eyJhIjoicnciLCJpYXQiOjE3ODI4Mzg4MjUsImlkIjoiMDE5ZjE5NzItZmQwMS03ZDBkLWFkNWMtNWQ5YTkzZWI0NzBlIiwia2lkIjoiY3dfWmw5T3NsV2FnNFFkUjVHZUN0Nll2b19MTkdlUmY1STY1bEZVMXRCOCIsInJpZCI6ImVjYzBjNjcxLWUyMmMtNDA0Yy1hZjNmLWYzZDNlNjE4OTk5ZiJ9.4otvGu6MrGbhOb7JppDQwSXHXXsWDKf5miDw43Oba8M33U5wRNtK8DC8Zv2D-M-21nE6fo2cdazBjAgB4mgDAQ";

console.log("// Encrypted credentials — copy these into js/credentials.js");
console.log("const ENCRYPTED_URL = '" + xorEncrypt(url, KEY) + "';");
console.log("const ENCRYPTED_TOKEN = '" + xorEncrypt(token, KEY) + "';");
console.log("const CREDENTIAL_KEY = '" + KEY + "';");
