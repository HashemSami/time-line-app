import { FC, useRef, useEffect, useState, useCallback } from "react";

import { CanvasContainer } from "./TestGame.styles";

import { canvasCreator, BallActions } from "./ball";
let ballSpeedX = 10;
let ballSpeedY = 30;
// console.log(ballSpeed);

const TestGame: FC = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const requestRef = useRef<any>();

  const [ballX, setBallX] = useState(75);
  const [ballXSpeed, setBallXSpeed] = useState<number | 0>();

  const updateAll = useCallback((ball: BallActions) => {
    ball.WithCollideY();
    ball.WithCollideX();
    ball.moveY();
    ball.moveX();
  }, []);

  const animate = (ball: BallActions) => {
    updateAll(ball);
    requestRef.current = requestAnimationFrame(() => animate(ball));
  };

  useEffect(() => {
    // const framesPerSecond = 30;
    // const id = setInterval(() => updateAll(ball), 1000 / framesPerSecond);

    const { current } = canvasRef;
    if (!current || !requestRef.current) {
      return;
    }

    const canvasRenderer = canvasCreator(current);
    if (!canvasRenderer) {
      return;
    }
    const ball = canvasRenderer.ball(10, 100);
    ball.setSpeed(ballSpeedX, ballSpeedY);

    requestRef.current = requestAnimationFrame(() => animate(ball));

    return () => cancelAnimationFrame(requestRef.current);
  }, []);

  const updateMousePos = (event: React.MouseEvent<HTMLCanvasElement, MouseEvent>) => {
    const { current } = canvasRef;
    if (!current) {
      return;
    }
    const rect = current.getBoundingClientRect();
    const root = document.documentElement;
    const mouseX = event.clientX - rect.left - root.scrollLeft;
    // const mouseY = event.clientY -rect.top - root.scrollTop

    // paddleX = mouseX;
  };

  return <CanvasContainer onMouseMove={updateMousePos} width="800" height="600" ref={canvasRef}></CanvasContainer>;
};

export default TestGame;
