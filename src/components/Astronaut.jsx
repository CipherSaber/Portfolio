import React, { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Millennium Falcon GLB Model Component
function MillenniumFalconModel(props) {
  const group = useRef();
  const gltf = useGLTF("/models/millennium_falcon.glb");

  // Realistic flying animation with responsive positioning
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      
      // Get the base position from props, or use defaults
      const baseX = props.position?.[0] || 0;
      const baseY = props.position?.[1] || 0;
      
      // Gentle movement around the base position
      group.current.position.x = baseX + Math.sin(time * 0.5) * 0.3;
      group.current.position.y = baseY + Math.sin(time * 0.3) * 0.2;
      
      // Realistic banking and pitch movements
      group.current.rotation.z = Math.sin(time * 0.6) * 0.08 + Math.cos(time * 1.1) * 0.03;
      group.current.rotation.x = Math.sin(time * 0.4) * 0.04;
      group.current.rotation.y = Math.sin(time * 0.3) * 0.06;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Enhanced lighting for GLB model */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[10, 10, 5]} intensity={1.5} />
      <pointLight position={[5, 5, 5]} intensity={1.2} color="#ffffff" />
      <spotLight 
        position={[0, 10, 0]} 
        angle={0.3} 
        penumbra={1} 
        intensity={1} 
        castShadow 
      />
      
      {/* Render the GLB model */}
      <primitive 
        object={gltf.scene} 
        scale={props.scale || 1}
        position={[0, 0, 0]}
      />
    </group>
  );
}

// Fallback component in case GLB fails to load
function FallbackSpaceship(props) {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      
      const baseX = props.position?.[0] || 0;
      const baseY = props.position?.[1] || 0;
      
      group.current.position.x = baseX + Math.sin(time * 0.5) * 0.3;
      group.current.position.y = baseY + Math.sin(time * 0.3) * 0.2;
      
      group.current.rotation.z = Math.sin(time * 0.6) * 0.08;
      group.current.rotation.x = Math.sin(time * 0.4) * 0.04;
      group.current.rotation.y = Math.sin(time * 0.3) * 0.06;
    }
  });

  return (
    <group ref={group} {...props}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      
      {/* Simple Millennium Falcon shape as fallback */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.8, 1.2, 0.4, 6]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      <mesh position={[0.8, 0.15, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#D0D0D0" />
      </mesh>
    </group>
  );
}

// Main export component
export function Astronaut(props) {
  return (
    <Suspense fallback={<FallbackSpaceship {...props} />}>
      <MillenniumFalconModel {...props} />
    </Suspense>
  );
}

// Preload the GLB model
useGLTF.preload("/models/millennium_falcon.glb");