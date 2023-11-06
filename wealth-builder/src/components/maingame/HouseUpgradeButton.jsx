"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { user } from "@/lib/usercred";

export default function HouseUpgradeButton() {
  const router = useRouter();

  const upgradeHouse = async () => {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND +
        "/wealth-builder/house/upgrade-house-level",
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
    if (!data.error) {
      alert("House Upgraded for 500 coins");
      router.refresh();
    }
  };
  return (
    <div className="flex justify-center">
      <button
        className="bg-[#CAB48A] w-fit px-4 py-1 rounded-xl mt-6"
        onClick={upgradeHouse}
      >
        Upgrade House for 500 coins
      </button>
    </div>
  );
}
