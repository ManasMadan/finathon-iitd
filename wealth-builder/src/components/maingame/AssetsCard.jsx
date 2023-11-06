"use client";
import { formatDateToYYYYMMDD } from "@/lib/utils";
import { useRouter } from "next/navigation";

const Card = ({ ele }) => {
  const router = useRouter();
  async function sellAsset() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/assets/sell-asset",
      {
        method: "POST",
        body: JSON.stringify(ele),
        headers: {
          "Content-Type": "application/json",
        },
        next: { revalidate: 0 },
      }
    );
    const data = await res.json();
    if (!data.error) {
      alert("Asset Sold for " + ele.current_price);
      router.refresh();
    }
  }
  return (
    <div className="bg-[#C4A46C] rounded-lg flex flex-col p-2">
      <div>Asset ID : {ele.itemID}</div>
      <div>
        Purchased On : {formatDateToYYYYMMDD(new Date(ele.purchasedOn))}
      </div>
      <button
        onClick={sellAsset}
        className="bg-[#CAB48A] w-fit mx-auto mt-2 px-4 py-1 rounded-xl"
      >
        Sell Now for {parseInt(ele.current_price)}
      </button>
    </div>
  );
};
export default Card;
