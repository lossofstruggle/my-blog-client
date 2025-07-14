"use client";
import { useEffect, useRef } from "react";

const MeteorShower = () => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameId = useRef<number | null>(null);
  const starsRef = useRef<
    {
      x: number;
      y: number;
      size: number;
      opacity: number;
      isFlashing: boolean;
      flashIntensity: number;
      flashTimer: number;
      flashInterval: number;
      originalSize: number; // 添加原始大小
      originalOpacity: number; // 添加原始透明度
    }[]
  >([]);
  const starCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const lastTimeRef = useRef<number>(0); // 添加时间参考点

  const getRandomColor = () => {
    const hue = Math.floor(Math.random() * 360);
    return `hsl(${hue}, 100%, 80%)`;
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    starCanvasRef.current = document.createElement("canvas");
    const starCtx = starCanvasRef.current.getContext("2d");
    if (!starCtx) return;

    // 初始化星星背景
    const initStars = () => {
      starsRef.current = [];
      if (!starCanvasRef.current) return;

      // 清除并重置离屏画布
      starCanvasRef.current.width = canvas.width;
      starCanvasRef.current.height = canvas.height;

      // 绘制静态星星
      for (let i = 0; i < 150; i++) {
        const x = Math.random() * starCanvasRef.current.width;
        const y = Math.random() * starCanvasRef.current.height;
        const size = Math.random() * 1.5;
        const opacity = Math.random() * 0.8 + 0.2;

        const isFlashing = Math.random() < 0.2;
        const flashInterval = Math.random() * 3000 + 2000;

        starsRef.current.push({
          x,
          y,
          size,
          opacity,
          originalSize: size, // 保存原始大小
          originalOpacity: opacity, // 保存原始透明度
          isFlashing,
          flashIntensity: 0,
          flashTimer: 0,
          flashInterval,
        });
      }

      // 绘制初始静态星星
      drawStarsToOffscreenCanvas();
    };

    // 将星星绘制到离屏画布
    const drawStarsToOffscreenCanvas = () => {
      if (!starCanvasRef.current || !starCtx) return;

      starCtx.clearRect(
        0,
        0,
        starCanvasRef.current.width,
        starCanvasRef.current.height
      );

      starsRef.current.forEach((star) => {
        const flashSize = star.originalSize * (1 + star.flashIntensity * 0.5);
        const flashOpacity =
          star.originalOpacity * (1 + star.flashIntensity * 0.8);

        starCtx.beginPath();
        starCtx.arc(star.x, star.y, flashSize, 0, Math.PI * 2);
        starCtx.fillStyle = `rgba(255, 255, 255, ${flashOpacity})`;
        starCtx.fill();
      });
    };

    // 设置Canvas尺寸
    const setCanvasSize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      if (starCanvasRef.current) {
        starCanvasRef.current.width = canvas.width;
        starCanvasRef.current.height = canvas.height;
        initStars();
      }
    };

    setCanvasSize();
    const resizeHandler = () => {
      setCanvasSize();
    };

    window.addEventListener("resize", resizeHandler);

    // 流星类
    class Meteor {
      color: string;
      x: number = 0;
      y: number = 0;
      size: number = 0;
      speedX!: number;
      speedY: number = 0;
      opacity: number = 1;
      trailLength: number = 0;
      trail!: { x: number; y: number; opacity: number; size: number }[];
      active: boolean = true;

      constructor() {
        this.color = getRandomColor();
        this.reset();
      }

      reset() {
        if (!canvas) return;
        this.x = Math.random() * canvas.width;
        this.y = -10;
        this.size = Math.random() * 1.5 + 0.5;
        this.speedX = Math.random() * 3 + 1;
        this.speedY = Math.random() * 4 + 2;
        this.opacity = Math.random() * 0.7 + 0.3;
        this.trailLength = Math.floor(Math.random() * 30 + 20);
        this.trail = [];
        this.active = true;
      }

      update() {
        if (!this.active || !canvas) return;

        this.x += this.speedX;
        this.y += this.speedY;

        // 添加到轨迹
        this.trail.push({
          x: this.x,
          y: this.y,
          opacity: this.opacity,
          size: this.size,
        });

        // 限制轨迹长度
        if (this.trail.length > this.trailLength) {
          this.trail.shift();
        }

        // 降低不透明度
        this.opacity -= 0.008;

        // 重置条件
        if (
          this.opacity <= 0 ||
          this.y > canvas.height ||
          this.x > canvas.width
        ) {
          this.reset();
        }
      }

      draw() {
        if (!this.active || this.trail.length < 2 || !ctx) return;

        // 绘制流星轨迹
        for (let i = 1; i < this.trail.length; i++) {
          const point = this.trail[i];
          const prevPoint = this.trail[i - 1];

          const gradientOpacity = point.opacity * (i / this.trail.length);

          ctx.beginPath();
          ctx.moveTo(prevPoint.x, prevPoint.y);
          ctx.lineTo(point.x, point.y);
          ctx.strokeStyle = `${this.color.replace(
            ")",
            `, ${gradientOpacity})`
          )}`;
          ctx.lineWidth = point.size;
          ctx.lineCap = "round";
          ctx.stroke();
        }

        // 绘制流星头部
        const head = this.trail[this.trail.length - 1];
        ctx.beginPath();
        ctx.arc(head.x, head.y, this.size * 1.8, 0, Math.PI * 2);
        ctx.fillStyle = `${this.color.replace(")", `, ${this.opacity})`)}`;
        ctx.fill();
      }
    }

    // 创建流星数组
    const meteors: Meteor[] = [];
    const meteorCount = 20;

    for (let i = 0; i < meteorCount; i++) {
      meteors.push(new Meteor());
    }

    // 动画循环
    const animate = (timestamp: number) => {
      // 计算时间增量
      const deltaTime = timestamp - (lastTimeRef.current || timestamp);
      lastTimeRef.current = timestamp;

      // 清除画布
      ctx.fillStyle = "rgba(10, 10, 20, 0.2)";
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // 更新闪烁星星状态
      let starsNeedRedraw = false;
      if (starsRef.current.length > 0) {
        starsRef.current.forEach((star) => {
          if (star.isFlashing) {
            // 使用实际时间增量
            star.flashTimer += deltaTime;

            if (star.flashTimer >= star.flashInterval) {
              star.flashTimer = 0;
              star.flashIntensity = 1;
              starsNeedRedraw = true;
            }

            if (star.flashIntensity > 0) {
              const decay = (deltaTime / 16) * 0.05; // 基于时间的衰减
              star.flashIntensity = Math.max(0, star.flashIntensity - decay);
              starsNeedRedraw = true;
            }
          }
        });
      }

      // 如果需要更新星星，重绘离屏画布
      if (starsNeedRedraw) {
        drawStarsToOffscreenCanvas();
      }

      // 绘制静态星星
      if (starCanvasRef.current) {
        ctx.drawImage(starCanvasRef.current, 0, 0);
      }

      // 更新和绘制流星
      meteors.forEach((meteor) => {
        meteor.update();
        meteor.draw();
      });

      animationFrameId.current = requestAnimationFrame(animate);
    };

    // 初始化
    initStars();
    animationFrameId.current = requestAnimationFrame(animate);

    // 清理函数
    return () => {
      window.removeEventListener("resize", resizeHandler);
      if (animationFrameId.current) {
        cancelAnimationFrame(animationFrameId.current);
      }
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
        zIndex: -10,
        background: "linear-gradient(to bottom, #0c1445 0%, #1a1a2e 100%)",
      }}
    />
  );
};

export default MeteorShower;
