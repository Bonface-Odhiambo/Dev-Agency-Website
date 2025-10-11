import { useRef, useMemo, useState, useEffect } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import * as THREE from 'three';

const ParticleSystemWithCallback = ({ setDisplayShape }: { setDisplayShape: (shape: string) => void }) => {
  const particlesRef = useRef<THREE.Points>(null);
  const [currentShape, setCurrentShape] = useState('sphere');
  const [targetShape, setTargetShape] = useState('sphere');
  const [morphProgress, setMorphProgress] = useState(0);
  const [morphing, setMorphing] = useState(false);
  const [isHovering, setIsHovering] = useState(false);
  const timeRef = useRef(0);
  const hoverTimerRef = useRef<NodeJS.Timeout | null>(null);

  const shapes = ['sphere', 'circle', 'square', 'rectangle'];

  const particleData = useMemo(() => {
    const count = 3000;
    const data = [];

    for (let i = 0; i < count; i++) {
      // SPHERE - 3D sphere
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos(Math.random() * 2 - 1);
      const radius = 2.5;
      const sphereX = radius * Math.sin(phi) * Math.cos(theta);
      const sphereY = radius * Math.sin(phi) * Math.sin(theta);
      const sphereZ = radius * Math.cos(phi);

      // CIRCLE - 3D torus (donut)
      const torusMajorRadius = 2.0;
      const torusMinorRadius = 0.8;
      const torusAngle1 = Math.random() * Math.PI * 2;
      const torusAngle2 = Math.random() * Math.PI * 2;
      const circleX = (torusMajorRadius + torusMinorRadius * Math.cos(torusAngle2)) * Math.cos(torusAngle1);
      const circleY = (torusMajorRadius + torusMinorRadius * Math.cos(torusAngle2)) * Math.sin(torusAngle1);
      const circleZ = torusMinorRadius * Math.sin(torusAngle2);

      // SQUARE - 3D cube
      const cubeSize = 3.0;
      const cubeX = (Math.random() - 0.5) * cubeSize;
      const cubeY = (Math.random() - 0.5) * cubeSize;
      const cubeZ = (Math.random() - 0.5) * cubeSize;

      // Snap to cube surface
      const maxAxis = Math.max(Math.abs(cubeX), Math.abs(cubeY), Math.abs(cubeZ));
      const squareX = Math.abs(cubeX) === maxAxis ? Math.sign(cubeX) * cubeSize / 2 : cubeX;
      const squareY = Math.abs(cubeY) === maxAxis ? Math.sign(cubeY) * cubeSize / 2 : cubeY;
      const squareZ = Math.abs(cubeZ) === maxAxis ? Math.sign(cubeZ) * cubeSize / 2 : cubeZ;

      // RECTANGLE - 3D rectangular prism (box)
      const rectWidth = 4.0;
      const rectHeight = 2.5;
      const rectDepth = 2.0;
      const rectX = (Math.random() - 0.5) * rectWidth;
      const rectY = (Math.random() - 0.5) * rectHeight;
      const rectZ = (Math.random() - 0.5) * rectDepth;

      // Snap to box surface
      const xDist = Math.abs(rectX) / (rectWidth / 2);
      const yDist = Math.abs(rectY) / (rectHeight / 2);
      const zDist = Math.abs(rectZ) / (rectDepth / 2);
      const maxDist = Math.max(xDist, yDist, zDist);

      const rectangleX = xDist === maxDist ? Math.sign(rectX) * rectWidth / 2 : rectX;
      const rectangleY = yDist === maxDist ? Math.sign(rectY) * rectHeight / 2 : rectY;
      const rectangleZ = zDist === maxDist ? Math.sign(rectZ) * rectDepth / 2 : rectZ;

      data.push({
        spherePos: { x: sphereX, y: sphereY, z: sphereZ },
        circlePos: { x: circleX, y: circleY, z: circleZ },
        squarePos: { x: squareX, y: squareY, z: squareZ },
        rectanglePos: { x: rectangleX, y: rectangleY, z: rectangleZ },
        offset: Math.random() * Math.PI * 2
      });
    }

    return data;
  }, []);

  const { positions, colors } = useMemo(() => {
    const count = particleData.length;
    const positions = new Float32Array(count * 3);
    const colors = new Float32Array(count * 3);

    particleData.forEach((p, i) => {
      positions[i * 3] = p.spherePos.x;
      positions[i * 3 + 1] = p.spherePos.y;
      positions[i * 3 + 2] = p.spherePos.z;

      // Red color with variations
      const brightness = 0.7 + Math.random() * 0.3;
      colors[i * 3] = 1.0 * brightness;
      colors[i * 3 + 1] = 0.1 * brightness;
      colors[i * 3 + 2] = 0.15 * brightness;
    });

    return { positions, colors };
  }, [particleData]);

  const startMorphing = () => {
    if (!isHovering) return;

    setMorphing(true);
    setMorphProgress(0);
    const currentIndex = shapes.indexOf(currentShape);
    const nextIndex = (currentIndex + 1) % shapes.length;
    setTargetShape(shapes[nextIndex]);
  };

  useEffect(() => {
    if (isHovering) {
      startMorphing();
    } else {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    }
    return () => {
      if (hoverTimerRef.current) {
        clearTimeout(hoverTimerRef.current);
      }
    };
  }, [isHovering]);

  const easeInOutCubic = (t: number) => {
    return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  useFrame((state, delta) => {
    if (!particlesRef.current) return;

    timeRef.current += delta;

    // Handle morphing
    if (morphing) {
      setMorphProgress((prev) => {
        const next = prev + 0.012;
        if (next >= 1) {
          setMorphing(false);
          setCurrentShape(targetShape);
          setDisplayShape(targetShape.toUpperCase());
          // Continue morphing if still hovering
          if (isHovering) {
            setTimeout(() => startMorphing(), 100);
          }
          return 1;
        }
        return next;
      });
    }

    const positions = particlesRef.current.geometry.attributes.position.array as Float32Array;
    const easedProgress = easeInOutCubic(morphProgress);

    for (let i = 0; i < particleData.length; i++) {
      const p = particleData[i];

      const startPos = p[`${currentShape}Pos` as keyof typeof p] as { x: number; y: number; z: number };
      const endPos = p[`${targetShape}Pos` as keyof typeof p] as { x: number; y: number; z: number };

      // Add subtle wave effect
      const wave = Math.sin(timeRef.current * 2 + p.offset) * 0.03;

      positions[i * 3] = startPos.x + (endPos.x - startPos.x) * easedProgress + wave;
      positions[i * 3 + 1] = startPos.y + (endPos.y - startPos.y) * easedProgress + wave;
      positions[i * 3 + 2] = startPos.z + (endPos.z - startPos.z) * easedProgress + wave;
    }

    particlesRef.current.geometry.attributes.position.needsUpdate = true;

    // Gentle rotation
    particlesRef.current.rotation.y += 0.003;
    particlesRef.current.rotation.x = Math.sin(timeRef.current * 0.5) * 0.08;
  });

  return (
    <>
      <points
        ref={particlesRef}
        onPointerEnter={() => setIsHovering(true)}
        onPointerLeave={() => setIsHovering(false)}
      >
        <bufferGeometry>
          <bufferAttribute
            attach="attributes-position"
            count={positions.length / 3}
            array={positions}
            itemSize={3}
          />
          <bufferAttribute
            attach="attributes-color"
            count={colors.length / 3}
            array={colors}
            itemSize={3}
          />
        </bufferGeometry>
        <pointsMaterial
          size={0.1}
          vertexColors
          transparent
          opacity={0.9}
          blending={THREE.AdditiveBlending}
          sizeAttenuation
        />
      </points>
      
      {/* Wireframe shapes visible on hover */}
      {isHovering && (
        <group rotation={particlesRef.current?.rotation || [0, 0, 0]}>
          {currentShape === 'sphere' && (
            <mesh>
              <sphereGeometry args={[2.5, 32, 32]} />
              <meshBasicMaterial color="#ff3344" wireframe opacity={0.3} transparent />
            </mesh>
          )}
          {currentShape === 'circle' && (
            <mesh>
              <torusGeometry args={[2.0, 0.8, 16, 32]} />
              <meshBasicMaterial color="#ff3344" wireframe opacity={0.3} transparent />
            </mesh>
          )}
          {currentShape === 'square' && (
            <mesh>
              <boxGeometry args={[3.0, 3.0, 3.0]} />
              <meshBasicMaterial color="#ff3344" wireframe opacity={0.3} transparent />
            </mesh>
          )}
          {currentShape === 'rectangle' && (
            <mesh>
              <boxGeometry args={[4.0, 2.5, 2.0]} />
              <meshBasicMaterial color="#ff3344" wireframe opacity={0.3} transparent />
            </mesh>
          )}
        </group>
      )}
    </>
  );
};

const MorphingShape = () => {
  const [displayShape, setDisplayShape] = useState('SPHERE');

  return (
    <div className="relative w-full h-full flex items-center justify-center overflow-hidden" style={{ background: '#0a0a0a' }}>
      <Canvas
        camera={{ position: [0, 0, 6], fov: 75 }}
        gl={{ antialias: true }}
        style={{ width: '100%', height: '100%' }}
      >
        <color attach="background" args={['#0a0a0a']} />
        <ParticleSystemWithCallback setDisplayShape={setDisplayShape} />
      </Canvas>
    </div>
  );
};

export default MorphingShape;
