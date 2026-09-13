import { Canvas, useFrame } from "@react-three/fiber";
import { useMemo, useRef, type ReactNode } from "react";
import * as THREE from "three";

type Palette = {
  /** line/particle colour — white on dark, near-black on light */
  ink: string;
  /** solid inner core body */
  body: string;
  /** secondary fill light */
  fill: string;
  /* metal reads as a dark void without an env map — the light theme keeps it matte */
  metalness: number;
  roughness: number;
};

const DARK: Palette = { ink: "#ffffff", body: "#3a3a3a", fill: "#9aa0a6", metalness: 0.9, roughness: 0.25 };
const LIGHT: Palette = { ink: "#0a0a0a", body: "#ececec", fill: "#bdbdbd", metalness: 0.1, roughness: 0.7 };

function Core({ lite, palette }: { lite: boolean; palette: Palette }) {
  const inner = useRef<THREE.Mesh>(null);
  const shell = useRef<THREE.Mesh>(null);
  const ringA = useRef<THREE.Mesh>(null);
  const ringB = useRef<THREE.Mesh>(null);
  const ringC = useRef<THREE.Mesh>(null);

  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const t = state.clock.elapsedTime;
    if (inner.current) {
      inner.current.rotation.y += dt * 0.35;
      inner.current.rotation.x += dt * 0.12;
      inner.current.scale.setScalar(1 + Math.sin(t * 1.2) * 0.03);
    }
    if (shell.current) {
      shell.current.rotation.y -= dt * 0.18;
      shell.current.rotation.z += dt * 0.06;
    }
    if (ringA.current) ringA.current.rotation.z += dt * 0.4;
    if (ringB.current) {
      ringB.current.rotation.x += dt * 0.25;
      ringB.current.rotation.y += dt * 0.15;
    }
    if (ringC.current) ringC.current.rotation.y -= dt * 0.3;
  });

  return (
    <group position={[0, 0.9, 0]}>
      <mesh ref={inner}>
        <icosahedronGeometry args={[0.78, 1]} />
        <meshStandardMaterial
          color={palette.body}
          emissive={palette.ink}
          emissiveIntensity={0.06}
          roughness={palette.roughness}
          metalness={palette.metalness}
          flatShading
        />
      </mesh>

      <mesh ref={shell}>
        <icosahedronGeometry args={[1.32, 1]} />
        <meshBasicMaterial color={palette.ink} wireframe transparent opacity={0.22} />
      </mesh>

      <mesh ref={ringA} rotation={[Math.PI / 2.4, 0, 0]}>
        <torusGeometry args={[1.85, 0.006, 8, 128]} />
        <meshBasicMaterial color={palette.ink} transparent opacity={0.55} />
      </mesh>
      <mesh ref={ringB} rotation={[Math.PI / 3, 0.4, 0]}>
        <torusGeometry args={[2.25, 0.004, 8, 128]} />
        <meshBasicMaterial color={palette.ink} transparent opacity={0.32} />
      </mesh>
      {!lite && (
        <mesh ref={ringC} rotation={[1.2, 0.9, 0.3]}>
          <torusGeometry args={[2.7, 0.003, 8, 128]} />
          <meshBasicMaterial color={palette.ink} transparent opacity={0.18} />
        </mesh>
      )}
    </group>
  );
}

function Particles({ count, color }: { count: number; color: string }) {
  const ref = useRef<THREE.Points>(null);
  const positions = useMemo(() => {
    const arr = new Float32Array(count * 3);
    for (let i = 0; i < count; i++) {
      const r = 3 + Math.random() * 5;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(2 * Math.random() - 1);
      arr[i * 3] = r * Math.sin(phi) * Math.cos(theta);
      arr[i * 3 + 1] = (Math.random() - 0.5) * 7;
      arr[i * 3 + 2] = r * Math.sin(phi) * Math.sin(theta);
    }
    return arr;
  }, [count]);

  useFrame((_, raw) => {
    if (ref.current) ref.current.rotation.y += Math.min(raw, 0.05) * 0.03;
  });

  return (
    <points ref={ref}>
      <bufferGeometry>
        <bufferAttribute attach="attributes-position" args={[positions, 3]} />
      </bufferGeometry>
      <pointsMaterial size={0.022} color={color} transparent opacity={0.5} sizeAttenuation />
    </points>
  );
}

/** Gentle bob and sway — a hand-rolled stand-in for drei's <Float>. */
function Float({ children }: { children: ReactNode }) {
  const ref = useRef<THREE.Group>(null);
  useFrame((state) => {
    const t = state.clock.elapsedTime * 1.1;
    if (!ref.current) return;
    ref.current.position.y = Math.sin(t) * 0.12;
    ref.current.rotation.x = Math.cos(t / 4) * 0.04;
    ref.current.rotation.z = Math.sin(t / 4) * 0.03;
  });
  return <group ref={ref}>{children}</group>;
}

/** Camera eases toward the pointer for a light parallax. */
function Rig() {
  useFrame((state, raw) => {
    const dt = Math.min(raw, 0.05);
    const k = 1 - Math.exp(-2 * dt);
    state.camera.position.x += (state.pointer.x * 0.6 - state.camera.position.x) * k;
    state.camera.position.y += (state.pointer.y * 0.35 - state.camera.position.y) * k;
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}

export default function CoreScene({ lite = false, dark = true }: { lite?: boolean; dark?: boolean }) {
  const palette = dark ? DARK : LIGHT;

  return (
    <Canvas
      camera={{ position: [0, 0, 9], fov: 42 }}
      dpr={[1, lite ? 1.25 : 1.8]}
      gl={{ antialias: !lite, powerPreference: "high-performance", alpha: true }}
    >
      <ambientLight intensity={dark ? 0.35 : 0.8} />
      <pointLight position={[3, 3, 4]} intensity={22} color="#ffffff" />
      <pointLight position={[-4, -2, -3]} intensity={10} color={palette.fill} />
      <Float>
        <Core lite={lite} palette={palette} />
      </Float>
      <Particles count={lite ? 180 : 520} color={palette.ink} />
      {!lite && <Rig />}
    </Canvas>
  );
}
