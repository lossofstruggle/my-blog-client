import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "@three-ts/orbit-controls";

interface ThreeCanvasProps {
  className?: string;
}

export default function ThreeCanvas({ className }: ThreeCanvasProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const cameraRef = useRef<THREE.PerspectiveCamera | null>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const controlsRef = useRef<OrbitControls | null>(null);
  const particlesRef = useRef<THREE.Points | null>(null);
  const animationFrameId = useRef<number>(0);
  const particleGeometryRef = useRef<THREE.BufferGeometry | null>(null);

  const PARTICLE_COUNT = 1500;
  const PARTICLE_SIZE = 0.05;
  const PARTICLE_COLOR = 0x4287f5;
  const AUTO_ROTATE_SPEED = 0.5;

  useEffect(() => {
    // 初始化场景
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    camera.position.z = 5;
    cameraRef.current = camera;

    // 创建粒子系统
    const positions = new Float32Array(PARTICLE_COUNT * 3);
    for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
      positions[i] = (Math.random() - 0.5) * 10;
      positions[i + 1] = (Math.random() - 0.5) * 10;
      positions[i + 2] = (Math.random() - 0.5) * 10;
    }

    const particleGeometry = new THREE.BufferGeometry();
    particleGeometry.setAttribute(
      "position",
      new THREE.BufferAttribute(positions, 3)
    );
    particleGeometryRef.current = particleGeometry;

    const particleMaterial = new THREE.PointsMaterial({
      size: PARTICLE_SIZE,
      color: PARTICLE_COLOR,
      transparent: true,
      opacity: 0.8,
      sizeAttenuation: true,
    });

    const particles = new THREE.Points(particleGeometry, particleMaterial);
    particlesRef.current = particles;
    scene.add(particles);

    // 添加光源
    const ambientLight = new THREE.AmbientLight(0x222222);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.5);
    directionalLight.position.set(1, 1, 1);
    scene.add(directionalLight);

    // 初始化渲染器
    if (!containerRef.current) return;

    const renderer = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    containerRef.current.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    // 添加控制器
    const controls = new OrbitControls(camera, renderer.domElement);
    controls.enableZoom = false;
    controls.enablePan = false;
    controls.autoRotate = true;
    controls.autoRotateSpeed = AUTO_ROTATE_SPEED;
    controlsRef.current = controls;

    // 处理窗口大小变化
    const handleResize = () => {
      if (!cameraRef.current || !rendererRef.current) return;

      cameraRef.current.aspect = window.innerWidth / window.innerHeight;
      cameraRef.current.updateProjectionMatrix();
      rendererRef.current.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener("resize", handleResize);

    // 动画循环
    const animate = () => {
      animationFrameId.current = requestAnimationFrame(animate);

      if (
        !particleGeometryRef.current ||
        !controlsRef.current ||
        !sceneRef.current ||
        !cameraRef.current ||
        !rendererRef.current
      )
        return;

      // 高效更新粒子位置
      const positions = particleGeometryRef.current.attributes.position.array;
      const time = performance.now() * 0.001;

      for (let i = 0; i < PARTICLE_COUNT * 3; i += 3) {
        positions[i + 1] += Math.sin(positions[i] * 5 + time) * 0.005;

        // 重置超出范围的粒子
        if (positions[i + 1] > 5) positions[i + 1] = -5;
      }

      particleGeometryRef.current.attributes.position.needsUpdate = true;
      controlsRef.current.update();
      rendererRef.current.render(sceneRef.current, cameraRef.current);
    };

    animate();

    // 清理函数
    return () => {
      cancelAnimationFrame(animationFrameId.current);
      window.removeEventListener("resize", handleResize);

      if (containerRef.current && rendererRef.current?.domElement) {
        const container = containerRef.current;
        container.removeChild(rendererRef.current.domElement);
      }

      // 释放资源
      const disposeResources = () => {
        if (particleGeometryRef.current) particleGeometryRef.current.dispose();
        if (particlesRef.current?.material) {
          const material = particlesRef.current.material as THREE.Material;
          material.dispose();
        }
        if (rendererRef.current) rendererRef.current.dispose();
        if (controlsRef.current) controlsRef.current.dispose();

        sceneRef.current?.traverse((child) => {
          if (child instanceof THREE.Mesh) {
            child.geometry?.dispose();
            if (Array.isArray(child.material)) {
              child.material.forEach((mat) => mat.dispose());
            } else {
              child.material?.dispose();
            }
          }
        });
      };

      disposeResources();

      // 清空引用
      sceneRef.current = null;
      cameraRef.current = null;
      rendererRef.current = null;
      controlsRef.current = null;
      particlesRef.current = null;
      particleGeometryRef.current = null;
    };
  }, []);

  return (
    <div
      ref={containerRef}
      className={className}
      style={{
        width: "100%",
        height: "100vh",
        position: "relative",
        overflow: "hidden",
      }}
    />
  );
}
