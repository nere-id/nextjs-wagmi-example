"use client";

import { useAccount, useReadContracts, useWriteContract } from "wagmi";
import { senderAbi, tokenAbi } from "../../constants/abi";
import { encodeFunctionData, formatEther, parseEther } from "viem";
import { useSendCalls } from "wagmi/experimental";
import { BLERST_ADDRESS, BLERST_SENDER_ADDRESS } from "../../constants";

export default function BatchTransactionForm() {
  const { address } = useAccount();

  const blerstContract =  {
    address: BLERST_ADDRESS,
    abi: tokenAbi
  } as const

  const {data: blerstBalances, refetch} = useReadContracts({
    contracts: [
      {
        ...blerstContract,
        functionName: 'balanceOf',
        args: [address]
      },
      {
        ...blerstContract,
        functionName: 'balanceOf',
        args: [BLERST_SENDER_ADDRESS]
      }
    ]
  });

  const myBlerstBalance: bigint = blerstBalances ? blerstBalances[0].result as bigint : 0n;
  const senderBlerstBalance: bigint = blerstBalances ? blerstBalances[1].result as bigint : 0n;
  
  const { writeContract: mintTokens,  isPending: isMintPending } = useWriteContract({
    mutation: {
      onSuccess: () => refetch()
    } 
  });

  const handleMint = async () => {        
    try {
      await mintTokens({        
        abi: tokenAbi,
        address: BLERST_ADDRESS,
        functionName: "mint",
        args: [        
          address,
          parseEther("1"),
        ],        
      });      
    } catch (error) {
      console.error("Mint BLERST error:", error);
    }
  };

  const { isPending: isBundlePending, sendCalls } = useSendCalls({
    mutation: {
      onSuccess: () => refetch()
    } 
  });
  
  const handleApproveAndSend = async () => {    
    try {
      await sendCalls({
        calls: [
          {
            to: BLERST_ADDRESS,
            data: encodeFunctionData({
              abi: tokenAbi,
              functionName: 'approve',
              args: [BLERST_SENDER_ADDRESS, parseEther("1")]
            })
          },
          {
            to: BLERST_SENDER_ADDRESS,
            data: encodeFunctionData({
              abi: senderAbi,
              functionName: 'send',
              args: [parseEther("1")]
            })
          }          
        ]
      });
    } catch (error) {
      console.error("Batch transaction error:", error);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="flex items-center text-xl font-bold mb-2">
        Batch Transactions
        { ( isMintPending || isBundlePending )  && 
          <div className="ml-2 animate-spin h-5 w-5 border-4 border-t-transparent border-yellow-500 rounded-full"></div>
        }
      </h2>
      <p className="text-sm mb-3 text-yellow-600">
        Batch transactions, e.g. ERC20 approve and send, via eip-5792 with wagmi's `useSendCalls`.
      </p>
      <div className="border border-yellow-500 rounded-lg p-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="pr-4">
                My $BLERST: {myBlerstBalance ? formatEther(myBlerstBalance) : 0}
              </td>              
              <td className="pr-4">
                Recipient $BLERST: {senderBlerstBalance ? formatEther(senderBlerstBalance) : 0} </td>              
            </tr>
            <tr>
              <td colSpan={2} className="pt-4">
                <button
                  onClick={handleMint}
                  className="bg-yellow-500 text-black py-2 px-4 rounded w-full mb-2"
                  disabled={isMintPending}
                >
                  {isMintPending ? "Minting..." : "Mint 1 $BLERST"}
                </button>
              </td>
            </tr>
            { myBlerstBalance > 0 && 
              <tr>
                <td colSpan={2}>
                  <button
                    onClick={handleApproveAndSend}
                    className="bg-yellow-500 text-black py-2 px-4 rounded w-full"
                    disabled={isBundlePending}
                  >                    
                  {isBundlePending ? "Sending Batch..." : "Approve & Send 1 $BLERST" }
                  </button>                
                </td>
              </tr>
            }
          </tbody>
        </table>
      </div>
    </div>
  );
}