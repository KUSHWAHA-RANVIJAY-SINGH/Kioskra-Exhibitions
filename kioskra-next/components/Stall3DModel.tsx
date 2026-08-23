"use client";

import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useFrame } from "@react-three/fiber";
import { BoothConfigState } from "./BoothConfigurator";

interface Stall3DModelProps {
  config: BoothConfigState;
}

// ----------------------------------------------------
// LED Video Wall component with animated Canvas Texture
// ----------------------------------------------------
const LEDWallMesh = ({ w, h, d, position }: { w: number; h: number; d: number; position: [number, number, number] }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const textureRef = useRef<THREE.CanvasTexture | null>(null);

  useEffect(() => {
    const canvas = document.createElement("canvas");
    canvas.width = 512;
    canvas.height = 256;
    canvasRef.current = canvas;

    const ctx = canvas.getContext("2d");
    if (ctx) {
      ctx.fillStyle = "#0c1020";
      ctx.fillRect(0, 0, 512, 256);
    }

    const texture = new THREE.CanvasTexture(canvas);
    texture.colorSpace = THREE.SRGBColorSpace;
    textureRef.current = texture;

    return () => {
      texture.dispose();
      canvas.remove();
    };
  }, []);

  useFrame(({ clock }) => {
    const canvas = canvasRef.current;
    const texture = textureRef.current;
    if (!canvas || !texture) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const time = clock.getElapsedTime();

    // 1. Clear background with dark digital navy
    ctx.fillStyle = "rgba(10, 15, 30, 0.25)";
    ctx.fillRect(0, 0, 512, 256);

    // 2. Animated Grid
    ctx.strokeStyle = "rgba(47, 107, 255, 0.25)";
    ctx.lineWidth = 1;
    const spacing = 32;
    const offset = (time * 30) % spacing;

    for (let x = offset; x < 512; x += spacing) {
      ctx.beginPath();
      ctx.moveTo(x, 0);
      ctx.lineTo(x, 256);
      ctx.stroke();
    }
    for (let y = (time * 20) % spacing; y < 256; y += spacing) {
      ctx.beginPath();
      ctx.moveTo(0, y);
      ctx.lineTo(512, y);
      ctx.stroke();
    }

    // 3. Glowing futuristic wave
    ctx.strokeStyle = "rgba(47, 107, 255, 0.8)";
    ctx.lineWidth = 3;
    ctx.beginPath();
    for (let x = 0; x < 512; x += 10) {
      const y = 128 + Math.sin(x * 0.015 + time * 3) * 40 + Math.cos(x * 0.005 - time) * 15;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();

    // 4. Tech data circles
    const pulseRadius = 50 + Math.sin(time * 5) * 10;
    const grad = ctx.createRadialGradient(400, 128, 5, 400, 128, pulseRadius);
    grad.addColorStop(0, "rgba(124, 58, 237, 0.7)");
    grad.addColorStop(0.5, "rgba(47, 107, 255, 0.2)");
    grad.addColorStop(1, "rgba(0,0,0,0)");
    ctx.fillStyle = grad;
    ctx.beginPath();
    ctx.arc(400, 128, pulseRadius, 0, Math.PI * 2);
    ctx.fill();

    // 5. Tech text overlay
    ctx.fillStyle = "#FFFFFF";
    ctx.font = "bold 20px sans-serif";
    ctx.fillText("KIOSKRA 3D ENGINE", 40, 95);

    ctx.fillStyle = "rgba(47, 107, 255, 1)";
    ctx.font = "bold 11px monospace";
    ctx.fillText("STATUS: ACTIVE // REAL-TIME RENDERING", 40, 120);

    ctx.fillStyle = "rgba(255,255,255,0.6)";
    ctx.font = "10px monospace";
    ctx.fillText("ESTIMATED FABRICATION COST IN REAL-TIME", 40, 140);
    ctx.fillText(`SYSTEM SCALE: ${(w / 0.3048).toFixed(1)}ft x ${(d / 0.3048).toFixed(1)}ft`, 40, 155);

    texture.needsUpdate = true;
  });

  return (
    <group position={position}>
      {/* LED Back Board */}
      <mesh castShadow>
        <boxGeometry args={[w, h, d]} />
        <meshStandardMaterial color="#111111" metalness={0.8} roughness={0.3} />
      </mesh>
      {/* Glow Screen */}
      <mesh position={[0, 0, d / 2 + 0.005]}>
        <planeGeometry args={[w - 0.05, h - 0.05]} />
        <meshStandardMaterial
          map={textureRef.current || null}
          emissive={new THREE.Color("#4477FF")}
          emissiveIntensity={1.2}
          emissiveMap={textureRef.current || null}
          roughness={0.1}
        />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// Modern Reception Desk Component
// ----------------------------------------------------
const ReceptionDeskMesh = ({ color, position }: { color: string; position: [number, number, number] }) => {
  return (
    <group position={position} rotation={[0, -Math.PI / 6, 0]}>
      {/* Main Base Body (White Gloss) */}
      <mesh position={[0, 0.45, 0]} castShadow receiveShadow>
        <boxGeometry args={[1.3, 0.9, 0.5]} />
        <meshStandardMaterial color="#FFFFFF" roughness={0.1} metalness={0.1} />
      </mesh>
      {/* Front Accent Panel in selected Theme Color */}
      <mesh position={[0, 0.4, 0.26]} castShadow>
        <boxGeometry args={[1.1, 0.7, 0.05]} />
        <meshStandardMaterial color={color} roughness={0.2} metalness={0.4} />
      </mesh>
      {/* Top Counter Plate (Warm Wood) */}
      <mesh position={[0, 0.92, 0]} castShadow>
        <boxGeometry args={[1.36, 0.04, 0.56]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.4} metalness={0.1} />
      </mesh>
      {/* Decorative vertical LED slit */}
      <mesh position={[0, 0.4, 0.29]}>
        <boxGeometry args={[0.02, 0.6, 0.01]} />
        <meshStandardMaterial color="#FFFFFF" emissive="#FFFFFF" emissiveIntensity={2} />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// Modern Lounge Setup: Table + 3 Chairs
// ----------------------------------------------------
const LoungeMesh = ({ position }: { position: [number, number, number] }) => {
  const chairDistance = 0.75;
  const chairAngles = [0, (120 * Math.PI) / 180, (240 * Math.PI) / 180];

  return (
    <group position={position}>
      {/* 1. Round Glass Table */}
      {/* Base */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.26, 0.28, 0.02, 24]} />
        <meshStandardMaterial color="#DDDDDD" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Center Pillar */}
      <mesh position={[0, 0.36, 0]} castShadow>
        <cylinderGeometry args={[0.03, 0.03, 0.72, 16]} />
        <meshStandardMaterial color="#CCCCCC" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Glass Top */}
      <mesh position={[0, 0.73, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.42, 0.42, 0.02, 32]} />
        <meshStandardMaterial color="#FFFFFF" transparent opacity={0.3} roughness={0.05} metalness={0.9} />
      </mesh>

      {/* 2. Three Surrounding Chairs */}
      {chairAngles.map((angle, idx) => {
        const x = Math.sin(angle) * chairDistance;
        const z = Math.cos(angle) * chairDistance;
        const rotationY = angle + Math.PI; // Face the table

        return (
          <group key={idx} position={[x, 0, z]} rotation={[0, rotationY, 0]}>
            {/* Cushion */}
            <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
              <cylinderGeometry args={[0.18, 0.18, 0.05, 16]} />
              <meshStandardMaterial color="#FFFFFF" roughness={0.8} />
            </mesh>
            {/* Modern curve shell backrest */}
            <mesh position={[0, 0.46, -0.15]} rotation={[0.08, 0, 0]} castShadow>
              <boxGeometry args={[0.34, 0.35, 0.03]} />
              <meshStandardMaterial color="#1C1D1F" roughness={0.5} />
            </mesh>
            {/* Chrome legs */}
            {[-1, 1].map((lx) =>
              [-1, 1].map((lz) => (
                <mesh
                  key={`${lx}-${lz}`}
                  position={[lx * 0.13, 0.1, lz * 0.13]}
                  rotation={[lx * 0.1, 0, lz * 0.1]}
                  castShadow
                >
                  <cylinderGeometry args={[0.01, 0.007, 0.22, 8]} />
                  <meshStandardMaterial color="#CCCCCC" metalness={0.9} roughness={0.1} />
                </mesh>
              ))
            )}
          </group>
        );
      })}
    </group>
  );
};

// ----------------------------------------------------
// Modern Planter
// ----------------------------------------------------
const PlanterMesh = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position}>
      {/* Cylindrical Pot */}
      <mesh position={[0, 0.22, 0]} castShadow receiveShadow>
        <cylinderGeometry args={[0.22, 0.16, 0.44, 16]} />
        <meshStandardMaterial color="#111111" roughness={0.7} />
      </mesh>
      {/* Soil */}
      <mesh position={[0, 0.43, 0]}>
        <cylinderGeometry args={[0.20, 0.20, 0.02, 12]} />
        <meshStandardMaterial color="#2B1D0F" roughness={0.9} />
      </mesh>
      {/* Low Poly Green Leaves */}
      <mesh position={[0, 0.52, 0]} castShadow>
        <dodecahedronGeometry args={[0.22, 1]} />
        <meshStandardMaterial color="#047857" roughness={0.8} />
      </mesh>
      <mesh position={[0.06, 0.61, -0.04]} castShadow>
        <dodecahedronGeometry args={[0.16, 1]} />
        <meshStandardMaterial color="#065F46" roughness={0.8} />
      </mesh>
      <mesh position={[-0.06, 0.58, 0.06]} castShadow>
        <dodecahedronGeometry args={[0.15, 1]} />
        <meshStandardMaterial color="#059669" roughness={0.8} />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// Dynamic Touch Kiosk
// ----------------------------------------------------
const TouchKioskMesh = ({ position }: { position: [number, number, number] }) => {
  return (
    <group position={position} rotation={[0, -Math.PI / 4, 0]}>
      {/* Base */}
      <mesh position={[0, 0.01, 0]} castShadow receiveShadow>
        <boxGeometry args={[0.46, 0.02, 0.46]} />
        <meshStandardMaterial color="#111111" metalness={0.7} roughness={0.1} />
      </mesh>
      {/* Angled Stand */}
      <mesh position={[0, 0.65, -0.04]} rotation={[-0.14, 0, 0]} castShadow>
        <boxGeometry args={[0.26, 1.3, 0.05]} />
        <meshStandardMaterial color="#191A1A" metalness={0.4} roughness={0.4} />
      </mesh>
      {/* Screen Frame */}
      <mesh position={[0, 1.12, 0.01]} rotation={[-0.14, 0, 0]} castShadow>
        <boxGeometry args={[0.32, 0.52, 0.02]} />
        <meshStandardMaterial color="#111111" metalness={0.9} roughness={0.1} />
      </mesh>
      {/* Screen Display */}
      <mesh position={[0, 1.12, 0.021]} rotation={[-0.14, 0, 0]}>
        <planeGeometry args={[0.29, 0.49]} />
        <meshStandardMaterial color="#2F6BFF" emissive="#1E3A8A" emissiveIntensity={0.8} roughness={0.1} />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// Product Display Shelves
// ----------------------------------------------------
const ShelvesMesh = ({ position, rotation }: { position: [number, number, number]; rotation: [number, number, number] }) => {
  return (
    <group position={position} rotation={rotation}>
      {/* Side Supports */}
      <mesh position={[-0.45, 0.9, 0]} castShadow>
        <boxGeometry args={[0.04, 1.8, 0.36]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.5} />
      </mesh>
      <mesh position={[0.45, 0.9, 0]} castShadow>
        <boxGeometry args={[0.04, 1.8, 0.36]} />
        <meshStandardMaterial color="#8B5A2B" roughness={0.5} />
      </mesh>
      {/* Shelf Boards */}
      {[0.4, 0.8, 1.2, 1.6].map((y, idx) => (
        <mesh key={idx} position={[0, y, 0]} castShadow receiveShadow>
          <boxGeometry args={[0.86, 0.03, 0.34]} />
          <meshStandardMaterial color="#FFFFFF" roughness={0.2} />
        </mesh>
      ))}
      {/* Decorative products */}
      <mesh position={[-0.2, 0.88, 0]} castShadow>
        <boxGeometry args={[0.1, 0.12, 0.1]} />
        <meshStandardMaterial color="#2F6BFF" roughness={0.4} />
      </mesh>
      <mesh position={[0.2, 1.28, 0.05]} castShadow>
        <cylinderGeometry args={[0.06, 0.06, 0.14, 12]} />
        <meshStandardMaterial color="#7C3AED" roughness={0.3} />
      </mesh>
      <mesh position={[0, 1.68, -0.05]} castShadow>
        <boxGeometry args={[0.12, 0.1, 0.12]} />
        <meshStandardMaterial color="#E11D48" roughness={0.5} />
      </mesh>
    </group>
  );
};

// ----------------------------------------------------
// Main Stall 3D Model Component
// ----------------------------------------------------
export default function Stall3DModel({ config }: Stall3DModelProps) {
  // Convert configurations to metric scale (1 foot = 0.3048 meters)
  const w = config.width * 0.3048;
  const d = config.depth * 0.3048;
  const h = config.height * 0.3048;

  // Flooring details
  let floorColor = "#333333"; // carpet charcoal
  let floorRoughness = 0.8;
  let floorMetalness = 0.0;
  if (config.flooring === "wooden") {
    floorColor = "#8B5A2B"; // warm wood
    floorRoughness = 0.5;
  } else if (config.flooring === "raised-platform") {
    floorColor = "#F9FBFD"; // glossy white
    floorRoughness = 0.08;
    floorMetalness = 0.1;
  }

  // Walls layout
  const wallThickness = 0.08;

  // Let's decide wall highlights
  const mainWallColor = "#F4F3F0"; // sleek soft-stone architectural wall

  return (
    <group position={[0, 0, 0]}>
      {/* 1. Floor Platform */}
      <mesh position={[0, 0.05, 0]} castShadow receiveShadow>
        <boxGeometry args={[w, 0.1, d]} />
        <meshStandardMaterial color={floorColor} roughness={floorRoughness} metalness={floorMetalness} />
      </mesh>

      {/* Chrome Trim Border for Raised Platform or Premium Style */}
      <mesh position={[0, 0.045, 0]} castShadow>
        <boxGeometry args={[w + 0.02, 0.09, d + 0.02]} />
        <meshStandardMaterial color="#DDDDDD" metalness={0.9} roughness={0.1} />
      </mesh>

      {/* 2. Stall Walls */}
      {/* Back Wall (Parallel to X axis, at the back of Z) */}
      <group position={[0, h / 2 + 0.1, -d / 2 + wallThickness / 2]}>
        {/* Main Back Wall Body */}
        <mesh castShadow receiveShadow>
          <boxGeometry args={[w, h, wallThickness]} />
          <meshStandardMaterial color={mainWallColor} roughness={0.6} />
        </mesh>
        {/* Center Panel Backdrop in Primary Theme Color */}
        <mesh position={[0, 0, wallThickness / 2 + 0.002]} castShadow>
          <boxGeometry args={[w * 0.55, h - 0.2, 0.01]} />
          <meshStandardMaterial color={config.color} roughness={0.3} metalness={0.2} />
        </mesh>
      </group>

      {/* Left Side Wall (Required for Square and L-Shape) */}
      {(config.shape === "square" || config.shape === "l-shape") && (
        <group position={[-w / 2 + wallThickness / 2, h / 2 + 0.1, wallThickness / 2]}>
          {/* Main Left Wall Body */}
          <mesh castShadow receiveShadow>
            <boxGeometry args={[wallThickness, h, d - wallThickness]} />
            <meshStandardMaterial color={mainWallColor} roughness={0.6} />
          </mesh>
          {/* Accent vertical stripe in primary Theme Color */}
          <mesh position={[wallThickness / 2 + 0.002, 0, 0]} castShadow>
            <boxGeometry args={[0.01, h - 0.2, (d - wallThickness) * 0.25]} />
            <meshStandardMaterial color={config.color} roughness={0.3} metalness={0.2} />
          </mesh>
        </group>
      )}

      {/* Right Side Wall (Only for Square / Full Box Shape) */}
      {config.shape === "square" && (
        <group position={[w / 2 - wallThickness / 2, h / 2 + 0.1, wallThickness / 2]}>
          <mesh castShadow receiveShadow>
            <boxGeometry args={[wallThickness, h, d - wallThickness]} />
            <meshStandardMaterial color={mainWallColor} roughness={0.6} />
          </mesh>
          {/* Accent stripe */}
          <mesh position={[-wallThickness / 2 - 0.002, 0, 0]} castShadow>
            <boxGeometry args={[0.01, h - 0.2, (d - wallThickness) * 0.25]} />
            <meshStandardMaterial color={config.color} roughness={0.3} metalness={0.2} />
          </mesh>
        </group>
      )}

      {/* 3. Toggled Features */}
      {/* LED Video Wall */}
      {config.features.led && (
        <LEDWallMesh
          w={w * 0.5}
          h={h * 0.52}
          d={0.06}
          position={[0, h * 0.55 + 0.1, -d / 2 + wallThickness + 0.035]}
        />
      )}

      {/* Reception Desk */}
      {config.features.counter && (
        <ReceptionDeskMesh
          color={config.color}
          position={[-w * 0.2, 0.1, d * 0.24]}
        />
      )}

      {/* Discussion Lounge */}
      {config.features.lounge && (
        <LoungeMesh position={[w * 0.2, 0.1, -d * 0.05]} />
      )}

      {/* Product Display Shelves (only if side walls exist) */}
      {config.features.shelves && (config.shape === "square" || config.shape === "l-shape") && (
        <ShelvesMesh
          position={[-w / 2 + wallThickness + 0.22, 0.1, -d * 0.15]}
          rotation={[0, Math.PI / 2, 0]}
        />
      )}

      {/* Planters */}
      {config.features.plants && (
        <>
          {/* Front Corner Right Planter */}
          <PlanterMesh position={[w / 2 - 0.38, 0.1, d / 2 - 0.38]} />
          {/* Front Corner Left Planter */}
          {config.shape !== "l-shape" && (
            <PlanterMesh position={[-w / 2 + 0.38, 0.1, d / 2 - 0.38]} />
          )}
        </>
      )}

      {/* Touch Kiosk */}
      {config.features.touchScreen && (
        <TouchKioskMesh position={[w * 0.28, 0.1, d * 0.28]} />
      )}
    </group>
  );
}
