import { Canvas, useFrame } from "@react-three/fiber";
import HeroText from "../components/HeroText.jsx";
import ParallaxBackground from "../components/parallaxBackground.jsx";
import { Astronaut } from "../components/Astronaut.jsx";
import { Float } from "@react-three/drei";
import { useMediaQuery } from "react-responsive";
import { easing } from "maath";
import { Suspense } from "react";
import Loader from "../components/Loader.jsx";

const Hero = () => {
  const isMobile = useMediaQuery({ maxWidth: 768 });
  const isTablet = useMediaQuery({ maxWidth: 1024 });
  
  return (
    <section className="w-full min-h-screen relative overflow-hidden" id="home">
      {/* Background Layer - Full Width */}
      <ParallaxBackground />
      
      {/* Text Layer */}
      <div className="relative z-20 flex items-start justify-center md:items-start md:justify-start min-h-screen px-5 sm:px-10 lg:px-16">
        <HeroText />
      </div>
      
      {/* 3D Canvas Layer - Full Width */}
      <figure className="absolute inset-0 z-10 w-full h-full">
        <Canvas 
          camera={{ 
            position: [0, 0, 5],
            fov: isMobile ? 75 : 60,
            near: 0.1,
            far: 1000
          }}
          style={{ width: '100%', height: '100%' }}
        >
          <Suspense fallback={<Loader />}>
            <Float
              speed={1.5}
              rotationIntensity={0.5}
              floatIntensity={0.5}
            >
              <Astronaut
                scale={isMobile ? 0.8 : isTablet ? 1.2 : 1.5}
                position={
                  isMobile 
                    ? [0, -1, 0] 
                    : isTablet 
                    ? [2, -0.5, 0] 
                    : [3, 0, 0]
                }
              />
            </Float>
            <Rig />
          </Suspense>
        </Canvas>
      </figure>
    </section>
  );
};

function Rig() {
  return useFrame((state, delta) => {
    easing.damp3(
      state.camera.position,
      [state.pointer.x / 10, 1 + state.pointer.y / 10, state.camera.position.z],
      0.5,
      delta
    );
  });
}

export default Hero;
