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
    <section className="hero-container" id="home">
      {/* Background Layer - Full Width */}
      <ParallaxBackground />
      
      {/* Text Layer */}
      <div className="hero-text-container flex items-start justify-center md:items-start md:justify-start min-h-screen">
        <HeroText />
      </div>
      
      {/* 3D Canvas Layer - Full Width */}
      <figure className="spaceship-canvas">
        <Canvas 
          camera={{ 
            position: [0, 1, 3],
            fov: isMobile ? 60 : 50
          }}
        >
          <Suspense fallback={<Loader />}>
            <Float>
              <Astronaut
                scale={isMobile ? 0.4 : isTablet ? 0.6 : 0.8}
                position={
                  isMobile 
                    ? [0, -0.5, 0] 
                    : isTablet 
                    ? [1.0, 0, 0] 
                    : [1.5, 0.2, 0]
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
      [state.mouse.x / 10, 1 + state.mouse.y / 10, state.camera.position.z],
      0.5,
      delta
    );
  });
}

export default Hero;
