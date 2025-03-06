"use client";

import AutoconnectTable from "@/components/AutoConnectTable";
import SignatureVerificationForm from "@/components/SignatureVerificationForm";
import BatchTransactionForm from "@/components/BatchTransactionForm";

export default function Home() {
  return (
    <main className="min-h-screen flex flex-col items-center text-yellow-500 space-y-6 font-mono">
      <h1 className="text-2xl font-bold mb-10 text-black bg-yellow-500 w-full p-5 text-center">
        Next.js + WAGMI Example
      </h1>
      <div className="px-5 flex flex-col items-center space-y-6 font-mono">
        <AutoconnectTable />
        <SignatureVerificationForm />
        <BatchTransactionForm />
      </div>
    </main>
  );
}