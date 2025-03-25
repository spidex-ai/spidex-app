import BoxShadowPlan from "@/assets/images/box-shadow-plan.png";
import PlanBg from "@/assets/images/plan-bg.png";
import Shadow from "@/assets/images/shadow.png";
import { useEffect, useRef } from "react";
import * as THREE from "three";
import {
  Bell,
  Checked,
  Contribute,
  Earn,
  Explore,
  Publish,
  Usage,
} from "../../../assets";
import { motion } from "framer-motion";
import {useScreen} from "@/hooks/useScreen";

const MotionDiv = motion.div as any;
const MotionP = motion.p as any;

const fadeInUp = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 1.5,
      ease: "easeOut",
    },
  },
};

const PlanSection = () => {
  const mountRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const { isMobile } = useScreen();
  console.log(isMobile);

  useEffect(() => {
    // Check if we already have a scene initialized
    if (sceneRef.current || !mountRef.current) return;

    // Set up scene
    const scene = new THREE.Scene();
    sceneRef.current = scene;

    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
    const renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
    });

    // Make the renderer 20% smaller
    const containerWidth = mountRef.current.clientWidth;
    const containerHeight = mountRef.current.clientHeight;
    const scaleFactor = 0.8; // 80% of original size (20% smaller)

    renderer.setSize(
      containerWidth * scaleFactor,
      containerHeight * scaleFactor
    );

    // Center the smaller canvas in the container
    renderer.domElement.style.position = "absolute";
    renderer.domElement.style.left = "50%";
    renderer.domElement.style.top = "50%";
    renderer.domElement.style.transform = "translate(-50%, -50%)";

    mountRef.current.appendChild(renderer.domElement);

    // Create a cube made of dots
    const createDottedCube = () => {
      // Define the size of the cube - make it 20% smaller
      const size = 1.5 * 0.8; // 80% of original size
      const dotsPerDimension = 15; // Keep same density of dots
      const positions: number[] = [];
      const colors: number[] = [];

      // Create dots throughout the entire cube volume
      const step = (size * 2) / (dotsPerDimension - 1);

      for (let i = 0; i < dotsPerDimension; i++) {
        for (let j = 0; j < dotsPerDimension; j++) {
          for (let k = 0; k < dotsPerDimension; k++) {
            const x = -size + i * step;
            const y = -size + j * step;
            const z = -size + k * step;

            positions.push(x, y, z);

            // Calculate normalized position (0 to 1) for each axis
            const nx = i / (dotsPerDimension - 1);
            const ny = j / (dotsPerDimension - 1);
            const nz = k / (dotsPerDimension - 1);

            // Create gradient colors based on position
            // This creates a cyan-to-purple gradient
            const r = 0.2 + 0.6 * nx; // Red increases with x
            const g = 0.8 - 0.6 * ny; // Green decreases with y
            const b = 0.5 + 0.5 * nz; // Blue increases with z

            colors.push(r, g, b);
          }
        }
      }

      // Create the geometry from the positions
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute(
        "position",
        new THREE.Float32BufferAttribute(positions, 3)
      );
      geometry.setAttribute(
        "color",
        new THREE.Float32BufferAttribute(colors, 3)
      );

      // Create material for the dots
      const material = new THREE.PointsMaterial({
        size: 0.06,
        vertexColors: true, // Use the colors we defined
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        map: createCircleTexture(),
      });

      // Create the points object
      const points = new THREE.Points(geometry, material);
      pointsRef.current = points;

      return points;
    };

    // Add this function to create a circular texture for the points
    const createCircleTexture = () => {
      const canvas = document.createElement("canvas");
      canvas.width = 64;
      canvas.height = 64;

      const context = canvas.getContext("2d");
      if (!context) return null;

      // Draw a circle
      context.beginPath();
      context.arc(32, 32, 30, 0, Math.PI * 2);
      context.closePath();

      // Fill with white
      context.fillStyle = "#ffffff";
      context.fill();

      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;

      return texture;
    };

    // Add the dotted cube to the scene
    const dottedCube = createDottedCube();
    scene.add(dottedCube);

    // Position camera
    camera.position.z = 5;

    // Animation loop
    let animationFrameId: number;

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (pointsRef.current) {
        pointsRef.current.rotation.x += 0.005;
        pointsRef.current.rotation.y += 0.005;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!mountRef.current) return;

      const width = mountRef.current.clientWidth * scaleFactor;
      const height = mountRef.current.clientHeight * scaleFactor;

      camera.aspect = width / height;
      camera.updateProjectionMatrix();

      renderer.setSize(width, height);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup
    return () => {
      window.removeEventListener("resize", handleResize);
      cancelAnimationFrame(animationFrameId);

      if (mountRef.current && renderer.domElement) {
        mountRef.current.removeChild(renderer.domElement);
      }

      if (pointsRef.current) {
        const geometry = pointsRef.current.geometry;
        const material = pointsRef.current.material as THREE.PointsMaterial;

        geometry.dispose();
        material.dispose();
        scene.remove(pointsRef.current);
      }

      renderer.dispose();
      sceneRef.current = null;
      pointsRef.current = null;
    };
  }, []);
  const featureItems = [
    {
      icon: <Publish />,
      text: "Publish your Agents",
      description:
        "List your AI Agents on CAI Marketplace. Share solutions with the world and earn exclusive incentives",
      position: "top-0 left-20",
    },
    {
      icon: <Explore />,
      text: "Explore & Acquire",
      description:
        "Explore AI-driven solutions and Integrate them into your daily lives",
      position: "top-0 right-20",
      revert: true,
    },
    {
      icon: <Earn />,
      text: "Monetize",
      description:
        "Active monetization to earn profits from sharing powerful AI Agents",
      position: "bottom-0 left-20",
    },
    {
      icon: <Contribute />,
      text: "Contribute",
      description:
        "The more Agents, the stronger the Ecosystem. Boost growth to benefit from CAI",
      position: "bottom-0 right-20",
      revert: true,
    },
  ];

  return (
    <section className="min-h-[100vh] flex bg-background-black py-20 relative overflow-hidden">
      <div
        className="absolute inset-0 z-0 -top-40"
        style={{
          backgroundImage: `url(${PlanBg})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div
        className="absolute inset-0 z-0 -top-30"
        style={{
          backgroundImage: `url(${BoxShadowPlan})`,
          backgroundSize: "contain",
          backgroundRepeat: "no-repeat",
        }}
      />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="text-center relative flex flex-col gap-10">
          <MotionP
            className="lg:text-[64px] md:text-[48px] sm:text-[32px] text-[32px] mx-auto max-w-[850px] pt-20"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            Explore and Monetize AI Agents with Marketplace
          </MotionP>

          <div className="relative min-h-[530px] w-full">
            <div
              className="hidden absolute inset-0 z-2 lg:block md:hidden sm:hidden"
              ref={mountRef}
            />
            {featureItems.map((item, index) => (
              <div key={index}>
                <div
                  className={`absolute hidden lg:block md:hidden sm:hidden z-1 ${item.position} flex gap-2 p-6 w-full lg:w-[450px] md:w-[450px] sm:w-full h-[244px] flex-col justify-between`}
                  style={{
                    backgroundImage: `url(${Shadow})`,
                    backgroundSize: "cover",
                    transform: item.revert ? "scaleX(-1)" : "none",
                  }}
                />
                <MotionDiv
                  className={`lg:absolute md:relative sm:relative z-1 ${isMobile ? "" : item.position} flex gap-2 p-6 w-[450px] h-[244px] flex-col justify-between`}
                  variants={fadeInUp}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true }}
                >
                  <div className={`flex gap-12 max-w-[340px] ${item.revert && !isMobile ? "pl-20" : ""}`}>
                    {item.icon}
                    <span className="text-white text-2xl text-left">
                      {item.text}
                    </span>
                  </div>
                  <span className={`text-text-dark text-lg text-left ${item.revert && !isMobile ? "pl-20 max-w-[344px]" : "max-w-[244px]"}`}>
                    {item.description}
                  </span>
                </MotionDiv>
              </div>
            ))}
          </div>

          <MotionDiv
            className="text-center flex flex-col gap-12 max-w-[720px] mx-auto mt-15"
            variants={fadeInUp}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            <p className="text-text-dark text-2xl">
              The CAI Marketplace is a decentralized hub where AI developers can
              launch, share, and profit from their AI creations.
            </p>
          </MotionDiv>

          <div className="flex gap-15 items-center justify-between my-6 sm:flex-col md:flex-row sm:gap-4">
            <MotionDiv
              className="flex gap-2 items-center justify-center md:border-r-2 sm:border-r-0 border-white border-solid grow pr-4 relative after:absolute md:after:block sm:after:hidden after:inset-y-0 after:right-0 after:w-0.5 after:bg-white after:shadow-[0_0_10px_2px_rgba(255,255,255,0.7),0_0_20px_5px_rgba(255,255,255,0.5)]"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Checked />
              <span className="text-white text-2xl">One-time purchase</span>
            </MotionDiv>
            <MotionDiv
              className="flex gap-2 items-center justify-center border-r-2 border-white border-solid grow pr-4 relative after:absolute md:after:block sm:after:hidden after:inset-y-0 after:right-0 after:w-0.5 after:bg-white after:shadow-[0_0_10px_2px_rgba(255,255,255,0.7),0_0_20px_5px_rgba(255,255,255,0.5)]"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Bell />
              <span className="text-white text-2xl">Subscription plans</span>
            </MotionDiv>
            <MotionDiv
              className="flex gap-2 items-center justify-center grow"
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
            >
              <Usage />
              <span className="text-white text-2xl">Usage-based fees</span>
            </MotionDiv>
          </div>
        </div>
      </div>
    </section>
  );
};

export default PlanSection;
