import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText.jsx";
import ParallaxBackground from "../components/parallaxBackground.jsx";
import { MillenniumFalcon } from "../components/MillenniumFalcon.jsx";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense, useRef } from "react";
import Loader from "../components/Loader.jsx";



const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  
  // ===== SPACESHIP POSITION CONTROLS =====
  // Adjust these values to move the spaceship:
  // Positive X = Right, Negative X = Left
  // Positive Y = Up, Negative Y = Down
  // Positive Z = Forward, Negative Z = Back
  const spaceshipPosition = {
    mobile: [4, 0, -2],     // [X, Y, Z] for mobile - right side, middle height, pushed back
    tablet: [5, 0, -2.5],   // [X, Y, Z] for tablet - right side, middle height, pushed back
    desktop: [6, 0, -3]     // [X, Y, Z] for desktop - right side, middle height, pushed back
  };
  // =======================================
  
  return (
    <section className="w-full h-screen relative overflow-hidden" id="home">
      {/* Background Layer - Full Screen Coverage */}
      <ParallaxBackground />
      
      {/* Text Content Layer - Upper left corner positioning */}
      <div className="absolute inset-0 z-20 flex items-start pt-24 sm:pt-32 lg:pt-40">
        <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-lg lg:max-w-xl ml-6 sm:ml-12 lg:ml-20">
            <HeroText />
          </div>
        </div>
      </div>
      
      {/* 3D Spaceship Overlay - Full Screen Canvas */}
      <div className="absolute inset-0 z-10 pointer-events-none">
        <Canvas 
          camera={{ 
            position: [0, 0, 15],
            fov: isMobile ? 60 : 55,
            near: 0.1,
            far: 1000
          }}
          style={{ width: '100vw', height: '100vh' }}
          gl={{ 
            antialias: true, 
            alpha: true,
            preserveDrawingBuffer: false,
            powerPreference: "high-performance"
          }}
          dpr={[1, 2]}
        >
          <Suspense fallback={<Loader />}>
            {/* Natural lighting for scene integration */}
            <ambientLight intensity={0.4} />
            <directionalLight 
              position={[10, 8, 5]} 
              intensity={0.8} 
              castShadow
              shadow-mapSize-width={1024}
              shadow-mapSize-height={1024}
            />
            <pointLight position={[5, 5, 5]} intensity={0.3} color="#ffffff" />
            <pointLight position={[-5, -3, -3]} intensity={0.2} color="#6366f1" />
            
            <AnimatedSpaceship 
              basePosition={isMobile ? spaceshipPosition.mobile : isTablet ? spaceshipPosition.tablet : spaceshipPosition.desktop}
              scale={isMobile ? 0.8 : isTablet ? 1.0 : 1.2}
            />
            <Rig />
          </Suspense>
        </Canvas>
      </div>
    </section>
  );
};

// ===== NATURAL FLYING SPACESHIP =====
// Random variations with occasional banking
function AnimatedSpaceship({ basePosition, scale }) {
  const spaceshipRef = useRef();
  
  useFrame((state) => {
    if (spaceshipRef.current) {
      const time = state.clock.elapsedTime;
      
      // Primary horizontal movement with random variations
      const primaryMovement = Math.sin(time * 1.2) * 2.5;
      const randomVariation = Math.sin(time * 0.7) * 0.8; // Secondary random movement
      const horizontalMovement = primaryMovement + randomVariation;
      
      // Occasional vertical drift
      const verticalDrift = Math.sin(time * 0.4) * 0.3; // Gentle up/down movement
      
      // Random banking - not always tied to movement direction
      const randomBanking = Math.sin(time * 0.9) * 0.25; // Independent banking
      const movementBanking = Math.cos(time * 1.2) * 0.15; // Some movement-based banking
      const totalBanking = randomBanking + movementBanking;
      
      // Occasional pitch variations
      const pitchVariation = Math.sin(time * 0.6) * 0.1; // Subtle nose up/down
      
      // Random yaw adjustments
      const yawVariation = Math.sin(time * 0.8) * 0.08; // Slight left/right nose movement
      
      // Update position with random variations
      spaceshipRef.current.position.set(
        basePosition[0] + horizontalMovement,
        basePosition[1] + verticalDrift, // Add vertical movement
        basePosition[2]  // Keep Z fixed
      );
      
      // Natural rotation with random elements
      spaceshipRef.current.rotation.set(
        0.2 + pitchVariation,    // Pitch with variation
        2.34 + yawVariation,     // Yaw with variation
        -0.1 + totalBanking      // Banking with random + movement elements
      );
    }
  });
  
  return (
    <MillenniumFalcon
      ref={spaceshipRef}
      scale={scale}
      position={basePosition}
      rotation={[0.2, 2.34, -0.1]}
    />
  );
}

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x / 8, state.pointer.y / 8, state.camera.position.z],
      0.4,
      delta
    );
  });
}

export default Hero;