"use client";

import { useState } from "react";
import { useAccount, useSignMessage } from "wagmi";

export default function SignatureVerificationForm() {
  const { address } = useAccount();
  const [verificationStatus, setVerificationStatus] = useState<boolean | null>(null);
  const [loading, setLoading] = useState(false);
  const { signMessageAsync } = useSignMessage();

  const handleSignAndVerify = async () => {
    if (!address) {
      setVerificationStatus(false);
      return;
    }
    setLoading(true);
    try {
      const message = "I 💛 Blast Mobile";
      const signature = await signMessageAsync({ message });
      const response = await fetch("/api/verifySignature", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ address, message, signature }),
      });
      const data = await response.json();
      setVerificationStatus(response.ok ? data.isValid : false);
    } catch (error: any) {
      console.error("Error during sign and verify:", error);
      setVerificationStatus(false);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-xl font-bold mb-2">Signature Verification</h2>
      <p className="text-sm mb-3 text-yellow-600">
        Sign a message using the connected Blast Mobile account and POST it to the back-end for verification.
      </p>
      <div className="border border-yellow-500 rounded-lg p-4">
        <table className="w-full">
          <tbody>
            <tr>
              <td className="pr-4">
                <button
                  onClick={handleSignAndVerify}
                  className="bg-yellow-500 text-black py-2 px-4 rounded"
                >
                  Sign and Verify
                </button>
              </td>
              <td className="text-center text-yellow-700">
                {loading ? (
                  <div className="flex justify-center">
                    <div className="animate-spin h-5 w-5 border-4 border-t-transparent border-yellow-500 rounded-full"></div>
                  </div>
                ) : verificationStatus === null ? (
                  "← Click to test"
                ) : verificationStatus ? (
                  "✅ Signature Verified"
                ) : (
                  "❌"
                )}
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}