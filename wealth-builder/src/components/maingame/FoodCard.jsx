"use client";
import { useRouter } from "next/navigation";
import { user } from "@/lib/usercred";
const NewFoodCard = ({ ele }) => {
  const router = useRouter();
  async function sellAsset() {
    const res = await fetch(
      process.env.NEXT_PUBLIC_BACKEND + "/wealth-builder/food/buy-food",
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
      alert(
        "Food Bought for " + ele.price + " Coins" + "\n" + "XP gained " + ele.xp
      );
      router.refresh();
    }
  }
  return (
    <div className="bg-[#C4A46C] rounded-lg flex flex-col p-2 w-full">
      <div>Name : {ele.name}</div>
      <div>XP : {parseInt(ele.xp)} XP</div>

      <button
        onClick={sellAsset}
        className="bg-[#CAB48A] w-fit mx-auto mt-2 px-4 py-1 rounded-xl"
      >
        Buy Now for {ele.price}
      </button>
    </div>
  );
};
export default NewFoodCard;
