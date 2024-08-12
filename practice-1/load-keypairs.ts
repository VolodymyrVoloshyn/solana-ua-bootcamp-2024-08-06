import "dotenv/config";
import { Keypair } from "@solana/web3.js";

let privateKey = process.env["SECRET_KEY"];

if (privateKey=== undefined){
    console.log("'Add SECRET_KEY to .env'")
    
    process.exit(1);
}

const skAsArray = Uint8Array.from(JSON.parse(privateKey));

let keyPair= Keypair.fromSecretKey(skAsArray);

console.log("From .env")
console.log("Public key:", keyPair.publicKey.toBase58());
console.log("Secret key:", keyPair.secretKey);
console.log("Done")


