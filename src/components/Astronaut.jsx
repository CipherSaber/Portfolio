import React, { useRef } from "react";
import { useFrame } from "@react-three/fiber";

// Millennium Falcon spaceship component
function MillenniumFalconSpaceship(props) {
  const group = useRef();
  
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
    <group ref={group} {...props}>
      {/* Lighting */}
      <ambientLight intensity={0.8} />
      <directionalLight position={[5, 5, 5]} intensity={1.2} />
      <pointLight position={[2, 2, 2]} intensity={1.0} color="#ffffff" />
      
      {/* Main body - Millennium Falcon style */}
      <mesh rotation={[0, 0, Math.PI / 2]}>
        <cylinderGeometry args={[0.8, 1.2, 0.4, 6]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      
      {/* Central disc */}
      <mesh>
        <cylinderGeometry args={[0.6, 0.6, 0.2, 16]} />
        <meshStandardMaterial color="#FFFFFF" />
      </mesh>
      
      {/* Cockpit - offset to the right like Millennium Falcon */}
      <mesh position={[0.8, 0.15, 0]}>
        <sphereGeometry args={[0.3]} />
        <meshStandardMaterial color="#D0D0D0" />
      </mesh>
      
      {/* Cockpit window */}
      <mesh position={[0.9, 0.2, 0]}>
        <sphereGeometry args={[0.15]} />
        <meshStandardMaterial color="#87CEEB" />
      </mesh>
      
      {/* Forward mandibles - characteristic Millennium Falcon shape */}
      <mesh position={[-0.6, 0, 0.6]} rotation={[0, 0, 0.2]}>
        <boxGeometry args={[1.2, 0.3, 0.25]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      <mesh position={[-0.6, 0, -0.6]} rotation={[0, 0, -0.2]}>
        <boxGeometry args={[1.2, 0.3, 0.25]} />
        <meshStandardMaterial color="#F0F0F0" />
      </mesh>
      
      {/* Mandible tips */}
      <mesh position={[-1.1, 0, 0.7]}>
        <boxGeometry args={[0.3, 0.2, 0.15]} />
        <meshStandardMaterial color="#E0E0E0" />
      </mesh>
      <mesh position={[-1.1, 0, -0.7]}>
        <boxGeometry args={[0.3, 0.2, 0.15]} />
        <meshStandardMaterial color="#E0E0E0" />
      </mesh>
      
      {/* Rear engines */}
      <mesh position={[0.8, 0, 0]}>
        <cylinderGeometry args={[0.1, 0.15, 0.4]} />
        <meshStandardMaterial color="#4169E1" />
      </mesh>
      
      {/* Engine glow effects */}
      <mesh position={[1.0, 0, 0]}>
        <cylinderGeometry args={[0.05, 0.1, 0.2]} />
        <meshStandardMaterial color="#00BFFF" emissive="#00BFFF" emissiveIntensity={0.5} />
      </mesh>
      
      {/* Detail ring */}
      <mesh position={[0, 0, 0]}>
        <torusGeometry args={[0.9, 0.02, 8, 16]} />
        <meshStandardMaterial color="#CCCCCC" />
      </mesh>
      
      {/* Laser cannons */}
      <mesh position={[-0.8, 0.2, 0.4]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
      <mesh position={[-0.8, 0.2, -0.4]}>
        <cylinderGeometry args={[0.03, 0.03, 0.3]} />
        <meshStandardMaterial color="#666666" />
      </mesh>
    </group>
  );
}

// Main export component
export function Astronaut(props) {
  return <MillenniumFalconSpaceship {...props} />;
}