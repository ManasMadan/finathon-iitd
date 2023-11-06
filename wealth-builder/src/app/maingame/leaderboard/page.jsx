import React from "react";
import Navbar from "@/components/Navbar";
import { user } from "@/lib/usercred";

export default async function Home() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/leaderboard/get-rank",
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
    <div className="main">
      <Navbar />
      <div className="text-center w-full font-bold text-xl">
        Your Rank is {JSON.stringify(data.data[0]["XP_Rank"])}
      </div>
      <div className="bg-[#C4A46C] w-2/3 mx-auto mt-12 rounded-2xl h-[500px] grid place-items-center">
        LEADERBOARD
      </div>
    </div>
  );
}
