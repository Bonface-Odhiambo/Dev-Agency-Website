import React, { useRef, useEffect, useState } from 'react';

export default function CelestialMorphingShapes() {
  const canvasRef = useRef(null);
  const [displayShape, setDisplayShape] = useState('SPHERE');
  const [harmony, setHarmony] = useState(0);
  const [isHovering, setIsHovering] = useState(false);
  const particlesRef = useRef([]);
  const timeRef = useRef(0);
  const currentShapeRef = useRef('sphere');
  const targetShapeRef = useRef('sphere');
  const morphProgressRef = useRef(0);
  const morphingRef = useRef(false);

  const shapes = ['sphere', 'circle', 'square', 'rectangle'];

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      const container = canvas.parentElement;
      canvas.width = container.clientWidth;
      canvas.height = container.clientHeight;
      initParticles();
    };

    const initParticles = () => {
      particlesRef.current = [];
      const count = 2000;

      for (let i = 0; i < count; i++) {
        // SPHERE
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.acos(Math.random() * 2 - 1);
        const radius = 180;
        const sphereX = radius * Math.sin(phi) * Math.cos(theta);
        const sphereY = radius * Math.sin(phi) * Math.sin(theta);
        const sphereZ = radius * Math.cos(phi);

        // CIRCLE (torus)
        const torusMajorRadius = 150;
        const torusMinorRadius = 60;
        const torusAngle1 = Math.random() * Math.PI * 2;
        const torusAngle2 = Math.random() * Math.PI * 2;
        const circleX = (torusMajorRadius + torusMinorRadius * Math.cos(torusAngle2)) * Math.cos(torusAngle1);
        const circleY = (torusMajorRadius + torusMinorRadius * Math.cos(torusAngle2)) * Math.sin(torusAngle1);
        const circleZ = torusMinorRadius * Math.sin(torusAngle2);

        // SQUARE (cube)
        const cubeSize = 220;
        const cubeX = (Math.random() - 0.5) * cubeSize;
        const cubeY = (Math.random() - 0.5) * cubeSize;
        const cubeZ = (Math.random() - 0.5) * cubeSize;

        const maxAxis = Math.max(Math.abs(cubeX), Math.abs(cubeY), Math.abs(cubeZ));
        const squareX = Math.abs(cubeX) === maxAxis ? Math.sign(cubeX) * cubeSize / 2 : cubeX;
        const squareY = Math.abs(cubeY) === maxAxis ? Math.sign(cubeY) * cubeSize / 2 : cubeY;
        const squareZ = Math.abs(cubeZ) === maxAxis ? Math.sign(cubeZ) * cubeSize / 2 : cubeZ;

        // RECTANGLE (box)
        const rectWidth = 280;
        const rectHeight = 180;
        const rectDepth = 150;
        const rectX = (Math.random() - 0.5) * rectWidth;
        const rectY = (Math.random() - 0.5) * rectHeight;
        const rectZ = (Math.random() - 0.5) * rectDepth;

        const xDist = Math.abs(rectX) / (rectWidth / 2);
        const yDist = Math.abs(rectY) / (rectHeight / 2);
        const zDist = Math.abs(rectZ) / (rectDepth / 2);
        const maxDist = Math.max(xDist, yDist, zDist);

        const rectangleX = xDist === maxDist ? Math.sign(rectX) * rectWidth / 2 : rectX;
        const rectangleY = yDist === maxDist ? Math.sign(rectY) * rectHeight / 2 : rectY;
        const rectangleZ = zDist === maxDist ? Math.sign(rectZ) * rectDepth / 2 : rectZ;

        const hue = 200 + Math.random() * 80;
        
        particlesRef.current.push({
          spherePos: { x: sphereX, y: sphereY, z: sphereZ },
          circlePos: { x: circleX, y: circleY, z: circleZ },
          squarePos: { x: squareX, y: squareY, z: squareZ },
          rectanglePos: { x: rectangleX, y: rectangleY, z: rectangleZ },
          offset: Math.random() * Math.PI * 2,
          hue: hue,
          currentX: sphereX,
          currentY: sphereY,
          currentZ: sphereZ
        });
      }
    };

    const easeInOutCubic = (t) => {
      return t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;
    };

    const project3D = (x, y, z, centerX, centerY) => {
      const scale = 400 / (400 + z);
      return {
        x: centerX + x * scale,
        y: centerY + y * scale,
        scale: scale
      };
    };

    const startMorphing = () => {
      if (!isHovering) return;
      morphingRef.current = true;
      morphProgressRef.current = 0;
      const currentIndex = shapes.indexOf(currentShapeRef.current);
      const nextIndex = (currentIndex + 1) % shapes.length;
      targetShapeRef.current = shapes[nextIndex];
    };

    const animate = () => {
      timeRef.current += 0.016;
      
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2 - 80;

      ctx.fillStyle = '#0a0520';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Handle morphing
      if (morphingRef.current) {
        morphProgressRef.current += 0.012;
        if (morphProgressRef.current >= 1) {
          morphingRef.current = false;
          currentShapeRef.current = targetShapeRef.current;
          setDisplayShape(targetShapeRef.current.toUpperCase());
          morphProgressRef.current = 1;
          if (isHovering) {
            setTimeout(startMorphing, 100);
          }
        }
      }

      const easedProgress = easeInOutCubic(morphProgressRef.current);
      const rotationY = timeRef.current * 0.3;
      const rotationX = Math.sin(timeRef.current * 0.5) * 0.3;

      // Sort particles by Z for proper depth
      const sortedParticles = particlesRef.current.map((p, index) => {
        const startPos = p[`${currentShapeRef.current}Pos`];
        const endPos = p[`${targetShapeRef.current}Pos`];
        
        const wave = Math.sin(timeRef.current * 2 + p.offset) * 3;
        
        p.currentX = startPos.x + (endPos.x - startPos.x) * easedProgress + wave;
        p.currentY = startPos.y + (endPos.y - startPos.y) * easedProgress + wave;
        p.currentZ = startPos.z + (endPos.z - startPos.z) * easedProgress + wave;

        // Apply rotations
        let x = p.currentX;
        let y = p.currentY;
        let z = p.currentZ;

        // Rotate Y
        let tempX = x * Math.cos(rotationY) - z * Math.sin(rotationY);
        let tempZ = x * Math.sin(rotationY) + z * Math.cos(rotationY);
        x = tempX;
        z = tempZ;

        // Rotate X
        let tempY = y * Math.cos(rotationX) - z * Math.sin(rotationX);
        tempZ = y * Math.sin(rotationX) + z * Math.cos(rotationX);
        y = tempY;
        z = tempZ;

        return { ...p, x, y, z, index };
      }).sort((a, b) => b.z - a.z);

      // Draw particles
      sortedParticles.forEach(p => {
        const projected = project3D(p.x, p.y, p.z, centerX, centerY);
        
        const size = 2 * projected.scale;
        const alpha = 0.6 + projected.scale * 0.4;
        
        const gradient = ctx.createRadialGradient(
          projected.x, projected.y, 0,
          projected.x, projected.y, size * 3
        );
        
        gradient.addColorStop(0, `hsla(${p.hue}, 100%, 70%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${p.hue + 20}, 100%, 65%, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(projected.x, projected.y, size * 3, 0, Math.PI * 2);
        ctx.fill();
      });

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [isHovering]);

  useEffect(() => {
    if (isHovering) {
      setHarmony(1);
      const timer = setTimeout(() => {
        morphingRef.current = true;
        morphProgressRef.current = 0;
        const currentIndex = shapes.indexOf(currentShapeRef.current);
        const nextIndex = (currentIndex + 1) % shapes.length;
        targetShapeRef.current = shapes[nextIndex];
      }, 100);
      return () => clearTimeout(timer);
    } else {
      setHarmony(0);
    }
  }, [isHovering]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        onMouseEnter={() => setIsHovering(true)}
        onMouseLeave={() => setIsHovering(false)}
        className="absolute inset-0"
      />
      
      <div className="absolute inset-0 bg-gradient-to-b from-purple-950/10 via-transparent to-blue-950/10 pointer-events-none" />
      
      <div className="absolute top-8 left-20 space-y-3">
        <div 
          className="backdrop-blur-3xl bg-gradient-to-br from-indigo-900/10 to-purple-900/10 rounded-3xl border px-8 py-5 transition-all duration-500"
          style={{
            borderColor: `hsla(${220 + harmony * 100}, 80%, 60%, ${0.2 + harmony * 0.5})`,
            boxShadow: `0 0 ${30 + harmony * 50}px hsla(${220 + harmony * 100}, 80%, 60%, ${harmony * 0.4}),
                        inset 0 0 ${20 + harmony * 30}px hsla(${220 + harmony * 100}, 80%, 60%, ${harmony * 0.2})`
          }}
        >
          <div className="text-xs text-white/30 font-mono mb-3 tracking-wider">MORPHING HARMONY</div>
          <div className="flex items-center gap-4">
            <div className="flex-1 h-3 bg-black/60 rounded-full overflow-hidden backdrop-blur-sm">
              <div 
                className="h-full bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 rounded-full transition-all duration-300"
                style={{ 
                  width: `${harmony * 100}%`,
                  boxShadow: `0 0 ${15 + harmony * 20}px hsla(${200 + harmony * 100}, 100%, 60%, ${harmony})`
                }}
              />
            </div>
            <span className="text-lg font-bold text-white/90 font-mono w-14">
              {Math.round(harmony * 100)}%
            </span>
          </div>
        </div>
        
        <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-purple-400/30 px-6 py-3">
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
            <span className="text-sm text-purple-300/80 font-mono">
              SHAPE: {displayShape}
            </span>
          </div>
        </div>
      </div>
      
      <div className="absolute top-8 right-8 space-y-2 text-right">
        <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-cyan-400/20 px-5 py-2">
          <p className="text-cyan-300/60 text-xs font-mono">PARTICLES: 2000</p>
        </div>
        <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-blue-400/20 px-5 py-2">
          <p className="text-blue-300/60 text-xs font-mono">DIMENSIONS: 3D</p>
        </div>
        <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-purple-400/20 px-5 py-2">
          <p className="text-purple-300/60 text-xs font-mono">STATUS: {harmony > 0 ? 'ACTIVE' : 'IDLE'}</p>
        </div>
      </div>
    </div>
  );
}