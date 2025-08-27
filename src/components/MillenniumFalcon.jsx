import { useGLTF } from "@react-three/drei";
import { useRef, useState } from "react";
import { useFrame } from "@react-three/fiber";
import * as THREE from "three";

export function MillenniumFalcon({ scale = 1, position = [0, 0, 0], rotation = [0, 0, 0], ...props }) {
  const { scene } = useGLTF("/models/millennium_falcon.glb");
  const meshRef = useRef();
  const engineGlowRef = useRef();
  const laserRef = useRef();
  const [laserVisible, setLaserVisible] = useState(false);

  // Enhanced flying and firing animations
  useFrame((state) => {
    if (meshRef.current) {
      const time = state.clock.elapsedTime;
      
      // Flying motion - subtle banking and movement
      meshRef.current.rotation.y = rotation[1] + Math.sin(time * 0.4) * 0.08;
      meshRef.current.rotation.x = rotation[0] + Math.sin(time * 0.3) * 0.05;
      meshRef.current.rotation.z = rotation[2] + Math.sin(time * 0.5) * 0.03;
      
      // Subtle position drift for flying effect
      meshRef.current.position.x = position[0] + Math.sin(time * 0.2) * 0.1;
      meshRef.current.position.y = position[1] + Math.cos(time * 0.15) * 0.08;
    }

    // Engine glow animation
    if (engineGlowRef.current) {
      engineGlowRef.current.material.opacity = 0.6 + Math.sin(state.clock.elapsedTime * 8) * 0.3;
    }

    // Laser firing animation - random intervals
    if (Math.random() < 0.005) { // 0.5% chance per frame
      setLaserVisible(true);
      setTimeout(() => setLaserVisible(false), 150); // Laser visible for 150ms
    }

    // Laser beam animation
    if (laserRef.current && laserVisible) {
      laserRef.current.material.opacity = Math.random() * 0.8 + 0.2;
    }
  });

  // Clone the scene to avoid modifying the original
  const clonedScene = scene.clone();
  
  // Ensure materials are properly applied
  clonedScene.traverse((child) => {
    if (child.isMesh) {
      child.castShadow = true;
      child.receiveShadow = true;
      if (child.material) {
        child.material.needsUpdate = true;
      }
    }
  });

  return (
    <group ref={meshRef} {...props} dispose={null} scale={scale} position={position}>
      <primitive object={clonedScene} />
      
      {/* Engine Glow Effects */}
      <mesh ref={engineGlowRef} position={[0, 0, -2]}>
        <sphereGeometry args={[0.3, 8, 8]} />
        <meshBasicMaterial 
          color="#00aaff" 
          transparent 
          opacity={0.6}
          emissive="#0088cc"
        />
      </mesh>
      
      <mesh position={[0.5, 0, -2]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial 
          color="#00aaff" 
          transparent 
          opacity={0.4}
          emissive="#0088cc"
        />
      </mesh>
      
      <mesh position={[-0.5, 0, -2]}>
        <sphereGeometry args={[0.2, 8, 8]} />
        <meshBasicMaterial 
          color="#00aaff" 
          transparent 
          opacity={0.4}
          emissive="#0088cc"
        />
      </mesh>

      {/* Laser Beam Effect */}
      {laserVisible && (
        <mesh ref={laserRef} position={[0, 0, 5]} rotation={[0, 0, Math.PI / 2]}>
          <cylinderGeometry args={[0.02, 0.02, 8, 8]} />
          <meshBasicMaterial 
            color="#ff0000" 
            transparent 
            opacity={0.8}
            emissive="#ff0000"
          />
        </mesh>
      )}
    </group>
  );
}

useGLTF.preload("/models/millennium_falcon.glb");