import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY_Vova"];

if (privateKey === undefined) {
    console.log("Can't get private key");
    process.exit(1);
}

const pKeyAsArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(pKeyAsArray);

console.log(`Sender public key: ${sender.publicKey.toBase58()}`);

const connection = new Connection(clusterApiUrl("devnet"));

const tokenMintAccount = new PublicKey("7PwkSDUcDU5dyqHDP7CW4RHQXabb4hyzgDbSqKGJ9ooS");

//const recipient = new PublicKey("9MuJ78LDroHuGDA4GoRViWQGCG5WD44MMLEZLDUqqPsd");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    sender.publicKey
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

console.log(`Created token account: ${link}`);


// Created token account: https://explorer.solana.com/address/3ZgPi1FLiLTghDLat7PRTV3dpbCN4d3g6Lto6vZqr5d8?cluster=devnet

// Vova:  Created token account: https://explorer.solana.com/address/7ghCpkCvhe2cWVyEnNDiiPdP8YQ7WvnZGe2FPEv7CY3L?cluster=devnet
