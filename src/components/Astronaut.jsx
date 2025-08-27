import React, { useRef, Suspense } from "react";
import { useFrame } from "@react-three/fiber";
import { useGLTF } from "@react-three/drei";

// Millennium Falcon GLB Model Component
function MillenniumFalconModel(props) {
  const group = useRef();
  const { nodes, materials } = useGLTF("/models/millennium_falcon.glb");

  // Realistic flying animation
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      
      // Complex left-right movement with varying speed
      group.current.position.x = 1.3 + 
        Math.sin(time * 0.7) * 0.4 + 
        Math.sin(time * 1.3) * 0.15;
      
      // Vertical hovering in middle of screen
      group.current.position.y = 0.2 + 
        Math.sin(time * 0.5) * 0.25 + 
        Math.cos(time * 0.9) * 0.1;
      
      // Realistic banking and pitch movements
      group.current.rotation.z = Math.sin(time * 0.6) * 0.08 + Math.cos(time * 1.1) * 0.03;
      group.current.rotation.x = Math.sin(time * 0.4) * 0.04;
      group.current.rotation.y = Math.sin(time * 0.3) * 0.06;
    }
  });

  return (
    <group ref={group} {...props} dispose={null}>
      {/* Add lighting for the model */}
      <ambientLight intensity={0.6} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      <pointLight position={[2, 2, 2]} intensity={0.8} color="#ffffff" />
      
      {/* Render all meshes from the GLB model */}
      {Object.entries(nodes).map(([key, node]) => {
        if (node.isMesh) {
          return (
            <mesh
              key={key}
              geometry={node.geometry}
              material={materials[node.material?.name] || node.material}
              position={node.position}
              rotation={node.rotation}
              scale={node.scale}
            />
          );
        }
        return null;
      })}
    </group>
  );
}

// Fallback component in case GLB fails to load
function FallbackSpaceship(props) {
  const group = useRef();
  
  useFrame((state) => {
    if (group.current) {
      const time = state.clock.elapsedTime;
      
      group.current.position.x = 1.3 + 
        Math.sin(time * 0.7) * 0.4 + 
        Math.sin(time * 1.3) * 0.15;
      
      group.current.position.y = 0.2 + 
        Math.sin(time * 0.5) * 0.25 + 
        Math.cos(time * 0.9) * 0.1;
      
      group.current.rotation.z = Math.sin(time * 0.6) * 0.08 + Math.cos(time * 1.1) * 0.03;
      group.current.rotation.x = Math.sin(time * 0.4) * 0.04;
      group.current.rotation.y = Math.sin(time * 0.3) * 0.06;
    }
  });

  return (
    <group ref={group} {...props} scale={0.5} position={[1.3, 0.2, 0]}>
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.0} />
      
      {/* Simple Millennium Falcon shape */}
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

// Preload the model
useGLTF.preload("/models/millennium_falcon.glb");