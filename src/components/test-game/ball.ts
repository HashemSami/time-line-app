interface Ball {
  ball: (xPos: number, yPos: number) => BallActions;
  paddle: (xPos: number) => PaddleActions;
}

export interface BallActions {
  moveX: () => number;
  moveY: () => number;
  setSpeed: (speedInputX: number, speedInputY: number) => void;
  WithCollideX: () => void;
  WithCollideY: () => void;
}

export interface PaddleActions {
  moveX: () => number;
  moveY: () => number;
  setSpeed: (speedInputX: number, speedInputY: number) => void;
  WithCollideX: () => void;
  WithCollideY: () => void;
}

const ballState = () => {
  let xPosition = 0;
  let yPosition = 0;
  let speedX = 0;
  let speedY = 0;

  const getState = () => {
    return { xPosition, yPosition, speedX, speedY };
  };

  const setXpos = (val: number) => {
    xPosition = val;
    return xPosition;
  };
  const setYpos = (val: number) => {
    yPosition = val;
    return yPosition;
  };
  const setSpeedX = (val: number) => {
    speedX = val;
    return speedX;
  };

  const setSpeedY = (val: number) => {
    speedY = val;
    return speedY;
  };

  return {
    getState,
    setXpos,
    setYpos,
    setSpeedX,
    setSpeedY,
  };
};

const pddleState = () => {
  let xPosition = 0;
  let yPosition = 0;
  let speedX = 0;
  let speedY = 0;

  const getPState = () => {
    return { xPosition, yPosition, speedX, speedY };
  };

  const setPXpos = (val: number) => {
    xPosition = val;
    return xPosition;
  };
  const setPYpos = (val: number) => {
    yPosition = val;
    return yPosition;
  };
  const setPSpeedX = (val: number) => {
    speedX = val;
    return speedX;
  };

  const setPSpeedY = (val: number) => {
    speedY = val;
    return speedY;
  };

  return {
    getPState,
    setPXpos,
    setPYpos,
    setPSpeedX,
    setPSpeedY,
  };
};

const ballObject = ballState();
const paddleObject = pddleState();

console.log(ballObject);

const moveX = (drawBall: (x: number, y: number) => void, clearCanvas: () => void): (() => number) => {
  return (): number => {
    const { xPosition, yPosition, speedX } = ballObject.getState();

    const n = ballObject.setXpos(xPosition + speedX);
    // clearCanvas();
    drawBall(n, yPosition);

    return n;
  };
};

const moveY = (drawBall: (x: number, y: number) => void, clearCanvas: () => void): (() => number) => {
  return (): number => {
    const { xPosition, yPosition, speedY } = ballObject.getState();

    const y = ballObject.setYpos(yPosition + speedY);
    // clearCanvas();
    drawBall(xPosition, y);

    return y;
  };
};

const setSpeed = (speedInputX: number, speedInputY: number) => {
  ballObject.setSpeedX(speedInputX);
  ballObject.setSpeedY(speedInputY);
};

const WithCollideX = (width: number): (() => void) => {
  return () => {
    const { xPosition, speedX } = ballObject.getState();

    if (xPosition > width) {
      ballObject.setSpeedX(speedX * -1);
    }
    if (xPosition < 0) {
      ballObject.setSpeedX(speedX * -1);
    }
  };
};

const WithCollideY = (height: number): (() => void) => {
  return () => {
    const { yPosition, speedY } = ballObject.getState();

    if (yPosition > height) {
      ballObject.setSpeedY(speedY * -1);
    }
    if (yPosition < 0) {
      ballObject.setSpeedY(speedY * -1);
    }
  };
};

const drawBall = (ctx: CanvasRenderingContext2D, width: number, height: number): ((x: number, y: number) => void) => {
  return (xPosition: number = 0, yPosition: number = 0) => {
    ctx.fillStyle = "black";
    ctx.fillRect(0, 0, width, height);

    ctx.fillStyle = "red";
    ctx.beginPath();
    ctx.arc(xPosition, yPosition, 50, 0, Math.PI * 2, true);
    ctx.fill();
  };
};

const clearCanvas = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  return () => {
    ctx.clearRect(0, 0, width, height);
  };
};

export const ball = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  return (xPos: number, yPos: number) => {
    ballObject.setXpos(xPos);
    ballObject.setYpos(yPos);

    const { xPosition, yPosition } = ballObject.getState();

    drawBall(ctx, width, height)(xPosition, yPosition);

    return {
      moveX: moveX(drawBall(ctx, width, height), clearCanvas(ctx, width, height)),
      moveY: moveY(drawBall(ctx, width, height), clearCanvas(ctx, width, height)),
      setSpeed,
      WithCollideX: WithCollideX(width),
      WithCollideY: WithCollideY(height),
    };
  };
};
// ============================================================================

const paddle = (ctx: CanvasRenderingContext2D, width: number, height: number) => {
  return (xPos: number) => {
    paddleObject.setPXpos(xPos);

    const { xPosition, yPosition } = ballObject.getState();

    return {
      moveX: moveX(drawBall(ctx, width, height), clearCanvas(ctx, width, height)),
      moveY: moveY(drawBall(ctx, width, height), clearCanvas(ctx, width, height)),
      setSpeed,
      WithCollideX: WithCollideX(width),
      WithCollideY: WithCollideY(height),
    };
  };
};

export const canvasCreator = (canvas: HTMLCanvasElement): Ball | null => {
  const ctx = canvas.getContext("2d");
  const width = canvas.width;
  const height = canvas.height;

  if (!ctx) {
    return null;
  }

  return {
    ball: ball(ctx, width, height),
    paddle: paddle(ctx, width, height),
  };
};
