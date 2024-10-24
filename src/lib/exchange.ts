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
import { type Project } from './project';
import { get } from 'svelte/store';
import { address, ergBalance } from './store';

// Function to submit a project to the blockchain
export async function exchange(
    project: Project,
    token_amount: number
): Promise<string|null> {
    
    console.log(project)
    console.log("wants to buy ", token_amount)

    let ergo_amount = token_amount * project.exchange_rate

    // Get the wallet address (will be the project address)
    const walletPk = await ergo.get_change_address();
    
    // Get the UTXOs from the current wallet to use as inputs
    const inputs = [project.box, ...(await ergo.get_utxos())];

    // Building the project output
    let outputs: OutputBuilder[] = [];
    const contractOutput = new OutputBuilder(
        project.value + ergo_amount,
        ergo_tree_address    // Address of the project contract
    );

    const devAddress = "0xabcdefghijklmnñoqrstuvwxyz";
    const devFeePercentage = 5;

    contractOutput.addTokens({
        tokenId: project.token_id,
        amount: (project.total_amount - token_amount).toString()
    }, {sum: true});

    // Set additional registers in the output box
    contractOutput.setAdditionalRegisters({
        R4: stringToSerialized(project.block_limit.toString()),                 // Block limit for withdrawals/refunds
        R5: SPair(
            SLong(BigInt(project.minimum_amount)), 
            SLong(BigInt(project.amount_sold))
        ),          // tuple[Minimum sold, tokens already sold] - starts with 0 sold
        R6: stringToSerialized(project.exchange_rate.toString()),               // Exchange rate ERG/Token
        R7: stringToSerialized(await sha256(walletPk)),               // Withdrawal address (hash of walletPk)
        R8: stringToSerialized(devAddress), // Developer fee tuple [percentage, address]
        R9: stringToSerialized(project.link)                            // Link or hash with project info
    });
    outputs.push(contractOutput);

    const userOutput = new OutputBuilder(
        Number(get(ergBalance)) - ergo_amount,
        get(address)
    )
    .addTokens({
        tokenId: project.token_id,
        amount: token_amount.toString()
    }, {sum: true});
    
    outputs.push(userOutput);
    

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
