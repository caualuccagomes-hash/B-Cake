"use client";
import { Canvas } from "@react-three/fiber";
import { OrbitControls } from "@react-three/drei/core/OrbitControls";
import { ContactShadows } from "@react-three/drei/core/ContactShadows";
import { Instances, Instance } from "@react-three/drei/core/Instances";
import { useRef, useState } from "react";
import { useInView } from "motion/react";
function Cake({ color, angle }: { color: string; angle: number }) {
  return (
    <group rotation={[0, angle, 0]}>
      <mesh position={[0, -0.84, 0]}>
        <cylinderGeometry args={[1.45, 1.45, 0.1, 64]} />
        <meshStandardMaterial color="#f3eadc" roughness={0.6} />
      </mesh>
      <mesh>
        <cylinderGeometry args={[1.08, 1.1, 1.6, 64]} />
        <meshStandardMaterial color={color} roughness={0.85} />
      </mesh>
      <mesh position={[0, 0.805, 0]}>
        <cylinderGeometry args={[1.08, 1.08, 0.045, 64]} />
        <meshStandardMaterial color="#fff3e6" roughness={0.9} />
      </mesh>
      <Instances limit={80}>
        <sphereGeometry args={[0.09, 10, 8]} />
        <meshStandardMaterial color="#f5d3d0" roughness={0.8} />
        {Array.from({ length: 40 }, (_, i) => {
          const a = (i / 40) * Math.PI * 2;
          return (
            <group key={i}>
              <Instance
                position={[Math.cos(a) * 1.04, 0.82, Math.sin(a) * 1.04]}
                scale={[1, 1.1, 1]}
              />
              <Instance
                position={[Math.cos(a) * 1.07, -0.71, Math.sin(a) * 1.07]}
              />
            </group>
          );
        })}
      </Instances>
      {Array.from({ length: 10 }, (_, i) => {
        const a = (i / 10) * Math.PI * 2;
        return (
          <group
            key={`swag-${i}`}
            position={[Math.cos(a) * 1.075, 0.22, Math.sin(a) * 1.075]}
            rotation={[0, -a + Math.PI / 2, Math.PI]}
          >
            <mesh>
              <torusGeometry args={[0.3, 0.025, 6, 24, Math.PI]} />
              <meshStandardMaterial color="#e5b6b8" roughness={0.9} />
            </mesh>
            <mesh position={[0, 0.055, 0]}>
              <torusGeometry args={[0.3, 0.014, 6, 24, Math.PI]} />
              <meshStandardMaterial color="#f5d3d0" roughness={0.9} />
            </mesh>
          </group>
        );
      })}
      {Array.from({ length: 8 }, (_, i) => {
        const a = (i / 8) * Math.PI * 2;
        return (
          <group
            key={i}
            position={[Math.cos(a) * 1.085, 0.28, Math.sin(a) * 1.085]}
            rotation={[0, -a + Math.PI / 2, 0]}
          >
            {Array.from({ length: 5 }, (_, j) => {
              const b = (j / 5) * Math.PI * 2;
              return (
                <mesh
                  key={j}
                  position={[Math.cos(b) * 0.09, Math.sin(b) * 0.09, 0]}
                  scale={[0.075, 0.075, 0.035]}
                >
                  <sphereGeometry args={[1, 12, 8]} />
                  <meshStandardMaterial color="#d58f9c" roughness={0.7} />
                </mesh>
              );
            })}
            <mesh position={[0, 0, 0.025]}>
              <sphereGeometry args={[0.04, 12, 8]} />
              <meshStandardMaterial color="#d5ba7e" />
            </mesh>
            <mesh
              position={[0.12, -0.13, -0.01]}
              rotation={[0, 0, -0.55]}
              scale={[0.04, 0.11, 0.025]}
            >
              <sphereGeometry args={[1, 12, 8]} />
              <meshStandardMaterial color="#8b9d80" />
            </mesh>
          </group>
        );
      })}
    </group>
  );
}
export default function CakeScene() {
  const ref = useRef<HTMLDivElement>(null),
    visible = useInView(ref),
    [color, setColor] = useState("#f6e7d7"),
    [angle, setAngle] = useState(0),
    [reset, setReset] = useState(0);
  return (
    <div ref={ref} className="cake-widget">
      <div
        className="canvas-area"
        aria-label="Modelo 3D ilustrativo de bolo. Arraste para girar ou use os botões abaixo."
      >
        <Canvas
          key={reset}
          frameloop={visible ? "demand" : "never"}
          dpr={[1, 1.5]}
          camera={{ position: [3, 2.3, 4], fov: 40 }}
        >
          <ambientLight intensity={1.5} />
          <directionalLight position={[3, 5, 4]} intensity={2.5} />
          <directionalLight position={[-3, 2, -2]} intensity={0.7} />
          <Cake color={color} angle={angle} />
          <ContactShadows
            position={[0, -0.9, 0]}
            opacity={0.3}
            scale={6}
            blur={2.5}
            far={3}
            frames={1}
          />
          <OrbitControls
            enableZoom={false}
            enablePan={false}
            minPolarAngle={0.5}
            maxPolarAngle={1.65}
            enableDamping
          />
        </Canvas>
      </div>
      <p className="fine centered">Arraste para ver por outro ângulo</p>
      <div className="scene-controls">
        <button
          className="icon"
          aria-label="Girar para a esquerda"
          onClick={() => setAngle((a) => a - 0.4)}
        >
          ↶
        </button>
        <button
          className="reset"
          onClick={() => {
            setAngle(0);
            setReset((r) => r + 1);
          }}
        >
          Restaurar
        </button>
        <button
          className="icon"
          aria-label="Girar para a direita"
          onClick={() => setAngle((a) => a + 0.4)}
        >
          ↷
        </button>
        <span className="control-divider" />
        {[
          ["#f6e7d7", "Marfim"],
          ["#e6b6bd", "Rosa"],
          ["#b7c7b0", "Sálvia"],
        ].map(([c, n]) => (
          <button
            className="swatch"
            style={{ background: c }}
            key={c}
            aria-label={`Cobertura ${n}`}
            aria-pressed={c === color}
            onClick={() => setColor(c)}
          />
        ))}
      </div>
    </div>
  );
}
