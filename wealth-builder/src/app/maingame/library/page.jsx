import React from "react";
import Navbar from "@/components/Navbar";

export default function Home() {
  return (
    <div className="main">
      <Navbar />
      <div className="flex gap-2 justify-center font-bold text-xl">
        Links to Some Financial Resources
      </div>
    </div>
  );
}
