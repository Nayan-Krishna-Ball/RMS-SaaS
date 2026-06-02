"use client";

import { useEffect, useState } from "react";

const colors = ["#f59e0b", "#ffc174", "#dae2fd", "#3d4756"];

function createConfettiArray(count = 40) {
  return Array.from({ length: count }).map(() => ({
    size: Math.random() * 8 + 4,
    left: Math.random() * 100,
    duration: Math.random() * 3 + 2,
    delay: Math.random() * 2,
    color: colors[Math.floor(Math.random() * colors.length)],
    borderRadius: Math.random() > 0.5 ? "50%" : "2px",
  }));
}

export default function Confetti() {
  const [confetti, setConfetti] = useState<any[]>([]);

  useEffect(() => {
    setConfetti(createConfettiArray(40));
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-[999]">
      {confetti.map((c, i) => (
        <div
          key={i}
          className="absolute top-[-10px] animate-fall"
          style={{
            width: c.size,
            height: c.size,
            left: `${c.left}%`,
            backgroundColor: c.color,
            borderRadius: c.borderRadius,
            animationDuration: `${c.duration}s`,
            animationDelay: `${c.delay}s`,
          }}
        />
      ))}
    </div>
  );
}
