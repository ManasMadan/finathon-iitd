import { user } from "@/lib/usercred";
import React from "react";
import Card from "./AssetsCard";
import NewAssetsCard from "./NewAssetsCard";

export default async function Assets() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND +
      "/wealth-builder/assets/get-assets-current-worth",
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
  const res2 = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/assets/get-items",
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
  const res3 = await fetch(
    process.env.NEXT_PUBLIC_BACKEND +
      "/wealth-builder/assets/get-assets-total-worth",
    {
      method: "POST",
      body: JSON.stringify(user),
      headers: {
        "Content-Type": "application/json",
      },
      next: { revalidate: 0 },
    }
  );
  const data3 = await res3.json();
  return (
    <>
      <div className="text-center w-full font-bold text-xl mb-4">
        Assets Total Worth : {parseInt(data3.data[0]["total_current_worth"])}{" "}
        coins
      </div>
      <div className="text-center w-full font-bold text-xl">Owned Assets</div>
      <div className="grid grid-cols-2 gap-6 place-items-center mx-4 mt-4">
        {data.data.map((ele, i) => (
          <Card key={i} ele={ele} />
        ))}
      </div>
      <div className="text-center w-full font-bold text-xl mt-4">
        Buy New Assets
      </div>
      <div className="grid grid-cols-2 gap-6 place-items-center mx-4 mt-4">
        {data2.data.map((ele, i) => (
          <NewAssetsCard key={i} ele={ele} />
        ))}
      </div>
    </>
  );
}
