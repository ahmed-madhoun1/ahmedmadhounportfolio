import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const Hero3DCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    let isDark = document.documentElement.classList.contains("dark");

    const width = container.clientWidth;
    const height = container.clientHeight;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(40, width / height, 0.1, 100);
    camera.position.set(isMobile ? 0 : 3.5, 0, isMobile ? 9 : 7.5);
    camera.lookAt(0, 0, 0);

    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: "low-power" });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch { return; }

    const getColors = (dark: boolean) => ({
      body: dark ? 0x1a1a2e : 0xdde3f0,
      screen: dark ? 0x0f172a : 0x1e293b,
      screenGlow: dark ? 0x3b82f6 : 0x2563eb,
      button: dark ? 0x374151 : 0x94a3b8,
      particle: dark ? 0x60a5fa : 0x3b82f6,
      ambientLight: dark ? 0x1e2a4a : 0xd0d8f0,
      keyLight: dark ? 0x7dd3fc : 0x2563eb,
      fillLight: dark ? 0xa78bfa : 0x7c3aed,
      rimLight: dark ? 0x38bdf8 : 0x0284c7,
    });

    let col = getColors(isDark);

    const ambient = new THREE.AmbientLight(col.ambientLight, isDark ? 3 : 2.5);
    scene.add(ambient);
    const key = new THREE.DirectionalLight(col.keyLight, isDark ? 5 : 4);
    key.position.set(4, 6, 6);
    scene.add(key);
    const fill = new THREE.DirectionalLight(col.fillLight, isDark ? 2.5 : 2);
    fill.position.set(-5, -3, 3);
    scene.add(fill);
    const rim = new THREE.DirectionalLight(col.rimLight, isDark ? 3 : 2.5);
    rim.position.set(-3, 4, -4);
    scene.add(rim);
    const screenPointLight = new THREE.PointLight(col.screenGlow, isDark ? 4 : 3, 4);
    screenPointLight.position.set(0, 0, 1.2);
    scene.add(screenPointLight);

    const phoneGroup = new THREE.Group();
    phoneGroup.rotation.set(0.08, -0.35, 0.06);
    scene.add(phoneGroup);

    const PW = 1.0, PH = 2.1, PD = 0.11;

    const bodyGeo = new THREE.BoxGeometry(PW, PH, PD, 1, 1, 1);
    const bodyMat = new THREE.MeshStandardMaterial({ color: col.body, roughness: 0.12, metalness: 0.85 });
    const bodyMesh = new THREE.Mesh(bodyGeo, bodyMat);
    phoneGroup.add(bodyMesh);

    const bezelW = PW * 0.88, bezelH = PH * 0.91;
    const bezelGeo = new THREE.BoxGeometry(bezelW, bezelH, 0.005);
    const bezelMat = new THREE.MeshStandardMaterial({
      color: col.screen, roughness: 0.05, metalness: 0.1,
      emissive: col.screenGlow, emissiveIntensity: isDark ? 0.12 : 0.08,
    });
    const bezelMesh = new THREE.Mesh(bezelGeo, bezelMat);
    bezelMesh.position.set(0, 0, PD / 2 + 0.003);
    phoneGroup.add(bezelMesh);

    const screenW = bezelW * 0.95, screenH = bezelH * 0.96;
    const screenGeo = new THREE.PlaneGeometry(screenW, screenH);

    const screenCanvas = document.createElement("canvas");
    screenCanvas.width = 256; screenCanvas.height = 512;
    const ctx = screenCanvas.getContext("2d")!;

    const drawScreen = (dark: boolean) => {
      const bg = ctx.createLinearGradient(0, 0, 0, 512);
      bg.addColorStop(0, dark ? "#0f172a" : "#1e293b");
      bg.addColorStop(1, dark ? "#1e1b4b" : "#0f172a");
      ctx.fillStyle = bg;
      ctx.fillRect(0, 0, 256, 512);

      ctx.fillStyle = dark ? "rgba(96,165,250,0.6)" : "rgba(59,130,246,0.6)";
      ctx.fillRect(20, 18, 60, 4);
      ctx.fillRect(176, 18, 60, 4);

      const appColors = [
        ["#3b82f6","#8b5cf6","#10b981","#f59e0b"],
        ["#ef4444","#06b6d4","#f97316","#6366f1"],
        ["#14b8a6","#ec4899","#84cc16","#f43f5e"],
      ];
      appColors.forEach((row, ri) => {
        row.forEach((c, ci) => {
          const x = 28 + ci * 54, y = 100 + ri * 72;
          ctx.beginPath();
          (ctx as any).roundRect(x, y, 42, 42, 10);
          ctx.fillStyle = c; ctx.fill();
          ctx.fillStyle = "rgba(255,255,255,0.25)";
          ctx.beginPath();
          (ctx as any).roundRect(x+4, y+4, 20, 12, 4);
          ctx.fill();
        });
      });

      ctx.fillStyle = dark ? "rgba(30,41,59,0.9)" : "rgba(15,23,42,0.9)";
      ctx.fillRect(20, 420, 216, 56);
      ctx.strokeStyle = dark ? "rgba(96,165,250,0.3)" : "rgba(59,130,246,0.3)";
      ctx.lineWidth = 1;
      ctx.strokeRect(20, 420, 216, 56);
      [50,90,130,170,210].forEach((x, i) => {
        ctx.beginPath();
        ctx.arc(x, 448, 7, 0, Math.PI*2);
        ctx.fillStyle = i===2 ? "#3b82f6" : "rgba(148,163,184,0.6)";
        ctx.fill();
      });

      const grd = ctx.createLinearGradient(0, 360, 256, 360);
      grd.addColorStop(0, "transparent");
      grd.addColorStop(0.5, dark ? "rgba(96,165,250,0.5)" : "rgba(59,130,246,0.5)");
      grd.addColorStop(1, "transparent");
      ctx.fillStyle = grd;
      ctx.fillRect(0, 358, 256, 2);
    };

    drawScreen(isDark);
    const screenTexture = new THREE.CanvasTexture(screenCanvas);
    const screenMat = new THREE.MeshStandardMaterial({
      map: screenTexture, roughness: 0.04, metalness: 0.0,
      emissive: col.screenGlow, emissiveIntensity: isDark ? 0.18 : 0.1,
    });
    const screenMesh = new THREE.Mesh(screenGeo, screenMat);
    screenMesh.position.set(0, 0, PD / 2 + 0.008);
    phoneGroup.add(screenMesh);

    const notchGeo = new THREE.CylinderGeometry(0.055, 0.055, 0.2, 20);
    notchGeo.rotateZ(Math.PI / 2);
    const notchMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.1, metalness: 0.5 });
    const notchMesh = new THREE.Mesh(notchGeo, notchMat);
    notchMesh.position.set(0, PH * 0.44, PD / 2 + 0.006);
    phoneGroup.add(notchMesh);

    const camGeo = new THREE.SphereGeometry(0.028, 12, 12);
    const camMat = new THREE.MeshStandardMaterial({ color: 0x111827, roughness: 0.1, metalness: 0.9 });
    const camMesh = new THREE.Mesh(camGeo, camMat);
    camMesh.position.set(0.085, PH * 0.44, PD / 2 + 0.01);
    phoneGroup.add(camMesh);

    const btnMat = new THREE.MeshStandardMaterial({ color: col.button, roughness: 0.2, metalness: 0.7 });
    const powerGeo = new THREE.BoxGeometry(0.03, 0.22, 0.05);
    const powerBtn = new THREE.Mesh(powerGeo, btnMat);
    powerBtn.position.set(PW / 2 + 0.015, 0.2, 0);
    phoneGroup.add(powerBtn);
    [-0.25, 0.05, 0.3].forEach((y) => {
      const volGeo = new THREE.BoxGeometry(0.03, 0.15, 0.05);
      const vol = new THREE.Mesh(volGeo, btnMat);
      vol.position.set(-PW / 2 - 0.015, y, 0);
      phoneGroup.add(vol);
    });

    const rearIslandGeo = new THREE.BoxGeometry(0.38, 0.38, 0.04);
    const rearIslandMat = new THREE.MeshStandardMaterial({ color: isDark ? 0x111827 : 0xbbc5d9, roughness: 0.05, metalness: 0.9 });
    const rearIsland = new THREE.Mesh(rearIslandGeo, rearIslandMat);
    rearIsland.position.set(-0.2, PH * 0.33, -PD / 2 - 0.02);
    phoneGroup.add(rearIsland);

    [[0, 0.08], [0.12, -0.05], [-0.12, -0.05]].forEach(([ox, oy]) => {
      const lensGeo = new THREE.CylinderGeometry(0.06, 0.06, 0.025, 20);
      lensGeo.rotateX(Math.PI / 2);
      const lensMat = new THREE.MeshStandardMaterial({ color: 0x0a0a0a, roughness: 0.05, metalness: 0.95 });
      const lens = new THREE.Mesh(lensGeo, lensMat);
      lens.position.set(-0.2 + ox, PH * 0.33 + oy, -PD / 2 - 0.035);
      phoneGroup.add(lens);
      const glassGeo = new THREE.CylinderGeometry(0.04, 0.04, 0.01, 20);
      glassGeo.rotateX(Math.PI / 2);
      const glassMat = new THREE.MeshStandardMaterial({ color: 0x3b5bdb, roughness: 0.0, metalness: 0.3, transparent: true, opacity: 0.7 });
      const glass = new THREE.Mesh(glassGeo, glassMat);
      glass.position.set(-0.2 + ox, PH * 0.33 + oy, -PD / 2 - 0.042);
      phoneGroup.add(glass);
    });

    const particleCount = isMobile ? 40 : 80;
    const pPositions = new Float32Array(particleCount * 3);
    const pSpeeds: { angle: number; radius: number; ySpeed: number; yOff: number }[] = [];
    for (let i = 0; i < particleCount; i++) {
      const angle = Math.random() * Math.PI * 2;
      const radius = 1.8 + Math.random() * 2.2;
      const yOff = (Math.random() - 0.5) * 4;
      pPositions[i*3] = Math.cos(angle) * radius;
      pPositions[i*3+1] = yOff;
      pPositions[i*3+2] = Math.sin(angle) * radius;
      pSpeeds.push({ angle, radius, ySpeed: (Math.random() - 0.5) * 0.005, yOff });
    }
    const pGeo = new THREE.BufferGeometry();
    pGeo.setAttribute("position", new THREE.BufferAttribute(pPositions, 3));
    const pMat = new THREE.PointsMaterial({ color: col.particle, size: isMobile ? 0.028 : 0.022, transparent: true, opacity: isDark ? 0.7 : 0.5, sizeAttenuation: true });
    const particlesMesh = new THREE.Points(pGeo, pMat);
    scene.add(particlesMesh);

    const ringGeo = new THREE.TorusGeometry(2.0, 0.012, 8, 80);
    const ringMat = new THREE.MeshBasicMaterial({ color: col.screenGlow, transparent: true, opacity: isDark ? 0.35 : 0.2 });
    const ring = new THREE.Mesh(ringGeo, ringMat);
    ring.rotation.x = Math.PI / 2.5;
    ring.rotation.z = 0.3;
    scene.add(ring);

    const ring2Geo = new THREE.TorusGeometry(2.6, 0.008, 8, 80);
    const ring2Mat = new THREE.MeshBasicMaterial({ color: 0xa78bfa, transparent: true, opacity: isDark ? 0.22 : 0.12 });
    const ring2 = new THREE.Mesh(ring2Geo, ring2Mat);
    ring2.rotation.x = -Math.PI / 3;
    ring2.rotation.y = Math.PI / 5;
    scene.add(ring2);

    let targetRotX = 0, targetRotY = 0;
    const handlePointerMove = (e: MouseEvent) => {
      targetRotY = (e.clientX / window.innerWidth - 0.5) * 2 * 0.3;
      targetRotX = (e.clientY / window.innerHeight - 0.5) * 2 * 0.2;
    };
    if (!isMobile && !prefersReducedMotion) window.addEventListener("pointermove", handlePointerMove, { passive: true });

    const observer = new MutationObserver(() => {
      const newDark = document.documentElement.classList.contains("dark");
      if (newDark !== isDark) {
        isDark = newDark;
        col = getColors(isDark);
        bodyMat.color.setHex(col.body);
        bezelMat.emissive.setHex(col.screenGlow);
        bezelMat.emissiveIntensity = isDark ? 0.12 : 0.08;
        screenMat.emissive.setHex(col.screenGlow);
        screenMat.emissiveIntensity = isDark ? 0.18 : 0.1;
        btnMat.color.setHex(col.button);
        ringMat.color.setHex(col.screenGlow);
        ringMat.opacity = isDark ? 0.35 : 0.2;
        ring2Mat.opacity = isDark ? 0.22 : 0.12;
        pMat.color.setHex(col.particle);
        pMat.opacity = isDark ? 0.7 : 0.5;
        ambient.color.setHex(col.ambientLight);
        ambient.intensity = isDark ? 3 : 2.5;
        key.color.setHex(col.keyLight);
        fill.color.setHex(col.fillLight);
        rim.color.setHex(col.rimLight);
        screenPointLight.color.setHex(col.screenGlow);
        screenPointLight.intensity = isDark ? 4 : 3;
        drawScreen(isDark);
        screenTexture.needsUpdate = true;
      }
    });
    observer.observe(document.documentElement, { attributes: true, attributeFilter: ["class"] });

    const handleResize = () => {
      if (!container || !renderer) return;
      const w = container.clientWidth, h = container.clientHeight;
      camera.aspect = w / h;
      const mob = window.innerWidth < 768;
      camera.position.set(mob ? 0 : 3.5, 0, mob ? 9 : 7.5);
      camera.updateProjectionMatrix();
      renderer.setSize(w, h);
    };
    window.addEventListener("resize", handleResize, { passive: true });

    let isVisible = true;
    const intersectionObs = new IntersectionObserver(
      (entries) => { entries.forEach((e) => { isVisible = e.isIntersecting; }); },
      { threshold: 0.05 }
    );
    intersectionObs.observe(container);

    renderer.render(scene, camera);
    setIsLoaded(true);

    let lastTime = performance.now();
    let animationFrameId: number;
    let floatT = 0;

    const animate = (time: number = performance.now()) => {
      animationFrameId = requestAnimationFrame(animate);
      if (!isVisible || !renderer) return;

      if (!prefersReducedMotion) {
        const delta = Math.min((time - lastTime) / 1000, 0.1);
        lastTime = time;
        floatT += delta;

        phoneGroup.position.y = Math.sin(floatT * 0.8) * 0.12;
        phoneGroup.rotation.y += (targetRotY + Math.sin(floatT * 0.3) * 0.08 - phoneGroup.rotation.y) * 0.04;
        phoneGroup.rotation.x += (targetRotX + Math.sin(floatT * 0.5) * 0.04 - phoneGroup.rotation.x) * 0.04;

        ring.rotation.z += delta * 0.12;
        ring2.rotation.z -= delta * 0.09;

        const pos = pGeo.attributes.position as THREE.BufferAttribute;
        for (let i = 0; i < particleCount; i++) {
          pSpeeds[i].angle += 0.0015 + (i % 3) * 0.0008;
          pSpeeds[i].yOff += pSpeeds[i].ySpeed;
          if (Math.abs(pSpeeds[i].yOff) > 2.5) pSpeeds[i].ySpeed *= -1;
          pos.setXYZ(i, Math.cos(pSpeeds[i].angle) * pSpeeds[i].radius, pSpeeds[i].yOff, Math.sin(pSpeeds[i].angle) * pSpeeds[i].radius);
        }
        pos.needsUpdate = true;
      }

      renderer.render(scene, camera);
    };

    if (!prefersReducedMotion) animate();

    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      intersectionObs.disconnect();
      [bodyGeo, bodyMat, bezelGeo, bezelMat, screenGeo, screenMat,
        notchGeo, notchMat, camGeo, camMat, powerGeo, btnMat,
        rearIslandGeo, rearIslandMat, pGeo, pMat, ringGeo, ringMat,
        ring2Geo, ring2Mat, screenTexture].forEach((item: any) => {
        if (item && typeof item.dispose === "function") item.dispose();
      });
      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-0 transition-opacity duration-1000 ${isLoaded ? "opacity-100" : "opacity-0"}`}
    />
  );
};

export default Hero3DCanvas;
