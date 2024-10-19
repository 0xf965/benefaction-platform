# Benefaction Platform

## Overview
Benefaction Platform is a decentralized application (DApp) that allows projects to receive funding in exchange for participation tokens. This DApp enables projects to request ERGs (the native cryptocurrency of the Ergo blockchain) in exchange for these tokens.

### How It Works
- Project owners can create a box that holds a variable amount of tokens, setting a **block limit** as a deadline.
- A minimum amount of tokens must be sold before the project can withdraw funds. This ensures that the project reaches a sufficient level of support before accessing the funds.
- If the block limit is reached before the minimum amount of tokens is sold, users have the option to exchange their tokens back for the corresponding ERGs, provided the minimum has not been reached.
- The main box is self-replicating, meaning that anyone can spend the box as long as they recreate it with the same parameters and add ERGs in exchange for a specified amount of tokens.

## Parameters of a Box
A box created by a project includes the following parameters:

- **Amount of Tokens**: Represents the number of participation tokens available.
- **Block Limit (R4)**: The block height limit until which withdrawals or refunds are allowed.
- **Minimum Tokens Sold (R5)**: A tuple representing the minimum amount of tokens that must be sold for withdrawals to be enabled, along with a counter of tokens already sold.
- **ERGs/Token (R6)**: The exchange rate between ERG and each token.
- **Withdrawal Address (R7)**: The address where the funds can be withdrawn if the conditions are met, specified as a SHA-256 hash of the proposition bytes.
- **Developer Fee (R8)**: A tuple representing the percentage fee for the developers and the address to which it will be sent, specified by its proposition bytes.
- **Project Link/Hash (R9)**: A link or hash containing information about the project (e.g., GitHub repository, website).

These parameters ensure that the box remains consistent throughout the funding process and provide transparency in the exchange process.

## Processes
The Benefaction Platform supports six main processes:

1. **Box Creation**: 
   - Allows project owners to create a box with the specified script and parameters.
   - The box represents the project's request for funds in exchange for a specific number of tokens.
   - The tokens in the box are provided by the box creator, that is, the project owner.
   
2. **Token Acquisition**: 
   - Users can exchange ERGs for tokens (at the R6 exchange rate) as long as there are tokens available, even if the deadline has passed.
   - Tokens are received in users' boxes, adhering to the token standards, making them visible and transferable through wallets like Nautilus.

3. **Token Refunds**: 
   - Users can exchange tokens back for ERGs (at the R6 exchange rate) only if the block limit has passed and the minimum number of tokens has not been sold.
   - This ensures that participants can retrieve their contributions if the funding goal isn't met.

4. **Withdraw ERGs**: 
   - Project owners are allowed to withdraw ERGs if and only if the minimum number of tokens has been sold.
   - Withdrawals can only be made to the address specified in R7.

5. **Withdraw Unsold Tokens**:
   - Project owners may withdraw unsold tokens from the contract at any time.
   - Unsold tokens can only be withdrawn to the address specified in R7.

6. **Add Tokens**:
   - Project owners may add more tokens to the contract at any time.
   - This allows for greater flexibility in case the project needs to increase the available token supply.

In addition to the current functionality, a more advanced implementation could support other assets beyond ERG. For example, projects could request **GAU** or other tokens on the Ergo blockchain. This would provide greater flexibility in the types of contributions a project can receive, enabling a broader range of funding options for projects and participants.
