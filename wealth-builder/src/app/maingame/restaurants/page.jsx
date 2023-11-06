import React from "react";
import Navbar from "@/components/Navbar";
import { user } from "@/lib/usercred";
import NewFoodCard from "@/components/maingame/FoodCard";

export default async function Home() {
  const res = await fetch(
    process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/food/get-food-list",
    {
      method: "POST",
      body: JSON.stringify({ ...user, category: "restaurants" }),
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
      <div className="text-center w-full font-bold text-xl">Grocery</div>
      <div className="grid grid-cols-2 gap-6 place-items-center mx-4 mt-4">
        {data.data.map((ele, i) => (
          <NewFoodCard key={i} ele={ele} />
        ))}
      </div>
    </div>
  );
}
