import { user } from "@/lib/usercred";
import React from "react";
import Card from "./AssetsCard";
import NewAssetsCard from "./NewAssetsCard";

export default async function Assets() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/bank/get-status",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }
  );
  const data = await res.json();

  return (
    <>
      <div className="ml-12 gap-4 flex flex-col w-full font-bold text-xl mb-4">
        <div>Savings : {JSON.stringify(data.data[0]["savings"])}</div>
        <div>Loan Bank : {JSON.stringify(data.data[0]["loan_bank"])}</div>
        <div>Loan Person : {JSON.stringify(data.data[0]["loan_person"])}</div>
        <div>FD : {JSON.stringify(data.data[0]["fd"])}</div>
        <div>Mutual Funds : {JSON.stringify(data.data[0]["mutual"])}</div>
      </div>
      {/* <div className="flex gap-2 justify-center font-bold text-xl">
        Add Savings
        <input className="bg-[#C4A46C] rounded-md" type="number" />
        <button onClick={}></button>
      </div> */}
    </>
  );
}
