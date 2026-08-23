"use client";

import React, { useRef, useEffect } from "react";
import { Canvas, useThree, useFrame } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei";
import * as THREE from "three";
import Stall3DModel from "./Stall3DModel";
import { BoothConfigState } from "./BoothConfigurator";

// Type definitions for OrbitControls from Drei
import type { OrbitControls as OrbitControlsImpl } from "three-stdlib";

interface Booth3DCanvasProps {
  config: BoothConfigState;
  preset: "perspective" | "front" | "top";
}

// ----------------------------------------------------
// Smooth Camera Preset Controller
// Animates camera position and controls target when preset changes
// ----------------------------------------------------
const CameraPresetController = ({
  preset,
  controlsRef,
  config,
}: {
  preset: "perspective" | "front" | "top";
  controlsRef: React.RefObject<OrbitControlsImpl | null>;
  config: BoothConfigState;
}) => {
  const { camera } = useThree();

  // Convert feet width/depth to meters for scaling camera distance
  const wM = config.width * 0.3048;
  const dM = config.depth * 0.3048;
  const maxDim = Math.max(wM, dM);

  useFrame(() => {
    const controls = controlsRef.current;
    if (!controls) return;

    let targetX = maxDim * 1.3;
    let targetY = maxDim * 1.1;
    let targetZ = maxDim * 1.3;

    let lookX = 0;
    let lookY = config.height * 0.3048 * 0.4;
    let lookZ = 0;

    if (preset === "front") {
      targetX = 0;
      targetY = config.height * 0.3048 * 0.5;
      targetZ = maxDim * 1.5;
      lookX = 0;
      lookY = config.height * 0.3048 * 0.5;
      lookZ = 0;
    } else if (preset === "top") {
      targetX = 0;
      targetY = maxDim * 2.0;
      targetZ = 0.001; // Tiny offset to prevent camera flip flipping at 90deg top view
      lookX = 0;
      lookY = 0;
      lookZ = 0;
    }

    // Smoothly interpolate (lerp) camera position
    camera.position.x = THREE.MathUtils.lerp(camera.position.x, targetX, 0.08);
    camera.position.y = THREE.MathUtils.lerp(camera.position.y, targetY, 0.08);
    camera.position.z = THREE.MathUtils.lerp(camera.position.z, targetZ, 0.08);

    // Smoothly interpolate (lerp) OrbitControls target point
    controls.target.x = THREE.MathUtils.lerp(controls.target.x, lookX, 0.08);
    controls.target.y = THREE.MathUtils.lerp(controls.target.y, lookY, 0.08);
    controls.target.z = THREE.MathUtils.lerp(controls.target.z, lookZ, 0.08);

    controls.update();
  });

  return null;
};

// ----------------------------------------------------
// Main 3D Canvas Container
// ----------------------------------------------------
export default function Booth3DCanvas({ config, preset }: Booth3DCanvasProps) {
  const controlsRef = useRef<OrbitControlsImpl>(null);

  return (
    <div className="w-full h-full relative touch-none" style={{ minHeight: "320px" }}>
      <Canvas
        shadows
        gl={{ preserveDrawingBuffer: true, antialias: true }}
        camera={{ position: [8, 7, 8], fov: 45 }}
        className="w-full h-full"
      >
        {/* Studio Lighting */}
        <ambientLight intensity={0.55} />
        
        {/* Shadow Casting Key Light */}
        <directionalLight
          castShadow
          position={[8, 12, 8]}
          intensity={1.2}
          shadow-mapSize-width={1024}
          shadow-mapSize-height={1024}
          shadow-camera-near={0.5}
          shadow-camera-far={25}
          shadow-camera-left={-6}
          shadow-camera-right={6}
          shadow-camera-top={6}
          shadow-camera-bottom={-6}
          shadow-bias={-0.0005}
        />

        {/* Soft Fill Light */}
        <directionalLight
          position={[-8, 6, -8]}
          intensity={0.4}
        />

        {/* Subtle ground glow light (hemisphere light) */}
        <hemisphereLight
          args={["#FFFFFF", "#0A0B0C", 0.25]}
        />

        {/* Procedural 3D Exhibition Stall */}
        <Stall3DModel config={config} />

        {/* Studio Dark Floor */}
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.005, 0]} receiveShadow>
          <planeGeometry args={[100, 100]} />
          <meshStandardMaterial color="#0b0c0d" roughness={0.95} metalness={0.1} />
        </mesh>

        {/* Millimeter Grid Helper */}
        <gridHelper
          args={[30, 30, "#444444", "#1F2937"]}
          position={[0, 0.002, 0]}
        />

        {/* Orbit Controls with Constraints */}
        <OrbitControls
          ref={controlsRef}
          enableDamping
          dampingFactor={0.05}
          maxPolarAngle={Math.PI / 2 - 0.05} // Limit rotating below floor
          minDistance={2}
          maxDistance={25}
        />

        {/* Dynamic Camera Manager */}
        <CameraPresetController preset={preset} controlsRef={controlsRef} config={config} />
      </Canvas>
    </div>
  );
}
