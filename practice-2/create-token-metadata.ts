import "dotenv/config";
import {
    getExplorerLink
} from "@solana-developers/helpers";
import {
    Connection, 
    clusterApiUrl, 
    Keypair, 
    PublicKey, 
    sendAndConfirmTransaction, 
    Transaction,
} from "@solana/web3.js";
import { createCreateMetadataAccountV3Instruction } from "@metaplex-foundation/mpl-token-metadata";

let privateKey = process.env["SECRET_KEY_Vova"];

if (privateKey === undefined) {
    console.log("Can't get private key");
    process.exit(1);
}

const pKeyAsArray = Uint8Array.from(JSON.parse(privateKey));
const user = Keypair.fromSecretKey(pKeyAsArray);

console.log(user.publicKey.toBase58());

const connection = new Connection(clusterApiUrl("devnet"));

const TOKEN_METADATA_PROGRAM_ID = new PublicKey("metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s");

const tokenMintAccount = new PublicKey("7PwkSDUcDU5dyqHDP7CW4RHQXabb4hyzgDbSqKGJ9ooS");

const metadataData = {
    name: "Solana UA bootcamp Vova Sol",
    symbol: "VovaSOL",
    uri: "https://somewhere.com/vova",
    sellerFeeBasisPoints: 0,
    creators: null,
    collection: null,
    uses: null
};

const [metadataPDA, _metadataBump] = PublicKey.findProgramAddressSync(
    [
        Buffer.from("metadata"),
        TOKEN_METADATA_PROGRAM_ID.toBuffer(),
        tokenMintAccount.toBuffer()
    ],
    TOKEN_METADATA_PROGRAM_ID
);

//console.log(metadataPDA);
//console.log(_metadataBump);

const transaction = new Transaction();

const createCreateMetadataAccountInstruction = createCreateMetadataAccountV3Instruction(
    {
        metadata: metadataPDA,
        mint: tokenMintAccount,
        mintAuthority: user.publicKey,
        payer: user.publicKey,
        updateAuthority: user.publicKey
    },
    {
        createMetadataAccountArgsV3: {
            collectionDetails: null,
            data: metadataData,
            isMutable: true
        }
    }
);

transaction.add(createCreateMetadataAccountInstruction);

await sendAndConfirmTransaction(connection, transaction, [user]);

// const link = getExplorerLink("address", tokenMintAccount.toString(), "devnet");

// console.log(`Look at the token mint: ${link}`);

