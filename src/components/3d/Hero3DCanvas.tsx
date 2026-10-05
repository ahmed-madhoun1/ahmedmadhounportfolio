import { useEffect, useRef, useState } from "react";
import * as THREE from "three";

export const Hero3DCanvas = () => {
  const containerRef = useRef<HTMLDivElement>(null);
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    // Check prefers-reduced-motion
    const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const isMobile = window.innerWidth < 768;

    // Check dark mode
    let isDark = document.documentElement.classList.contains("dark");

    // Dimensions
    const width = container.clientWidth;
    const height = container.clientHeight;

    // Scene & Camera
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(45, width / height, 0.1, 100);
    camera.position.z = isMobile ? 8.5 : 7.2;

    // Renderer
    let renderer: THREE.WebGLRenderer | null = null;
    try {
      renderer = new THREE.WebGLRenderer({
        alpha: true,
        antialias: true,
        powerPreference: "low-power",
      });
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.75));
      renderer.setSize(width, height);
      renderer.outputColorSpace = THREE.SRGBColorSpace;
      container.appendChild(renderer.domElement);
    } catch {
      // Fallback silently if WebGL is unavailable
      return;
    }

    // Material & Color definitions based on theme
    const getColors = (dark: boolean) => ({
      innerCore: dark ? 0x1f2430 : 0xf1f5f9,
      wireframe: dark ? 0x60a5fa : 0x3b82f6,
      orbitRing1: dark ? 0x38bdf8 : 0x0284c7,
      orbitRing2: dark ? 0x818cf8 : 0x6366f1,
      satellites: dark ? 0x93c5fd : 0x2563eb,
      ambientLight: dark ? 0x222938 : 0xffffff,
      keyLight: dark ? 0x60a5fa : 0x2563eb,
      fillLight: dark ? 0xc084fc : 0x9333ea,
    });

    let currentColors = getColors(isDark);

    // Lights
    const ambientLight = new THREE.AmbientLight(currentColors.ambientLight, isDark ? 2.5 : 2.0);
    scene.add(ambientLight);

    const keyLight = new THREE.DirectionalLight(currentColors.keyLight, isDark ? 3.5 : 2.5);
    keyLight.position.set(5, 6, 7);
    scene.add(keyLight);

    const fillLight = new THREE.DirectionalLight(currentColors.fillLight, isDark ? 2.0 : 1.5);
    fillLight.position.set(-6, -4, 4);
    scene.add(fillLight);

    // Root Group
    const rootGroup = new THREE.Group();
    // Slightly shift back to give spacious feel
    rootGroup.position.set(0, 0, 0);
    scene.add(rootGroup);

    // 1. Faceted Inner Core (Geometric Low-Poly Crystal)
    const coreGeo = new THREE.IcosahedronGeometry(isMobile ? 1.2 : 1.45, 0);
    const coreMat = new THREE.MeshStandardMaterial({
      color: currentColors.innerCore,
      roughness: 0.15,
      metalness: 0.9,
      flatShading: true,
      transparent: true,
      opacity: isDark ? 0.88 : 0.75,
    });
    const coreMesh = new THREE.Mesh(coreGeo, coreMat);
    rootGroup.add(coreMesh);

    // 2. Outer Geodesic Wireframe Cage
    const wireGeo = new THREE.IcosahedronGeometry(isMobile ? 1.85 : 2.25, 1);
    const wireframeGeo = new THREE.WireframeGeometry(wireGeo);
    const wireMat = new THREE.LineBasicMaterial({
      color: currentColors.wireframe,
      transparent: true,
      opacity: isDark ? 0.35 : 0.25,
      linewidth: 1,
    });
    const wireMesh = new THREE.LineSegments(wireframeGeo, wireMat);
    rootGroup.add(wireMesh);

    // 3. Gyroscopic Orbital Rings
    const ringGeo1 = new THREE.TorusGeometry(isMobile ? 2.2 : 2.7, 0.015, 8, 64);
    const ringMat1 = new THREE.MeshBasicMaterial({
      color: currentColors.orbitRing1,
      transparent: true,
      opacity: isDark ? 0.45 : 0.3,
    });
    const ringMesh1 = new THREE.Mesh(ringGeo1, ringMat1);
    ringMesh1.rotation.x = Math.PI / 3;
    ringMesh1.rotation.y = Math.PI / 6;
    rootGroup.add(ringMesh1);

    const ringGeo2 = new THREE.TorusGeometry(isMobile ? 2.6 : 3.15, 0.012, 8, 64);
    const ringMat2 = new THREE.MeshBasicMaterial({
      color: currentColors.orbitRing2,
      transparent: true,
      opacity: isDark ? 0.35 : 0.22,
    });
    const ringMesh2 = new THREE.Mesh(ringGeo2, ringMat2);
    ringMesh2.rotation.x = -Math.PI / 4;
    ringMesh2.rotation.y = Math.PI / 3;
    rootGroup.add(ringMesh2);

    // 4. Subtle Satellite Constellation
    const satelliteGroup = new THREE.Group();
    const satelliteCount = isMobile ? 8 : 16;
    const satGeo = new THREE.OctahedronGeometry(0.045, 0);
    const satMat = new THREE.MeshStandardMaterial({
      color: currentColors.satellites,
      roughness: 0.2,
      metalness: 0.8,
      flatShading: true,
    });

    const satellites: { mesh: THREE.Mesh; angle: number; speed: number; radius: number; yOffset: number }[] = [];
    for (let i = 0; i < satelliteCount; i++) {
      const satMesh = new THREE.Mesh(satGeo, satMat);
      const angle = (i / satelliteCount) * Math.PI * 2;
      const radius = 2.1 + (i % 3) * 0.45;
      const yOffset = ((i % 5) - 2) * 0.35;
      satelliteGroup.add(satMesh);
      satellites.push({
        mesh: satMesh,
        angle,
        speed: 0.003 + (i % 3) * 0.002,
        radius,
        yOffset,
      });
    }
    rootGroup.add(satelliteGroup);

    // Interaction variables
    let mouseX = 0;
    let mouseY = 0;
    let targetRotX = 0;
    let targetRotY = 0;
    let isVisible = true;
    let animationFrameId: number;

    const handlePointerMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      mouseX = (e.clientX / innerWidth - 0.5) * 2;
      mouseY = (e.clientY / innerHeight - 0.5) * 2;
      targetRotY = mouseX * 0.45;
      targetRotX = mouseY * 0.35;
    };

    if (!isMobile && !prefersReducedMotion) {
      window.addEventListener("pointermove", handlePointerMove, { passive: true });
    }

    // Theme mutation observer to dynamically adapt 3D colors
    const observer = new MutationObserver(() => {
      const newDark = document.documentElement.classList.contains("dark");
      if (newDark !== isDark) {
        isDark = newDark;
        currentColors = getColors(isDark);
        coreMat.color.setHex(currentColors.innerCore);
        coreMat.opacity = isDark ? 0.88 : 0.75;
        wireMat.color.setHex(currentColors.wireframe);
        wireMat.opacity = isDark ? 0.35 : 0.25;
        ringMat1.color.setHex(currentColors.orbitRing1);
        ringMat1.opacity = isDark ? 0.45 : 0.3;
        ringMat2.color.setHex(currentColors.orbitRing2);
        ringMat2.opacity = isDark ? 0.35 : 0.22;
        satMat.color.setHex(currentColors.satellites);
        ambientLight.color.setHex(currentColors.ambientLight);
        ambientLight.intensity = isDark ? 2.5 : 2.0;
        keyLight.color.setHex(currentColors.keyLight);
        fillLight.color.setHex(currentColors.fillLight);
      }
    });

    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["class"],
    });

    // Resize handler
    const handleResize = () => {
      if (!container || !renderer) return;
      const newW = container.clientWidth;
      const newH = container.clientHeight;
      camera.aspect = newW / newH;
      camera.position.z = window.innerWidth < 768 ? 8.5 : 7.2;
      camera.updateProjectionMatrix();
      renderer.setSize(newW, newH);
      if (prefersReducedMotion) {
        renderer.render(scene, camera);
      }
    };

    window.addEventListener("resize", handleResize, { passive: true });

    // IntersectionObserver to pause rendering when scrolled out of view
    const intersectionObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          isVisible = entry.isIntersecting;
        });
      },
      { threshold: 0.05 }
    );
    intersectionObserver.observe(container);

    // Initial render
    renderer.render(scene, camera);
    setIsLoaded(true);

    // Animation Loop
    let clock = new THREE.Clock();

    const animate = () => {
      animationFrameId = requestAnimationFrame(animate);

      if (!isVisible || !renderer) return;

      if (!prefersReducedMotion) {
        const delta = clock.getDelta();

        // Smooth rotation
        coreMesh.rotation.y += delta * 0.22;
        coreMesh.rotation.x += delta * 0.12;

        wireMesh.rotation.y -= delta * 0.14;
        wireMesh.rotation.z += delta * 0.08;

        ringMesh1.rotation.z += delta * 0.18;
        ringMesh2.rotation.z -= delta * 0.15;

        // Animate satellites along orbit
        satellites.forEach((sat) => {
          sat.angle += sat.speed;
          sat.mesh.position.x = Math.cos(sat.angle) * sat.radius;
          sat.mesh.position.z = Math.sin(sat.angle) * sat.radius;
          sat.mesh.position.y = Math.sin(sat.angle * 2) * 0.35 + sat.yOffset;
          sat.mesh.rotation.x += 0.02;
          sat.mesh.rotation.y += 0.03;
        });

        // Interactive mouse response with dampening (lerp)
        rootGroup.rotation.y += (targetRotY - rootGroup.rotation.y) * 0.04;
        rootGroup.rotation.x += (targetRotX - rootGroup.rotation.x) * 0.04;
      }

      renderer.render(scene, camera);
    };

    if (!prefersReducedMotion) {
      animate();
    }

    // Cleanup function
    return () => {
      cancelAnimationFrame(animationFrameId);
      window.removeEventListener("pointermove", handlePointerMove);
      window.removeEventListener("resize", handleResize);
      observer.disconnect();
      intersectionObserver.disconnect();

      // Dispose Three.js resources
      coreGeo.dispose();
      coreMat.dispose();
      wireGeo.dispose();
      wireframeGeo.dispose();
      wireMat.dispose();
      ringGeo1.dispose();
      ringMat1.dispose();
      ringGeo2.dispose();
      ringMat2.dispose();
      satGeo.dispose();
      satMat.dispose();

      if (renderer) {
        renderer.dispose();
        if (renderer.domElement && container.contains(renderer.domElement)) {
          container.removeChild(renderer.domElement);
        }
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      aria-hidden="true"
      className={`absolute inset-0 pointer-events-none z-0 flex items-center justify-center transition-opacity duration-1000 ${
        isLoaded ? "opacity-100" : "opacity-0"
      }`}
    />
  );
};

export default Hero3DCanvas;
