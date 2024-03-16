import React, { useRef, useEffect } from "react";

interface Coordinate {
  x: number;
  y: number;
}

const Canvas: React.FC<{ coordinates: Coordinate[] }> = ({ coordinates }) => {
  const canvasRef = useRef<HTMLCanvasElement | any>(null);

  useEffect(() => {
    const ctx = canvasRef.current?.getContext("2d");

    if (ctx && coordinates?.length > 0) {
      ctx.clearRect(0, 0, canvasRef.current.width, canvasRef.current.height); // Clear canvas on each render

      ctx.strokeStyle = "blue"; // Set stroke style (color) for lines
      ctx.lineWidth = 2; // Set line width

      // Draw lines connecting coordinates
      for (let i = 0; i < coordinates.length - 1; i++) {
        const start: Coordinate = coordinates[i];
        const end: Coordinate = coordinates[i + 1];
        ctx.beginPath();
        ctx.moveTo(start.x, start.y);
        ctx.lineTo(end.x, end.y);
        ctx.stroke();
      }

      // Draw circles at each coordinate (optional)
      ctx.fillStyle = "red"; // Set fill style (color) for circles
      for (const coord of coordinates) {
        ctx.beginPath();
        ctx.arc(coord.x, coord.y, 5, 0, 2 * Math.PI); // Circle radius is 5
        ctx.fill();
      }
    }
  }, [coordinates]);

  return <canvas ref={canvasRef} width={600} height={400} />;
};

export default Canvas;
