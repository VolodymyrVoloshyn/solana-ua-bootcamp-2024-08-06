import "dotenv/config";
import { Keypair } from "@solana/web3.js";

const Base58 = require("base-58");

//let keyPair = Keypair.generate();

// console.log("Generated")
// console.log("Public key:", keyPair.publicKey.toBase58());
// console.log("Secret key:", keyPair.secretKey);

let privateKey = process.env["SECRET_KEY"];

if (privateKey=== undefined){
    console.log("'Add SECRET_KEY to .env'")
    
    process.exit(1);
}

const skAsArray = Uint8Array.from(JSON.parse(privateKey));

let keyPair= Keypair.fromSecretKey(skAsArray);

// console.log("From .env")
// console.log("Public key:", keyPair.publicKey.toBase58());
// console.log("Secret key:", keyPair.secretKey);

const vovaStr: string = "Vova".toLowerCase();

const startTime = new Date();

console.log(`Started at ${startTime.toString()}`);

while(true){
    let keyPair2 = Keypair.generate();

    let startStr= keyPair2.publicKey.toBase58().substring(0, 4).toLowerCase();

    //console.log(startStr);

    if(startStr === vovaStr){
        console.log("Vova Public key:", keyPair2.publicKey.toBase58());
        console.log("Vova Secret key:", keyPair2.secretKey);

        break;
    }
}

const endTime = new Date();
const duration = endTime.getTime() - startTime.getTime();

console.log(`Finished at ${endTime}. Duration is ${duration / 1000} seconds`);


// let sk= Base58.encode(skAsArray);
// console.log("Secret key:", sk);


console.log("Done")

