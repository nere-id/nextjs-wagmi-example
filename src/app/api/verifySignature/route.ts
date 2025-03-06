import { NextResponse } from 'next/server';
import { createPublicClient, http } from 'viem';
import { blast } from 'viem/chains';

const publicClient = createPublicClient({
  chain: blast,
  transport: http('https://rpc.blast.io'),
});

async function verifySignature(
  address: string,
  message: string,
  signature: string 
): Promise<boolean> {
  try {    
    const isValid = await publicClient.verifyMessage({
      address: address as `0x${string}`,
      message,
      signature: signature as `0x${string}`,
    });
    console.log(`Signature validation result for ${address}: ${isValid}`);
    return isValid;
  } catch (error) {
    console.error('EIP-6492 Signature verification failed:', error);
    return false;
  }
}

export async function POST(request: Request) {  
  try {
    const { address, message, signature } = await request.json();
    
    if (!address || !message || !signature) {
      return NextResponse.json(
        { error: 'Missing address, message, or signature' },
        { status: 400 }
      );
    }

    const isValid = await verifySignature(address, message, signature);

    return NextResponse.json({ isValid });
  } catch (error) {
    console.error('Error in verifying signature:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}