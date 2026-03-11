import { Float, MeshDistortMaterial } from '@react-three/drei';
import { Canvas, useFrame } from '@react-three/fiber';
import { useRef } from 'react';
import * as THREE from 'three';

function GlowingSphere() {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        ref.current.rotation.x = clock.getElapsedTime() * 0.15;
        ref.current.rotation.y = clock.getElapsedTime() * 0.2;
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1.5}>
            <mesh ref={ref}>
                <icosahedronGeometry args={[1.4, 1]} />
                <MeshDistortMaterial
                    color="#a855f7"
                    emissive="#7c3aed"
                    emissiveIntensity={0.4}
                    wireframe
                    distort={0.3}
                    speed={2}
                    transparent
                    opacity={0.7}
                />
            </mesh>
        </Float>
    );
}

function FloatingRing() {
    const ref = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        ref.current.rotation.x = clock.getElapsedTime() * 0.3;
        ref.current.rotation.z = clock.getElapsedTime() * 0.1;
    });

    return (
        <Float speed={1.5} rotationIntensity={1} floatIntensity={2}>
            <mesh ref={ref} position={[2.5, -0.5, -1]}>
                <torusGeometry args={[0.7, 0.08, 16, 100]} />
                <meshStandardMaterial
                    color="#06b6d4"
                    emissive="#06b6d4"
                    emissiveIntensity={0.6}
                    transparent
                    opacity={0.5}
                />
            </mesh>
        </Float>
    );
}

function SmallOrbs() {
    const ref1 = useRef<THREE.Mesh>(null!);
    const ref2 = useRef<THREE.Mesh>(null!);

    useFrame(({ clock }) => {
        const t = clock.getElapsedTime();
        ref1.current.position.x = Math.sin(t * 0.5) * 1.5 - 2;
        ref1.current.position.y = Math.cos(t * 0.7) * 1;
        ref2.current.position.x = Math.cos(t * 0.4) * 2 + 1;
        ref2.current.position.y = Math.sin(t * 0.6) * 1.2 - 0.5;
    });

    return (
        <>
            <mesh ref={ref1}>
                <sphereGeometry args={[0.12, 16, 16]} />
                <meshStandardMaterial
                    color="#3b82f6"
                    emissive="#3b82f6"
                    emissiveIntensity={1}
                />
            </mesh>
            <mesh ref={ref2}>
                <sphereGeometry args={[0.08, 16, 16]} />
                <meshStandardMaterial
                    color="#ec4899"
                    emissive="#ec4899"
                    emissiveIntensity={1}
                />
            </mesh>
        </>
    );
}

export default function FloatingScene() {
    return (
        <div className="w-full h-full">
            <Canvas
                camera={{ position: [0, 0, 5], fov: 50 }}
                gl={{ alpha: true, antialias: true }}
                style={{ background: 'transparent' }}
            >
                <ambientLight intensity={0.3} />
                <pointLight position={[5, 5, 5]} intensity={0.8} color="#a855f7" />
                <pointLight position={[-5, -5, 3]} intensity={0.5} color="#06b6d4" />

                <GlowingSphere />
                <FloatingRing />
                <SmallOrbs />
            </Canvas>
        </div>
    );
}
