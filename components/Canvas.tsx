import React, { useRef, useEffect } from "react";

const Canvas = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  let mouse = {
    x: undefined as number | undefined,
    y: undefined as number | undefined,
  };

  let maxRadius = 40;
  // let minRadius = 2;

  let colorArray = [
    "#845EC2",
    "#D65DB1",
    "#FF6F91",
    "#FF9671",
    "#FFC75F",
    "#F9F871",
  ];

  type CircleType = {
    x: number;
    y: number;
    dx: number;
    dy: number;
    radius: number;
    minRadius: number;
    color: string;
    draw: () => void;
    update: () => void;
  };

  function Circle(
    x: number,
    y: number,
    dx: number,
    dy: number,
    radius: number
  ): CircleType {
    const circle = {
      x,
      y,
      dx: dx * 0.5, // Mengurangi kecepatan pergerakan circle menjadi setengah dari nilai asli
      dy: dy * 0.5, // Mengurangi kecepatan pergerakan circle menjadi setengah dari nilai asli
      radius,
      minRadius: radius,
      color: colorArray[Math.floor(Math.random() * colorArray.length)],
      draw: function () {
        const ctx = canvasRef.current?.getContext("2d");
        if (ctx) {
          ctx.beginPath();
          ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2, false);
          ctx.fillStyle = this.color;
          ctx.fill();
        }
      },
      update: function () {
        const canvasWidth = canvasRef.current?.width ?? 0;
        const canvasHeight = canvasRef.current?.height ?? 0;

        if (this.x + this.radius > canvasWidth || this.x - this.radius < 0) {
          this.dx = -this.dx;
        }
        if (this.y + this.radius > canvasHeight || this.y - this.radius < 0) {
          this.dy = -this.dy;
        }

        this.x += this.dx;
        this.y += this.dy;

        // interactivity
        if (
          mouse.x &&
          mouse.y &&
          mouse.x - this.x < 50 &&
          mouse.x - this.x > -50 &&
          mouse.y - this.y < 50 &&
          mouse.y - this.y > -50
        ) {
          if (this.radius < maxRadius) {
            this.radius += 1;
          }
        } else if (this.radius > this.minRadius) {
          this.radius -= 1;
        }

        this.draw();
      },
    };
    return circle;
  }

  let circleArray: CircleType[] = [];
  function init() {
    circleArray = [];
    for (let i = 0; i < 300; i++) {
      let radius = Math.random() * 3 + 1;
      let canvasWidth = canvasRef.current?.width ?? 0;
      let canvasHeight = canvasRef.current?.height ?? 0;
      let x = Math.random() * (canvasWidth - radius * 2) + radius;
      let y = Math.random() * (canvasHeight - radius * 2) + radius;
      let dx = Math.random() - 0.5; // Mengurangi kecepatan pergerakan circle
      let dy = Math.random() - 0.5; // Mengurangi kecepatan pergerakan circle

      circleArray.push(Circle(x, y, dx, dy, radius));
    }
  }

  function animate() {
    requestAnimationFrame(animate);
    const ctx = canvasRef.current?.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "black"; // Mengatur warna latar belakang canvas menjadi hitam
      ctx.fillRect(
        0,
        0,
        canvasRef.current?.width ?? 0,
        canvasRef.current?.height ?? 0
      ); // Mengisi latar belakang canvas dengan warna yang telah ditetapkan

      for (let i = 0; i < circleArray.length; i++) {
        circleArray[i].update();
      }
    }
  }

  useEffect(() => {
    const setCanvasSize = () => {
      const canvas = canvasRef.current;
      if (canvas) {
        canvas.width = window.innerWidth;
        canvas.height = window.innerHeight;
      }
    };

    window.addEventListener("mousemove", function (event) {
      mouse.x = event.x;
      mouse.y = event.y;
    });

    window.addEventListener("resize", setCanvasSize);

    setCanvasSize();
    init();
    animate();

    return () => {
      window.removeEventListener("resize", setCanvasSize);
    };
  }, []);
  return <canvas ref={canvasRef} />;
};

export default Canvas;
