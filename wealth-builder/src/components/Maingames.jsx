import React from "react";
import Card from "./Card";
const cards = [
  { image: "/images/maingames/bank.png", to: "/maingame/bank", size: 75 },
  {
    image: "/images/maingames/library.png",
    to: "/maingame/library",
    size: 75,
  },
  { image: "/images/maingames/house1.png", to: "/maingame/house", size: 75 },
  { image: "/images/maingames/store.png", to: "/maingame/grocery", size: 75 },
  {
    image: "/images/maingames/coffee.png",
    to: "/maingame/coffee-store",
    size: 75,
  },
  {
    image: "/images/maingames/restaurant.png",
    to: "/maingame/restaurants",
    size: 75,
  },
  {
    image: "/images/maingames/sedan.png",
    to: "/maingame/vehicle",
    size: 75,
  },
  { image: "/images/maingames/asset.png", to: "/maingame/assets", size: 75 },
  {
    image: "/images/maingames/leaderboard.png",
    to: "/maingame/leaderboard",
    size: 75,
  },
];
export default function Maingames() {
  return (
    <div>
      <div className="grid grid-cols-3 gap-6 place-items-center">
        {cards.map((card) => (
          <Card
            key={card.to}
            image={card.image}
            size={card.size}
            to={card.to}
          />
        ))}
      </div>
      <span className="flex justify-center font-bold mt-4 text-xl">
        Earn and Grow
      </span>
    </div>
  );
}
