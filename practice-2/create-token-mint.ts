import "dotenv/config";
import {
    getExplorerLink
}from "@solana-developers/helpers";
import {
    Keypair,
    clusterApiUrl,
    Connection
} from "@solana/web3.js";
import { createMint } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY_Vova"];

if(privateKey === undefined){
    console.log("Can't get private key");
    process.exit(1);
}

const pKeyAsArray= Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(pKeyAsArray);

//console.log(sender.publicKey);

const connection = new Connection(clusterApiUrl("devnet"));

const tokenMint = await createMint(
    connection,
    sender,
    sender.publicKey,
    null,
    2
);

const link= getExplorerLink("address", tokenMint.toString(), "devnet");

console.log(`token mint: ${link}`);

// token mint: https://explorer.solana.com/address/jXVfZCA5f2AwQeUmVEkk3bEUDn3miq6Pb1LZvNusxpi?cluster=devnet

// vova token mint: https://explorer.solana.com/address/7PwkSDUcDU5dyqHDP7CW4RHQXabb4hyzgDbSqKGJ9ooS?cluster=devnet