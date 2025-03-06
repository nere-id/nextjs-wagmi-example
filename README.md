# Blast Mobile Integration Example (Next.js + Wagmi)

This repo provides an example Blast Mobile integration for dapps using Next.js and Wagmi. See below for links to specific files where key topics are demonstrated.

## 1. Including Blast SDK

A small library must be included `<head>` of your application to give it access to Blast Mobile's injected provider.

- See [src/app/layout.tsx](src/app/layout.tsx) for an example of how to include this library in your application.

## 2. Wagmi Config & Auto-Connect

A number of configuration steps are necessary for your dapp to automatically connect with Blast Mobile's injected provider, enabling you to seamlessly use Wagmi hooks like `useAccount()` within Blast Mobile.

- See [src/app/wagmiConfig.tsx](src/app/wagmiConfig.tsx) for an example Wagmi configuration
- See [src/app/providers.tsx](src/app/providers.tsx) for an example `Providers` component to wrap your application and provide Wagmi context to child components.
- See [src/components/AutoConnectTable.tsx](src/components/AutoConnectTable.tsx) for an example of a component using the provided wagmi context to access the currentl connected account using the `useAccount()` hook.

## 3. Content Security Policy (CSP) Configuration

Within Blast Mobile, your dapp will run inside of an `iframe`. As a result, if you implement a Content Security Policy (CSP) that limits where your dapp can be run within an `iframe`, you must also configure the necessary CSP settings to allow it to run within Blast Mobile.

- See [next.config.ts](next.config.ts) for an example of how to set up such a CSP within Next.js.

## 4. Smart Contract Signing & Verification

Blast Mobile uses smart contract accounts which have different requirements for message signing and verification from standard EOAs. If your application does any signature verification, it must verify signatures using [EIP-6492](https://eips.ethereum.org/EIPS/eip-6492).

- See [src/components/SignatureVerificationForm.tsx](src/components/SignatureVerificationForm.tsx) for an example demonstrating the signing of an arbitrary message and sending a `POST` request to the back-end for verification using Wagmi.
- See [src/app/api/verifySignature/route.ts](src/app/api/verifySignature/route.ts) for back-end example of EIP-6492 signature verification with Viem.

## 5. Batching Transactions (EIP-5792)

Blast Mobile supports the batching / bundling of transactions using [EIP-5792](https://eips.ethereum.org/EIPS/eip-5792). We recommend taking advantage of this feature to improve user experience when sending commonly coupled transactions like (1) making a token approval before (2) calling a contract to deposit / transfer funds on behalf of the caller.

This can be most easily accomplished using the EIP-5792 implementations from Viem or Wagmi.

- See [src/components/BatchTransactionForm.tsx](src/components/BatchTransactionForm.tsx) for an example using Wagmi's `useSendCalls()` hook to bundle a token approval and contract call.