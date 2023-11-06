"use client";
import { useRouter } from "next/navigation";
import { user } from "@/lib/usercred";
const NewAssetsCard = ({ ele }) => {
  const router = useRouter();
  async function sellAsset() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/assets/buy-asset",
      {
        method: "POST",
        body: JSON.stringify({ ...ele, ...user }),
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }
    );
    const data = await res.json();
    if (!data.error) {
      alert("Asset Bought for " + ele.price + " Coins");
      router.refresh();
    }
  }
  return (
    <div className="bg-[#C4A46C] rounded-lg flex flex-col p-2">
      <div>Asset ID : {ele.itemID}</div>
      <div>Appreciation Interest : {parseInt(ele.interest * 100)}% </div>
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
