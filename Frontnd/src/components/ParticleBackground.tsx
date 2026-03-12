import { Canvas, useFrame } from '@react-three/fiber';
import { useMemo, useRef } from 'react';
import * as THREE from 'three';

function Particles({ count = 600 }: { count?: number }) {
    const mesh = useRef<THREE.Points>(null);
    const positions = useMemo(() => {
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            pos[i * 3] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 1] = (Math.random() - 0.5) * 20;
            pos[i * 3 + 2] = (Math.random() - 0.5) * 10;
        }
        return pos;
    }, [count]);

    const sizes = useMemo(() => {
        const s = new Float32Array(count);
        for (let i = 0; i < count; i++) {
            s[i] = Math.random() * 2 + 0.5;
        }
        return s;
    }, [count]);

    useFrame((state) => {
        if (!mesh.current) return;
        mesh.current.rotation.y = state.clock.elapsedTime * 0.015;
        mesh.current.rotation.x = Math.sin(state.clock.elapsedTime * 0.01) * 0.1;
    });

    return (
        <points ref={mesh}>
            <bufferGeometry>
                <bufferAttribute attach="attributes-position" args={[positions, 3]} />
                <bufferAttribute attach="attributes-size" args={[sizes, 1]} />
            </bufferGeometry>
            <pointsMaterial
                size={0.03}
                color="#8b5cf6"
                transparent
                opacity={0.4}
                sizeAttenuation
                blending={THREE.AdditiveBlending}
                depthWrite={false}
            />
        </points>
    );
}

function FloatingRings() {
    const ring1 = useRef<THREE.Mesh>(null);
    const ring2 = useRef<THREE.Mesh>(null);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (ring1.current) {
            ring1.current.rotation.x = t * 0.15;
            ring1.current.rotation.y = t * 0.1;
        }
        if (ring2.current) {
            ring2.current.rotation.x = -t * 0.12;
            ring2.current.rotation.z = t * 0.08;
        }
    });

    return (
        <>
            <mesh ref={ring1} position={[3, 1, -2]}>
                <torusGeometry args={[1.2, 0.02, 16, 80]} />
                <meshBasicMaterial color="#6366f1" transparent opacity={0.15} />
            </mesh>
            <mesh ref={ring2} position={[-3, -1, -3]}>
                <torusGeometry args={[1.5, 0.02, 16, 80]} />
                <meshBasicMaterial color="#06b6d4" transparent opacity={0.1} />
            </mesh>
        </>
    );
}

function NeuralSphere() {
    const groupRef = useRef<THREE.Group>(null);
    const pointsRef = useRef<THREE.Points>(null);

    const geometry = useMemo(() => {
        const count = 2000;
        const pos = new Float32Array(count * 3);
        for (let i = 0; i < count; i++) {
            const theta = Math.random() * Math.PI * 2;
            const phi = Math.acos(2 * Math.random() - 1);
            const r = 2 + (Math.random() - 0.5) * 0.3;
            pos[i * 3] = r * Math.sin(phi) * Math.cos(theta);
            pos[i * 3 + 1] = r * Math.sin(phi) * Math.sin(theta);
            pos[i * 3 + 2] = r * Math.cos(phi);
        }
        return pos;
    }, []);

    useFrame((state) => {
        const t = state.clock.elapsedTime;
        if (groupRef.current) {
            groupRef.current.rotation.y = t * 0.08;
            groupRef.current.rotation.x = Math.sin(t * 0.05) * 0.15;
        }
        if (pointsRef.current) {
            const positions = pointsRef.current.geometry.attributes.position;
            const arr = positions.array as Float32Array;
            for (let i = 0; i < arr.length; i += 3) {
                const ox = arr[i], oy = arr[i + 1], oz = arr[i + 2];
                const dist = Math.sqrt(ox * ox + oy * oy + oz * oz);
                const wave = Math.sin(t * 0.8 + dist * 2) * 0.03;
                const scale = 1 + wave;
                arr[i] = ox * scale / (dist || 1) * dist;
                arr[i + 1] = oy * scale / (dist || 1) * dist;
                arr[i + 2] = oz * scale / (dist || 1) * dist;
            }
            positions.needsUpdate = true;
        }
    });

    return (
        <group ref={groupRef} position={[0, 0, 0]}>
            <points ref={pointsRef}>
                <bufferGeometry>
                    <bufferAttribute attach="attributes-position" args={[geometry, 3]} />
                </bufferGeometry>
                <pointsMaterial
                    size={0.025}
                    color="#a78bfa"
                    transparent
                    opacity={0.6}
                    sizeAttenuation
                    blending={THREE.AdditiveBlending}
                    depthWrite={false}
                />
            </points>
        </group>
    );
}

export default function ParticleBackground() {
    return (
        <div className="fixed inset-0 z-0" style={{ pointerEvents: 'none' }}>
            {/* Grid overlay */}
            <div className="absolute inset-0 grid-bg" style={{ opacity: 0.5 }} />

            {/* Ambient glows */}
            <div className="absolute" style={{ top: '15%', left: '20%', width: 600, height: 600, background: 'radial-gradient(circle, rgba(139,92,246,0.06) 0%, transparent 70%)', filter: 'blur(60px)' }} />
            <div className="absolute" style={{ bottom: '20%', right: '15%', width: 500, height: 500, background: 'radial-gradient(circle, rgba(59,130,246,0.05) 0%, transparent 70%)', filter: 'blur(80px)' }} />
            <div className="absolute" style={{ top: '60%', left: '50%', width: 400, height: 400, background: 'radial-gradient(circle, rgba(6,182,212,0.04) 0%, transparent 70%)', filter: 'blur(100px)', transform: 'translateX(-50%)' }} />

            {/* 3D Canvas */}
            <Canvas
                camera={{ position: [0, 0, 6], fov: 60 }}
                gl={{ alpha: true, antialias: true }}
                style={{ position: 'absolute', inset: 0 }}
            >
                <Particles />
                <FloatingRings />
                <NeuralSphere />
            </Canvas>
        </div>
    );
}
