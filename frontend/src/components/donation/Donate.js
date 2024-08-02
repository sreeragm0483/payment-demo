"use client";
import DonationForm from "./DonationForm";

export default function Donate() {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <h1 className="text-4xl font-bold mb-6">Donate</h1>
      <DonationForm />
    </div>
  );
}
