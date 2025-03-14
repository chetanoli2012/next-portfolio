"use client";

import { useEffect, useState } from "react";
import confetti from "canvas-confetti";

export default function Confetti() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);

  useEffect(() => {
    // Only trigger confetti on first load
    if (isFirstLoad) {
      const duration = 3 * 1000; // 3 seconds
      const animationEnd = Date.now() + duration;
      const defaults = { startVelocity: 30, spread: 360, ticks: 60, zIndex: 0 };

      const randomInRange = (min: number, max: number) => {
        return Math.random() * (max - min) + min;
      };

      const interval = setInterval(() => {
        const timeLeft = animationEnd - Date.now();

        if (timeLeft <= 0) {
          clearInterval(interval);
          setIsFirstLoad(false);
          return;
        }

        const particleCount = 50 * (timeLeft / duration);

        // Launch confetti from both sides
        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.1, 0.3), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });

        confetti({
          ...defaults,
          particleCount,
          origin: { x: randomInRange(0.7, 0.9), y: Math.random() - 0.2 },
          colors: [
            "#ff0000",
            "#00ff00",
            "#0000ff",
            "#ffff00",
            "#ff00ff",
            "#00ffff",
          ],
        });
      }, 250);

      // Cleanup function
      return () => {
        clearInterval(interval);
      };
    }
  }, [isFirstLoad]);

  // This component doesn't render anything visible
  return null;
}
