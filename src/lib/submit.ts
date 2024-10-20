import {
    OutputBuilder,
    SAFE_MIN_BOX_VALUE,
    RECOMMENDED_MIN_FEE_VALUE,
    TransactionBuilder,
    SConstant,
    SLong,
    SColl,
    SByte
} from '@fleet-sdk/core';
import { SPair } from '@fleet-sdk/serializer';

import { ergo_tree_address } from './envs';
import { stringToSerialized } from './utils';
import { sha256 } from './sha256';

// Function to submit a project to the blockchain
export async function submit_project(
    token_id: string | null, 
    token_amount: number | null,
    blockLimit: number,     // Block height until withdrawal/refund is allowed
    exchangeRate: number,   // Exchange rate ERG/Token
    projectLink: string,    // Link or hash containing project information
    minimumSold: number     // Minimum amount sold to allow withdrawal
): Promise<string|null> {
    
    console.log(token_id, token_amount)

    // Get the wallet address (will be the project address)
    const walletPk = await ergo.get_change_address();
    
    // Get the UTXOs from the current wallet to use as inputs
    const inputs = await ergo.get_utxos();

    // Building the project output
    let outputs: OutputBuilder[] = [];
    const projectOutput = new OutputBuilder(
        SAFE_MIN_BOX_VALUE, // Minimum value in ERG that a box can have
        ergo_tree_address    // Address of the project contract
    );


    if (token_id === null || token_amount === null) {
        // Minting a new token since tokenId is always null
        projectOutput.mintToken({
            amount: "1000000000" // Amount of tokens being minted
        });
    } else {
        projectOutput.addTokens({
            tokenId: token_id,
            amount: token_amount.toString()
          }, {sum: false})
    }

    const devAddress = "0xabcdefghijklmnñoqrstuvwxyz"
    const devFeePercentage = 5

    /*  https://discord.com/channels/668903786361651200/669989266478202917/1297529728504303647    Don't work, Nautilus wallet dont allow to sign.

    R5: SConstant(SPair(
            SLong(BigInt(minimumSold)), 
            SLong(BigInt(0))
        )),          // tuple[Minimum sold, tokens already sold] - starts with 0 sold


    */

    // Set additional registers in the output box
    projectOutput.setAdditionalRegisters({
        R4: stringToSerialized(blockLimit.toString()),                 // Block limit for withdrawals/refunds
        R5: stringToSerialized(minimumSold.toString()),          // tuple[Minimum sold, tokens already sold] - starts with 0 sold
        R6: stringToSerialized(exchangeRate.toString()),               // Exchange rate ERG/Token
        R7: stringToSerialized(await sha256(walletPk)),               // Withdrawal address (hash of walletPk)
        R8: stringToSerialized(devAddress), // Developer fee tuple [percentage, address]
        R9: stringToSerialized(projectLink)                            // Link or hash with project info
    });

    // Add the project box to the outputs list
    outputs.push(projectOutput);

    // Building the unsigned transaction
    const unsignedTransaction = await new TransactionBuilder(await ergo.get_current_height())
        .from(inputs)                          // Inputs coming from the user's UTXOs
        .to(outputs)                           // Outputs (the new project box)
        .sendChangeTo(walletPk)                // Send change back to the wallet
        .payFee(RECOMMENDED_MIN_FEE_VALUE)     // Pay the recommended minimum fee
        .build()                               // Build the transaction
        .toEIP12Object();                      // Convert the transaction to an EIP-12 compatible object

    // Sign the transaction
    const signedTransaction = await ergo.sign_tx(unsignedTransaction);

    // Send the transaction to the Ergo network
    const transactionId = await ergo.submit_tx(signedTransaction);

    console.log("Transaction id -> ", transactionId);
    return transactionId;
}
