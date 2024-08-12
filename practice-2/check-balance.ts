import "dotenv/config";
import {
    Connection,
    LAMPORTS_PER_SOL,
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";

import { airdropIfRequired } from "@solana-developers/helpers";


let publicAddr = process.env["PUBLIC_PHANTOM_KEY"];

if (publicAddr === undefined){
    console.log("Public adderess in not found")
    
    process.exit(1);
}

const connection = new Connection(clusterApiUrl("devnet"));

console.log("connected to devnet");

const publicKey= new PublicKey(publicAddr);

const balanceInLamports= await connection.getBalance(publicKey);

const balanceInSol= balanceInLamports/ LAMPORTS_PER_SOL;

console.log(`The balance for walet ${publicKey} is ${balanceInSol}`);

console.log("Add more SOL");

await airdropIfRequired(connection, publicKey, 1 * LAMPORTS_PER_SOL, 0.5 * LAMPORTS_PER_SOL);

console.log(`Updated: The balance for walet ${publicKey} is ${balanceInSol}`);

