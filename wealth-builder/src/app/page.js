import React from "react";
import Minigames from "@/components/Minigames";
import Maingames from "@/components/Maingames";
import Navbar from "@/components/Navbar";
import { user } from "@/lib/usercred";
import { redirect } from "next/dist/server/api-utils";
import GetCard from "@/components/GetCard";

export default async function Home() {
  const res = await fetch(process.env.NEXT_PUBLIC_BACKEND + "/user/login", {
    method: "POST",
    body: JSON.stringify(user),
    headers: {
      "Content-Type": "application/json",
    },
    next: { revalidate: 0 },
  });
  const data = await res.json();
  const res2 = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/wallet/get-status",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }
  );
  const data2 = await res2.json();
  if (data.error) return <div>Something Went Wrong</div>;
  return (
    <div className="main">
      <Navbar data={data} />
      <div className="bg-[#C4A46C] w-11/12 mx-auto mt-4 rounded-2xl grid place-items-center px-6 py-4">
        <div className="text-center w-full font-bold text-xl">Wallet</div>
        <div className="flex justify-between  w-full">
          <div className="">Cash : </div>
          <div>{data2.data[0]["cash"]}</div>
        </div>
        <div className="flex justify-between w-full">
          <div>Coins : </div>
          <div>{data2.data[0]["coins"]}</div>
        </div>
      </div>
      <div className="bg-black w-full h-[2px] mt-3 mb-6"></div>
      <Minigames />
      <div className="bg-black w-full h-[2px] mt-3 mb-6"></div>
      <Maingames /> <div className="bg-black w-full h-[2px] mt-3 mb-6"></div>
      <GetCard />
    </div>
  );
}
