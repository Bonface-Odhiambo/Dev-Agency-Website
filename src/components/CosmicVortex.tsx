import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const CosmicVortex = () => {
  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!containerRef.current) return;

    let scene: THREE.Scene;
    let camera: THREE.PerspectiveCamera;
    let renderer: THREE.WebGLRenderer;
    let rings: THREE.Points[] = [];
    let centerSphere: THREE.Mesh;
    let time = 0;
    let isHovering = false;
    let hoverIntensity = 0;
    let targetHoverIntensity = 0;
    let animationFrameId: number;

    const ringColors = [
      { r: 1.0, g: 0.2, b: 0.8 },  // Magenta
      { r: 0.5, g: 0.2, b: 1.0 },  // Purple
      { r: 0.2, g: 0.8, b: 1.0 },  // Cyan
      { r: 1.0, g: 0.6, b: 0.1 },  // Orange
      { r: 0.2, g: 1.0, b: 0.5 },  // Green
      { r: 1.0, g: 1.0, b: 0.2 },  // Yellow
      { r: 1.0, g: 0.3, b: 0.3 },  // Red
      { r: 0.3, g: 0.5, b: 1.0 },  // Blue
    ];

    const init = () => {
      scene = new THREE.Scene();
      scene.fog = new THREE.Fog(0x000000, 5, 15);

      camera = new THREE.PerspectiveCamera(
        75,
        containerRef.current!.clientWidth / containerRef.current!.clientHeight,
        0.1,
        1000
      );
      camera.position.z = 7;
      camera.position.y = 2;
      (camera as any).userData = { mouseInfluenceX: 0, mouseInfluenceY: 0 };

      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
      renderer.setSize(containerRef.current!.clientWidth, containerRef.current!.clientHeight);
      renderer.setClearColor(0x000000, 0);
      containerRef.current!.appendChild(renderer.domElement);

      const ambientLight = new THREE.AmbientLight(0x222244, 0.5);
      scene.add(ambientLight);

      createCenterSphere();
      createRings();
      createStarField();

      renderer.domElement.addEventListener('mouseenter', onMouseEnter);
      renderer.domElement.addEventListener('mouseleave', onMouseLeave);
      renderer.domElement.addEventListener('mousemove', onMouseMove);
    };

    const onMouseEnter = () => {
      isHovering = true;
      targetHoverIntensity = 1;
    };

    const onMouseLeave = () => {
      isHovering = false;
      targetHoverIntensity = 0;
    };

    const onMouseMove = (event: MouseEvent) => {
      if (!isHovering) return;

      const rect = renderer.domElement.getBoundingClientRect();
      const mouseX = ((event.clientX - rect.left) / rect.width) * 2 - 1;
      const mouseY = -((event.clientY - rect.top) / rect.height) * 2 + 1;

      (camera as any).userData.mouseInfluenceX = mouseX * 2;
      (camera as any).userData.mouseInfluenceY = mouseY * 2;
    };

    const createCenterSphere = () => {
      const geometry = new THREE.SphereGeometry(0.3, 32, 32);
      const material = new THREE.MeshBasicMaterial({
        color: 0xffffff,
        transparent: true,
        opacity: 0.9,
      });
      centerSphere = new THREE.Mesh(geometry, material);
      scene.add(centerSphere);

      // Add glow layers
      for (let i = 1; i <= 3; i++) {
        const glowGeometry = new THREE.SphereGeometry(0.3 + i * 0.15, 16, 16);
        const glowMaterial = new THREE.MeshBasicMaterial({
          color: new THREE.Color().setHSL(Math.random(), 1, 0.5),
          transparent: true,
          opacity: 0.3 / i,
          blending: THREE.AdditiveBlending,
          side: THREE.BackSide,
        });
        const glow = new THREE.Mesh(glowGeometry, glowMaterial);
        centerSphere.add(glow);
      }

      const centerLight = new THREE.PointLight(0xffffff, 2, 10);
      centerSphere.add(centerLight);
    };

    const createRings = () => {
      const ringCount = 8;

      for (let r = 0; r < ringCount; r++) {
        const radius = 1.2 + r * 0.5;
        const particleCount = 60 + r * 15;
        const color = ringColors[r % ringColors.length];

        const geometry = new THREE.BufferGeometry();
        const positions = new Float32Array(particleCount * 3);
        const colors = new Float32Array(particleCount * 3);

        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2;

          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = 0;
          positions[i * 3 + 2] = Math.sin(angle) * radius;

          const brightness = 0.7 + Math.random() * 0.3;
          colors[i * 3] = color.r * brightness;
          colors[i * 3 + 1] = color.g * brightness;
          colors[i * 3 + 2] = color.b * brightness;
        }

        geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
        geometry.setAttribute('color', new THREE.BufferAttribute(colors, 3));

        const material = new THREE.PointsMaterial({
          size: 0.15,
          vertexColors: true,
          transparent: true,
          opacity: 0.95,
          blending: THREE.AdditiveBlending,
          sizeAttenuation: true,
        });

        const ring = new THREE.Points(geometry, material);

        (ring as any).userData = {
          speedY: (0.2 + r * 0.08) * (r % 2 === 0 ? 1 : -1),
          speedX: (0.06 + r * 0.03) * (r % 3 === 0 ? 1 : -1),
          speedZ: (0.03 + r * 0.015) * (r % 2 === 1 ? 1 : -1),
          tiltX: (r / ringCount - 0.5) * Math.PI * 0.6,
          tiltZ: Math.sin(r) * 0.5,
          radius: radius,
          baseColor: color,
          particleCount: particleCount,
          waveOffset: r * 0.5,
        };

        ring.rotation.x = (ring as any).userData.tiltX;
        ring.rotation.z = (ring as any).userData.tiltZ;

        scene.add(ring);
        rings.push(ring);

        // Connection lines between rings
        if (r > 0) {
          createConnectionLines(rings[r - 1], ring, color);
        }

        const ringLight = new THREE.PointLight(
          new THREE.Color(color.r, color.g, color.b),
          1.5,
          radius * 2
        );
        ring.add(ringLight);
      }
    };

    const createConnectionLines = (ring1: any, ring2: any, color: any) => {
      const lineGeometry = new THREE.BufferGeometry();
      const linePositions = new Float32Array(20 * 6);
      const lineColors = new Float32Array(20 * 6);

      lineGeometry.setAttribute('position', new THREE.BufferAttribute(linePositions, 3));
      lineGeometry.setAttribute('color', new THREE.BufferAttribute(lineColors, 3));

      const lineMaterial = new THREE.LineBasicMaterial({
        vertexColors: true,
        transparent: true,
        opacity: 0.2,
        blending: THREE.AdditiveBlending,
      });

      const lines = new THREE.LineSegments(lineGeometry, lineMaterial);

      (lines as any).userData = {
        ring1: ring1,
        ring2: ring2,
        color: color,
      };

      scene.add(lines);
      ring2.userData.connectionLines = lines;
    };

    const updateConnectionLines = (ring: any) => {
      if (!ring.userData.connectionLines) return;

      const lines = ring.userData.connectionLines;
      const ring1 = (lines as any).userData.ring1;
      const ring2 = (lines as any).userData.ring2;

      const positions1 = ring1.geometry.attributes.position.array;
      const positions2 = ring2.geometry.attributes.position.array;
      const linePositions = lines.geometry.attributes.position.array;
      const lineColors = lines.geometry.attributes.color.array;

      const step = Math.floor(ring1.userData.particleCount / 10);

      for (let i = 0; i < 10; i++) {
        const idx1 = i * step * 3;
        const idx2 = i * step * 3;

        // Transform positions
        const pos1 = new THREE.Vector3(positions1[idx1], positions1[idx1 + 1], positions1[idx1 + 2]);
        const pos2 = new THREE.Vector3(positions2[idx2], positions2[idx2 + 1], positions2[idx2 + 2]);

        pos1.applyMatrix4(ring1.matrixWorld);
        pos2.applyMatrix4(ring2.matrixWorld);

        linePositions[i * 6] = pos1.x;
        linePositions[i * 6 + 1] = pos1.y;
        linePositions[i * 6 + 2] = pos1.z;
        linePositions[i * 6 + 3] = pos2.x;
        linePositions[i * 6 + 4] = pos2.y;
        linePositions[i * 6 + 5] = pos2.z;

        const color = (lines as any).userData.color;
        lineColors[i * 6] = color.r;
        lineColors[i * 6 + 1] = color.g;
        lineColors[i * 6 + 2] = color.b;
        lineColors[i * 6 + 3] = color.r;
        lineColors[i * 6 + 4] = color.g;
        lineColors[i * 6 + 5] = color.b;
      }

      lines.geometry.attributes.position.needsUpdate = true;
      lines.geometry.attributes.color.needsUpdate = true;
    };

    const createStarField = () => {
      const starGeometry = new THREE.BufferGeometry();
      const starCount = 500;
      const starPositions = new Float32Array(starCount * 3);
      const starColors = new Float32Array(starCount * 3);

      for (let i = 0; i < starCount; i++) {
        starPositions[i * 3] = (Math.random() - 0.5) * 50;
        starPositions[i * 3 + 1] = (Math.random() - 0.5) * 50;
        starPositions[i * 3 + 2] = (Math.random() - 0.5) * 50;

        const brightness = Math.random();
        starColors[i * 3] = brightness;
        starColors[i * 3 + 1] = brightness;
        starColors[i * 3 + 2] = brightness;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('color', new THREE.BufferAttribute(starColors, 3));

      const starMaterial = new THREE.PointsMaterial({
        size: 0.05,
        vertexColors: true,
        transparent: true,
        opacity: 0.6,
        blending: THREE.AdditiveBlending,
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      scene.add(stars);
    };

    const onWindowResize = () => {
      if (!containerRef.current) return;
      camera.aspect = containerRef.current.clientWidth / containerRef.current.clientHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(containerRef.current.clientWidth, containerRef.current.clientHeight);
    };

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);
      time += 0.016;

      hoverIntensity += (targetHoverIntensity - hoverIntensity) * 0.1;

      const centerScale = 1 + Math.sin(time * 3) * 0.1 + hoverIntensity * 0.3;
      centerSphere.scale.setScalar(centerScale);
      centerSphere.rotation.y += 0.02 + hoverIntensity * 0.03;

      centerSphere.children.forEach((glow, i) => {
        if ((glow as THREE.Mesh).material) {
          const hue = (time * 0.1 + i * 0.1 + hoverIntensity * 0.5) % 1;
          ((glow as THREE.Mesh).material as THREE.MeshBasicMaterial).color.setHSL(hue, 1, 0.5);
          ((glow as THREE.Mesh).material as THREE.MeshBasicMaterial).opacity =
            (0.3 / (i + 1)) * (1 + hoverIntensity * 0.5);
        }
      });

      rings.forEach((ring, index) => {
        const userData = (ring as any).userData;
        const speedMultiplier = 1 + hoverIntensity * 1.5;
        ring.rotation.y += userData.speedY * 0.015 * speedMultiplier;
        ring.rotation.x += userData.speedX * 0.012 * speedMultiplier;
        ring.rotation.z += userData.speedZ * 0.01 * speedMultiplier;

        const positions = ring.geometry.attributes.position.array as Float32Array;
        const colors = ring.geometry.attributes.color.array as Float32Array;
        const particleCount = userData.particleCount;

        for (let i = 0; i < particleCount; i++) {
          const angle = (i / particleCount) * Math.PI * 2;

          const waveAmplitude = 1 + hoverIntensity * 0.8;
          const wave1 = Math.sin(time * 2 + angle * 4 + userData.waveOffset) * 0.15 * waveAmplitude;
          const wave2 = Math.cos(time * 3 + angle * 2) * 0.1 * waveAmplitude;
          const pulse = Math.sin(time * 1.5 + index * 0.5) * 0.08 * waveAmplitude;

          const baseRadius = userData.radius;
          const radius = baseRadius + wave1 + wave2 + pulse;

          positions[i * 3] = Math.cos(angle) * radius;
          positions[i * 3 + 1] = wave1 * 0.5;
          positions[i * 3 + 2] = Math.sin(angle) * radius;

          const colorPulse = 0.7 + Math.sin(time * 3 + i * 0.1) * 0.3;
          const brightness = colorPulse * (1 + hoverIntensity * 0.5);
          colors[i * 3] = userData.baseColor.r * brightness;
          colors[i * 3 + 1] = userData.baseColor.g * brightness;
          colors[i * 3 + 2] = userData.baseColor.b * brightness;
        }

        ring.geometry.attributes.position.needsUpdate = true;
        ring.geometry.attributes.color.needsUpdate = true;

        ring.updateMatrixWorld();
        updateConnectionLines(ring);
      });

      const cameraRadius = 7 + Math.sin(time * 0.3) * 1 - hoverIntensity * 1.5;
      const baseX = Math.sin(time * 0.25) * cameraRadius;
      const baseZ = Math.cos(time * 0.25) * cameraRadius;
      const baseY = 2 + Math.sin(time * 0.2) * 1.5;

      camera.position.x = baseX + (camera as any).userData.mouseInfluenceX * hoverIntensity;
      camera.position.z = baseZ;
      camera.position.y = baseY + (camera as any).userData.mouseInfluenceY * hoverIntensity;
      camera.lookAt(0, 0, 0);

      renderer.render(scene, camera);
    };

    init();
    animate();
    window.addEventListener('resize', onWindowResize);

    return () => {
      window.removeEventListener('resize', onWindowResize);
      if (animationFrameId) cancelAnimationFrame(animationFrameId);
      if (renderer.domElement) {
        renderer.domElement.removeEventListener('mouseenter', onMouseEnter);
        renderer.domElement.removeEventListener('mouseleave', onMouseLeave);
        renderer.domElement.removeEventListener('mousemove', onMouseMove);
        containerRef.current?.removeChild(renderer.domElement);
      }
      renderer.dispose();
    };
  }, []);

  return <div ref={containerRef} className="w-full h-full" />;
};

export default CosmicVortex;
