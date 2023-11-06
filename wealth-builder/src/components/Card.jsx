import React from "react";
import Image from "next/image";
import Link from "next/link";

export default function Card({ image, to, size }) {
  return (
    <Link
      href={to}
      className="w-[100px] bg-[#C4A46C] rounded-2xl flex justify-center items-center aspect-square"
    >
      <Image src={image} width={size} height={size} />
    </Link>
  );
}
