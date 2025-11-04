import React, { useEffect, useRef, useState } from 'react';

export default function CelestialSymphony() {
  const canvasRef = useRef(null);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [harmony, setHarmony] = useState(0);
  const [activeNotes, setActiveNotes] = useState([]);
  const starsRef = useRef([]);
  const orbitsRef = useRef([]);
  const cometsRef = useRef([]);
  const timeRef = useRef(0);

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    let animationId;

    const resizeCanvas = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      initCelestialBodies();
    };

    const initCelestialBodies = () => {
      starsRef.current = [];
      orbitsRef.current = [];
      cometsRef.current = [];
      
      // Create star field
      for (let i = 0; i < 800; i++) {
        starsRef.current.push({
          x: Math.random() * canvas.width,
          y: Math.random() * canvas.height,
          z: Math.random() * 1000,
          size: Math.random() * 2,
          twinkleSpeed: Math.random() * 0.05 + 0.01,
          twinkleOffset: Math.random() * Math.PI * 2,
          color: Math.random() * 60 + 180 // Blue to cyan range
        });
      }
      
      // Create orbital systems
      const centerX = canvas.width / 2;
      const centerY = canvas.height / 2;
      
      for (let i = 0; i < 8; i++) {
        const radius = 100 + i * 60;
        const orbitals = 3 + i;
        
        for (let j = 0; j < orbitals; j++) {
          orbitsRef.current.push({
            centerX,
            centerY,
            radius,
            angle: (j / orbitals) * Math.PI * 2,
            speed: 0.0005 * (9 - i),
            size: 4 + Math.random() * 3,
            color: (i * 45) % 360,
            trail: [],
            maxTrail: 30,
            pulse: Math.random() * Math.PI * 2,
            note: i
          });
        }
      }
      
      // Create comets
      for (let i = 0; i < 3; i++) {
        cometsRef.current.push({
          x: Math.random() * canvas.width,
          y: -100,
          vx: (Math.random() - 0.5) * 3,
          vy: Math.random() * 2 + 2,
          size: Math.random() * 4 + 3,
          tail: [],
          maxTail: 50,
          color: Math.random() * 360,
          glow: Math.random() * 20 + 20
        });
      }
    };

    const drawStar = (star, time) => {
      const z = star.z + time * 50;
      const depth = 1000 / (z % 1000 + 1);
      
      const screenX = star.x + (star.x - canvas.width / 2) * depth * 0.5;
      const screenY = star.y + (star.y - canvas.height / 2) * depth * 0.5;
      
      const twinkle = Math.sin(time * star.twinkleSpeed + star.twinkleOffset) * 0.5 + 0.5;
      const alpha = depth * twinkle;
      const size = star.size * depth;
      
      const gradient = ctx.createRadialGradient(screenX, screenY, 0, screenX, screenY, size * 3);
      gradient.addColorStop(0, `hsla(${star.color}, 100%, 90%, ${alpha})`);
      gradient.addColorStop(0.5, `hsla(${star.color}, 100%, 70%, ${alpha * 0.5})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(screenX, screenY, size * 3, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawOrbital = (orbital, time) => {
      const x = orbital.centerX + Math.cos(orbital.angle) * orbital.radius;
      const y = orbital.centerY + Math.sin(orbital.angle) * orbital.radius;
      
      orbital.trail.unshift({ x, y });
      if (orbital.trail.length > orbital.maxTrail) orbital.trail.pop();
      
      // Draw trail
      orbital.trail.forEach((pos, i) => {
        const alpha = (1 - i / orbital.maxTrail) * 0.3;
        const size = orbital.size * (1 - i / orbital.maxTrail) * 0.5;
        
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 4);
        gradient.addColorStop(0, `hsla(${orbital.color}, 100%, 70%, ${alpha})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * 4, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw orbital body
      const pulse = Math.sin(time * 2 + orbital.pulse) * 0.3 + 1;
      const size = orbital.size * pulse;
      
      const gradient = ctx.createRadialGradient(x, y, 0, x, y, size * 5);
      gradient.addColorStop(0, `hsla(${orbital.color}, 100%, 90%, 1)`);
      gradient.addColorStop(0.3, `hsla(${orbital.color + 30}, 100%, 80%, 0.8)`);
      gradient.addColorStop(0.6, `hsla(${orbital.color + 60}, 100%, 70%, 0.4)`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(x, y, size * 5, 0, Math.PI * 2);
      ctx.fill();
      
      // Core
      ctx.fillStyle = `hsla(${orbital.color}, 100%, 95%, 1)`;
      ctx.beginPath();
      ctx.arc(x, y, size * 0.8, 0, Math.PI * 2);
      ctx.fill();
      
      return { x, y };
    };

    const drawOrbitPath = (orbital, opacity) => {
      ctx.strokeStyle = `hsla(${orbital.color}, 70%, 60%, ${opacity * 0.1})`;
      ctx.lineWidth = 1;
      ctx.beginPath();
      ctx.arc(orbital.centerX, orbital.centerY, orbital.radius, 0, Math.PI * 2);
      ctx.stroke();
    };

    const drawComet = (comet) => {
      comet.tail.unshift({ x: comet.x, y: comet.y });
      if (comet.tail.length > comet.maxTail) comet.tail.pop();
      
      // Draw tail
      comet.tail.forEach((pos, i) => {
        const alpha = (1 - i / comet.maxTail) * 0.5;
        const size = comet.size * (1 - i / comet.maxTail);
        
        const gradient = ctx.createRadialGradient(pos.x, pos.y, 0, pos.x, pos.y, size * 8);
        gradient.addColorStop(0, `hsla(${comet.color}, 100%, 80%, ${alpha})`);
        gradient.addColorStop(0.5, `hsla(${comet.color + 40}, 100%, 70%, ${alpha * 0.5})`);
        gradient.addColorStop(1, 'transparent');
        
        ctx.fillStyle = gradient;
        ctx.beginPath();
        ctx.arc(pos.x, pos.y, size * 8, 0, Math.PI * 2);
        ctx.fill();
      });
      
      // Draw comet head
      const gradient = ctx.createRadialGradient(comet.x, comet.y, 0, comet.x, comet.y, comet.glow);
      gradient.addColorStop(0, `hsla(${comet.color}, 100%, 95%, 1)`);
      gradient.addColorStop(0.3, `hsla(${comet.color + 20}, 100%, 85%, 0.8)`);
      gradient.addColorStop(0.7, `hsla(${comet.color + 40}, 100%, 75%, 0.4)`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(comet.x, comet.y, comet.glow, 0, Math.PI * 2);
      ctx.fill();
    };

    const drawNebula = (centerX, centerY, radius, hue, alpha) => {
      const gradient = ctx.createRadialGradient(centerX, centerY, 0, centerX, centerY, radius);
      gradient.addColorStop(0, `hsla(${hue}, 80%, 60%, ${alpha * 0.05})`);
      gradient.addColorStop(0.4, `hsla(${hue + 30}, 70%, 55%, ${alpha * 0.03})`);
      gradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = gradient;
      ctx.beginPath();
      ctx.arc(centerX, centerY, radius, 0, Math.PI * 2);
      ctx.fill();
    };

    const animate = () => {
      timeRef.current += 0.016;
      
      // Deep space background
      const bgGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, canvas.width / 2
      );
      bgGradient.addColorStop(0, '#0a0520');
      bgGradient.addColorStop(1, '#000000');
      ctx.fillStyle = bgGradient;
      ctx.fillRect(0, 0, canvas.width, canvas.height);
      
      // Draw nebulae
      const nebulaHue = (timeRef.current * 10) % 360;
      drawNebula(canvas.width * 0.3, canvas.height * 0.3, 400, nebulaHue, 1);
      drawNebula(canvas.width * 0.7, canvas.height * 0.7, 350, nebulaHue + 120, 0.8);
      drawNebula(canvas.width * 0.5, canvas.height * 0.5, 500, nebulaHue + 240, 0.6);
      
      // Draw stars
      starsRef.current.forEach(star => drawStar(star, timeRef.current));
      
      // Draw orbit paths
      orbitsRef.current.forEach(orbital => {
        const dx = mousePos.x - orbital.centerX;
        const dy = mousePos.y - orbital.centerY;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const proximity = Math.max(0, 1 - dist / 400);
        
        drawOrbitPath(orbital, proximity);
      });
      
      // Calculate harmony
      let totalHarmony = 0;
      const notes = [];
      
      // Update and draw orbitals
      orbitsRef.current.forEach(orbital => {
        orbital.angle += orbital.speed;
        const pos = drawOrbital(orbital, timeRef.current);
        
        const dx = mousePos.x - pos.x;
        const dy = mousePos.y - pos.y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        
        if (dist < 100) {
          totalHarmony += (100 - dist) / 100;
          notes.push(orbital.note);
          
          // Draw resonance wave
          for (let i = 0; i < 3; i++) {
            const waveRadius = ((timeRef.current * 100 + i * 30) % 100);
            const waveAlpha = (1 - waveRadius / 100) * 0.3;
            
            ctx.strokeStyle = `hsla(${orbital.color}, 100%, 70%, ${waveAlpha})`;
            ctx.lineWidth = 2;
            ctx.beginPath();
            ctx.arc(pos.x, pos.y, waveRadius, 0, Math.PI * 2);
            ctx.stroke();
          }
        }
      });
      
      setHarmony(Math.min(1, totalHarmony / 5));
      setActiveNotes([...new Set(notes)]);
      
      // Update and draw comets
      cometsRef.current.forEach(comet => {
        comet.x += comet.vx;
        comet.y += comet.vy;
        comet.vy += 0.05; // Gravity
        
        drawComet(comet);
        
        // Reset comet if off screen
        if (comet.y > canvas.height + 100) {
          comet.x = Math.random() * canvas.width;
          comet.y = -100;
          comet.vx = (Math.random() - 0.5) * 3;
          comet.vy = Math.random() * 2 + 2;
          comet.color = Math.random() * 360;
          comet.tail = [];
        }
      });
      
      // Draw central star
      const centralPulse = Math.sin(timeRef.current * 0.5) * 0.2 + 1;
      drawNebula(canvas.width / 2, canvas.height / 2, 80 * centralPulse, nebulaHue, 2);
      
      const centerGradient = ctx.createRadialGradient(
        canvas.width / 2, canvas.height / 2, 0,
        canvas.width / 2, canvas.height / 2, 30 * centralPulse
      );
      centerGradient.addColorStop(0, `hsla(${nebulaHue}, 100%, 95%, 1)`);
      centerGradient.addColorStop(0.5, `hsla(${nebulaHue + 40}, 100%, 85%, 0.8)`);
      centerGradient.addColorStop(1, 'transparent');
      
      ctx.fillStyle = centerGradient;
      ctx.beginPath();
      ctx.arc(canvas.width / 2, canvas.height / 2, 30 * centralPulse, 0, Math.PI * 2);
      ctx.fill();

      animationId = requestAnimationFrame(animate);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);
    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      cancelAnimationFrame(animationId);
    };
  }, [mousePos]);

  return (
    <div className="relative w-full h-screen overflow-hidden bg-black">
      <canvas
        ref={canvasRef}
        onMouseMove={(e) => setMousePos({ x: e.clientX, y: e.clientY })}
        className="absolute inset-0"
      />
      

      
      <div className="absolute top-8 left-8 space-y-3">
        <div 
          className="backdrop-blur-3xl bg-gradient-to-br from-indigo-900/10 to-purple-900/10 rounded-3xl border px-8 py-5 transition-all duration-500"
          style={{
            borderColor: `hsla(${220 + harmony * 100}, 80%, 60%, ${0.2 + harmony * 0.5})`,
            boxShadow: `0 0 ${30 + harmony * 50}px hsla(${220 + harmony * 100}, 80%, 60%, ${harmony * 0.4}),
                        inset 0 0 ${20 + harmony * 30}px hsla(${220 + harmony * 100}, 80%, 60%, ${harmony * 0.2})`
          }}
        >
          <div className="text-xs text-white/30 font-mono mb-3 tracking-wider">COSMIC HARMONY</div>
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
        
        {activeNotes.length > 0 && (
          <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-purple-400/30 px-6 py-3">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-purple-400 animate-pulse" />
              <span className="text-sm text-purple-300/80 font-mono">
                NOTES: {activeNotes.sort().join(', ')}
              </span>
            </div>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 pointer-events-none">
        <p className="text-white/20 text-sm tracking-[0.4em] font-light animate-pulse">
          TOUCH THE STARS TO HEAR THEIR SONG
        </p>
      </div>
      
      <div className="absolute top-8 right-8 space-y-2 text-right">
        <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-cyan-400/20 px-5 py-2">
          <p className="text-cyan-300/60 text-xs font-mono">STARS: 800</p>
        </div>
        <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-blue-400/20 px-5 py-2">
          <p className="text-blue-300/60 text-xs font-mono">ORBITALS: 44</p>
        </div>
        <div className="backdrop-blur-3xl bg-black/20 rounded-2xl border border-purple-400/20 px-5 py-2">
          <p className="text-purple-300/60 text-xs font-mono">COMETS: 3</p>
        </div>
      </div>
    </div>
  );
}