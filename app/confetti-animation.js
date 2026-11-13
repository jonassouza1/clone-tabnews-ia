"use client";

import { useEffect, useState } from "react";
import Confetti from "react-confetti";

export default function ConfettiAnimation() {
  const [dimensions, setDimensions] = useState({ width: 0, height: 0 });

  useEffect(() => {
    function updateDimensions() {
      setDimensions({ width: window.innerWidth, height: window.innerHeight });
    }

    updateDimensions();
    window.addEventListener("resize", updateDimensions);
    return () => window.removeEventListener("resize", updateDimensions);
  }, []);

  return (
    <div className="confetti-layer" aria-hidden="true">
      <Confetti
        width={dimensions.width}
        height={dimensions.height}
        numberOfPieces={100}
        frameRate={30}
        recycle={false}
      />
    </div>
  );
}
