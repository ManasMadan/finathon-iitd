import React from "react";
import Navbar from "@/components/Navbar";
import Bank from "@/components/maingame/Bank";

export default function Home() {
  return (
    <div className="main">
      <Navbar />
      <Bank />
      <div className="bg-[#C4A46C] w-2/3 mx-auto mt-12 rounded-2xl h-[500px] grid place-items-center px-6">
        Various options are available to deposit funds in here, and the balance
        in this account grows daily due to the accruing interest.
      </div>
    </div>
  );
}
