import React from "react";
import Navbar from "@/components/Navbar";
import Vehicles from "@/components/maingame/Vehicles";

export default function Home() {
  return (
    <div className="main">
      <Navbar />
      <Vehicles />
    </div>
  );
}
