"use client";
import { useState } from "react";
import { createCheckoutSession } from "../../api";

export default function DonationForm() {
  const [amount, setAmount] = useState(0);

  const handleDonate = async () => {
    const response = await createCheckoutSession(amount);
    console.log(response);
    if (response.success && response.data.url) {
      window.location.href = response.data.url;
    } else {
      console.error("Failed to get the URL:", response.error);
    }
  };

  return (
    <div className="flex flex-col items-center">
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        placeholder="Enter amount"
        className="mb-4 p-2 border border-gray-300 rounded"
      />
      <button
        onClick={handleDonate}
        className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
      >
        Donate
      </button>
    </div>
  );
}
