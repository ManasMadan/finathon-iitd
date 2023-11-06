import React from "react";
import Card from "./Card";

const cards = [
  { image: "/images/minigames/quiz.png", to: "/minigame/quiz", size: 128 },

  {
    image: "/images/minigames/memory_cards.png",
    to: "/minigame/memory-cards",
    size: 128,
  },
  { image: "/images/minigames/atari.png", to: "/minigame/atari", size: 128 },
];

export default function Minigames() {
  return (
    <div>
      <div className="grid grid-cols-3 place-items-center mt-10 gap-6">
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
        Mini Games
      </span>
    </div>
  );
}
