import "dotenv/config";
import { getExplorerLink } from "@solana-developers/helpers";
import {
    Connection,
    Keypair,
    PublicKey,
    clusterApiUrl
} from "@solana/web3.js";
import { getOrCreateAssociatedTokenAccount } from "@solana/spl-token";

let privateKey = process.env["SECRET_KEY"];

if (privateKey === undefined) {
    console.log("Can't get private key");
    process.exit(1);
}

const pKeyAsArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(pKeyAsArray);

console.log(`Sender public key: ${sender.publicKey.toBase58()}`);

const connection = new Connection(clusterApiUrl("devnet"));

const tokenMintAccount = new PublicKey("jXVfZCA5f2AwQeUmVEkk3bEUDn3miq6Pb1LZvNusxpi");

const recipient = new PublicKey("9MuJ78LDroHuGDA4GoRViWQGCG5WD44MMLEZLDUqqPsd");

const tokenAccount = await getOrCreateAssociatedTokenAccount(
    connection,
    sender,
    tokenMintAccount,
    recipient
);

console.log(`Token Account: ${tokenAccount.address.toBase58()}`);

const link = getExplorerLink("address", tokenAccount.address.toBase58(), "devnet");

console.log(`Created token account: ${link}`);


