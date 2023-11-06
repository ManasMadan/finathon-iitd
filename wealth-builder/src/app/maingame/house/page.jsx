import React from "react";
import Navbar from "@/components/Navbar";
import { user } from "@/lib/usercred";
import HouseUpgradeButton from "@/components/maingame/HouseUpgradeButton";

export default async function Home() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/house/get-status",
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
      <div className="flex gap-2 justify-center font-bold text-xl">
        House Level : {JSON.stringify(data.data[0]["house"])}
      </div>
      <HouseUpgradeButton />
    </div>
  );
}
