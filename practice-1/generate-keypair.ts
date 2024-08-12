import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const Base58 = require("base-58");

let keyPair = Keypair.generate();

console.log("Generated")
console.log("Public key:", keyPair.publicKey);
console.log("Secret key:", keyPair.secretKey);

let privateKey = process.env["SECRET_KEY"];

if (privateKey=== undefined){
    console.log("'Add SECRET_KEY to .env'")
    
    process.exit(1);
}

const skAsArray = Uint8Array.from(JSON.parse(privateKey));

keyPair= Keypair.fromSecretKey(skAsArray);

console.log("From .env")
console.log("Public key:", keyPair.publicKey.toBase58());
console.log("Secret key:", keyPair.secretKey);

// let sk= Base58.encode(skAsArray);
// console.log("Secret key:", sk);


console.log("Done")


