import { FC, useRef, useEffect, useState, useCallback } from "react";

import { CanvasContainer } from "./TestGame.styles";

const TestGame: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  const [ballX, setBallX] = useState(75);

  const updateAll = useCallback(
    (current: HTMLCanvasElement) => {
      setBallX((ballX) => ballX + 5);
      console.log(ballX);
      const ctx = current.getContext("2d");

      if (!ctx) {
        return;
      }

      ctx.fillStyle = "black";
      ctx.fillRect(0, 0, current.width, current.height);

      ctx.fillStyle = "red";
      ctx.beginPath();
      ctx.arc(ballX, 100, 50, 0, Math.PI * 2, true);
      ctx.fill();
    },
    [ballX]
  );

  useEffect(() => {
    const { current } = canvasRef;
    if (!current) {
      return;
    }
    const framesPerSecond = 30;
    const id = setInterval(() => updateAll(current), 1000 / framesPerSecond);
    console.log(current);

    return () => clearInterval(id);
  }, [updateAll]);

  // const updateAll = (current: HTMLCanvasElement) => {
  //   setBallX((ballX) => ballX++);
  //   const ctx = current.getContext("2d");

  //   if (!ctx) {
  //     return;
  //   }

  //   ctx.fillStyle = "black";
  //   ctx.fillRect(0, 0, current.width, current.height);

  //   ctx.fillStyle = "red";
  //   ctx.beginPath();
  //   ctx.arc(ballX, 100, 50, 0, Math.PI * 2, true);
  //   ctx.fill();
  // };

  return (
    <CanvasContainer width="800" height="600" ref={canvasRef}></CanvasContainer>
  );
};

export default TestGame;
