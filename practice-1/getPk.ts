import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const Base58 = require("base-58");

//let keyPair = Keypair.generate();

// console.log("Generated")
// console.log("Public key:", keyPair.publicKey.toBase58());
// console.log("Secret key:", keyPair.secretKey);

let privateKey = process.env["SECRET_KEY_Vova"];

if (privateKey=== undefined){
    console.log("'Add SECRET_KEY to .env'")
    
    process.exit(1);
}

const skAsArray = Uint8Array.from(JSON.parse(privateKey));

//const skAsArray = Uint8Array.from(JSON.parse("[28,104,185,88,158,119,100,107,56,9,93,214,47,248,122,244,5,148,182,157,144,97,126,139,238,113,72,3,24,98,246,167,31,233,245,187,233,114,173,146,31,245,182,3,227,161,197,64,177,99,169,91,122,206,53,173,18,243,186,3,136,149,102,199]"));

let keyPair= Keypair.fromSecretKey(skAsArray);

console.log("From .env")
console.log("Public key:", keyPair.publicKey.toBase58());
console.log("Secret key:", keyPair.secretKey);


let sk= Base58.encode(skAsArray);
console.log("Secret key:", sk);


console.log("Done")

