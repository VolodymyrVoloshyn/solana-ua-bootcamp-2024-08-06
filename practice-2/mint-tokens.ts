import "dotenv/config";
import { Connection, Keypair, PublicKey, clusterApiUrl } from "@solana/web3.js";
import { mintTo } from "@solana/spl-token";
import { getExplorerLink } from "@solana-developers/helpers";

let privateKey = process.env["SECRET_KEY_Vova"];

if (privateKey === undefined) {
    console.log("Can't get private key");
    process.exit(1);
}

const pKeyAsArray = Uint8Array.from(JSON.parse(privateKey));
const sender = Keypair.fromSecretKey(pKeyAsArray);

//console.log(`Sender public key: ${sender.publicKey.toBase58()}`);

const connection = new Connection(clusterApiUrl("devnet"));

const MINOR_UNITS_PER_MAJOR_UNITS = Math.pow(10, 2);

const tokenMintAccount = new PublicKey("7PwkSDUcDU5dyqHDP7CW4RHQXabb4hyzgDbSqKGJ9ooS");

const recipientTokenAccount= new PublicKey("7ghCpkCvhe2cWVyEnNDiiPdP8YQ7WvnZGe2FPEv7CY3L");

const transactionSignature = await mintTo(
    connection,
    sender,
    tokenMintAccount,
    recipientTokenAccount,
    sender,
    10 * MINOR_UNITS_PER_MAJOR_UNITS
);

const link= getExplorerLink("transaction", transactionSignature, "devnet");

console.log(`Success. Mint token transaction: ${link}`);
