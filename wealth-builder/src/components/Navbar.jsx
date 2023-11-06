"use client";
import Image from "next/image";
import Link from "next/link";
import React from "react";

export default function Navbar({ data }) {
  if (data && data.firstLogin)
    alert(
      "First Time Login Bonus Awarded XP : " +
        data.xp +
        " Coins : " +
        data.coins
    );
  return (
    <nav className="flex justify-between items-center px-8 py-4">
      <Image src="/menu.png" width="50" height="50" />
      <Link href="/" className="font-bold text-2xl">
        WEALTH BUILDER
      </Link>
      <div className="bg-[#C4A46C] p-2 rounded-full overflow-hidden">
        <Image src="/person.png" width="50" height="50" />
      </div>
    </nav>
  );
}
