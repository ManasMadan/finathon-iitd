"use client";
import { useRouter } from "next/navigation";
import { user } from "@/lib/usercred";
const NewAssetsCard = ({ ele }) => {
  const router = useRouter();
  async function sellAsset() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/vehicles/buy-vehicle",
      {
        method: "POST",
        body: JSON.stringify({ ...user, ...ele }),
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }
    );
    const data = await res.json();

    if (!data.error) {
      alert("Vehicles Bought for " + ele.price + " Coins");
      router.refresh();
    }
  }
  return (
    <div className="bg-[#C4A46C] rounded-lg flex flex-col p-2 w-full">
      <div>Vehicle ID : {ele.id}</div>
      <div>Depreciation : {parseInt(ele.depreciation * 100)}% </div>
      <button
        onClick={sellAsset}
        className="bg-[#CAB48A] w-fit mx-auto mt-2 px-4 py-1 rounded-xl"
      >
        Buy Now for {ele.price}
      </button>
    </div>
  );
};
export default NewAssetsCard;
