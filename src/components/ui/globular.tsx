import { useEffect, useRef } from "react";
import * as THREE from "three";

interface GlobularProps {
  className?: string;
}

const Globular: React.FC<GlobularProps> = ({ 
  className = "",
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const sceneRef = useRef<THREE.Scene | null>(null);
  const pointsRef = useRef<THREE.Points | null>(null);
  const animationRef = useRef<number | null>(null);

  useEffect(() => {
    // Check if we already have a scene initialized
    if (sceneRef.current || !containerRef.current) return;

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
      antialias: true 
    });

    renderer.setSize(
      containerRef.current.clientWidth,
      containerRef.current.clientHeight
    );
    containerRef.current.appendChild(renderer.domElement);

    // Create a sphere with random dots
    const createRandomGlobularSphere = () => {
      // Define the sphere parameters
      const radius = 3;
      const numPoints = 600;
      const positions: number[] = [];
      const colors: number[] = [];
      
      // Create points only on the surface of the sphere
      for (let i = 0; i < numPoints; i++) {
        // Generate random spherical coordinates
        const phi = Math.random() * Math.PI * 2; // 0 to 2π
        const theta = Math.random() * Math.PI; // 0 to π
        
        // Use fixed radius for surface points with tiny variation for natural look
        const surfaceRadius = radius * (0.98 + Math.random() * 0.04); // 98% to 102% of radius
        
        // Convert to Cartesian coordinates
        const x = surfaceRadius * Math.sin(theta) * Math.cos(phi);
        const y = surfaceRadius * Math.sin(theta) * Math.sin(phi);
        const z = surfaceRadius * Math.cos(theta);
        
        positions.push(x, y, z);
        
        // Calculate normalized position for color gradient
        // Map from spherical to 0-1 range
        const nx = (x / radius + 1) / 2;
        const ny = (y / radius + 1) / 2;
        const nz = (z / radius + 1) / 2;
        
        // Create gradient colors based on position with some randomness
        const r = 0.2 + 0.6 * nx + (Math.random() * 0.1 - 0.05);
        const g = 0.8 - 0.6 * ny + (Math.random() * 0.1 - 0.05);
        const b = 0.5 + 0.5 * nz + (Math.random() * 0.1 - 0.05);
        
        colors.push(r, g, b);
      }
      
      // Create the geometry from the positions
      const geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.Float32BufferAttribute(positions, 3));
      geometry.setAttribute('color', new THREE.Float32BufferAttribute(colors, 3));
      
      // Create material for the dots - slightly larger to compensate for fewer dots
      const material = new THREE.PointsMaterial({
        size: 0.16,
        vertexColors: true, // Use the colors we defined
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
        map: createCircleTexture()
      });
      
      // Create the points object
      const points = new THREE.Points(geometry, material);
      pointsRef.current = points;
      
      return points;
    };

    // Add this function to create a circular texture for the points
    const createCircleTexture = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 64;
      canvas.height = 64;
      
      const context = canvas.getContext('2d');
      if (!context) return null;
      
      // Draw a circle with soft edges
      const gradient = context.createRadialGradient(32, 32, 0, 32, 32, 32);
      gradient.addColorStop(0, 'rgba(255, 255, 255, 1)');
      gradient.addColorStop(0.8, 'rgba(255, 255, 255, 0.8)');
      gradient.addColorStop(1, 'rgba(255, 255, 255, 0)');
      
      context.fillStyle = gradient;
      context.beginPath();
      context.arc(32, 32, 32, 0, Math.PI * 2);
      context.fill();
      
      // Create texture from canvas
      const texture = new THREE.CanvasTexture(canvas);
      texture.needsUpdate = true;
      
      return texture;
    };

    // Add the globular sphere to the scene
    const globularSphere = createRandomGlobularSphere();
    // Position the sphere higher in the scene
    globularSphere.position.y = 2.8; // Move it up by 1.5 units
    scene.add(globularSphere);

    // Position camera
    camera.position.z = 8;
    // Adjust camera position to look slightly upward
    camera.position.y = 0.5;
    camera.lookAt(new THREE.Vector3(0, 1, 0)); // Look at a point above the origin

    // Animation loop
    const animate = () => {
      animationRef.current = requestAnimationFrame(animate);

      if (pointsRef.current) {
        pointsRef.current.rotation.x += 0.001;
        pointsRef.current.rotation.y += 0.002;
      }

      renderer.render(scene, camera);
    };

    animate();

    // Handle window resize
    const handleResize = () => {
      if (!containerRef.current) return;
      
      const width = containerRef.current.clientWidth;
      const height = containerRef.current.clientHeight;
      
      camera.aspect = width / height;
      camera.updateProjectionMatrix();
      
      renderer.setSize(width, height);
    };

    window.addEventListener('resize', handleResize);

    // Cleanup
    return () => {
      window.removeEventListener('resize', handleResize);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
      
      if (containerRef.current && renderer.domElement) {
        containerRef.current.removeChild(renderer.domElement);
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

  return (
    <div 
      ref={containerRef}
      className={`absolute inset-0 z-0 ${className}`}
    />
  );
};

export default Globular;