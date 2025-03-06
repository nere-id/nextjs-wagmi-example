"use client";

import { shortenAddress } from "@/utils";
import { useAccount } from "wagmi";

export default function AutoconnectTable() {
  const { address, isConnected } = useAccount();

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-bold mb-2 text-left">Auto Connect</h2>
      <p className="text-sm mb-3 text-yellow-600">
        Auto connect to the injected Blast Mobile wallet with wagmi's `useAccount` hook.
      </p>
      <div className="border border-yellow-500 rounded-lg p-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="pr-4">Connected?:</td>
              <td>{isConnected ? "✅" : "❌"}</td>
            </tr>
            <tr>
              <td className="pr-4">Account:</td>
              <td>{address ? shortenAddress(address) : "🚫"}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}