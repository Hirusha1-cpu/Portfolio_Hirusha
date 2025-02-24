'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const EarthScene = ({ isDarkMode }) => {
  const mountRef = useRef(null);
  const shatterParticlesRef = useRef([]);
  const originalPositionsRef = useRef([]);
  const scrollProgressRef = useRef(0);
  const sphereRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
    const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
    
    renderer.setSize(window.innerWidth, window.innerHeight);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setClearColor(0x000000, 0);
    
    if (mountRef.current.children.length > 0) {
      mountRef.current.removeChild(mountRef.current.children[0]);
    }
    mountRef.current.appendChild(renderer.domElement);

    // Create starfield
    const createStars = () => {
      const starCount = 2000;
      const starGeometry = new THREE.BufferGeometry();
      const starPositions = new Float32Array(starCount * 3);
      const starSizes = new Float32Array(starCount);

      for (let i = 0; i < starCount * 3; i += 3) {
        // Create stars in a sphere around the earth
        const radius = 20 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i + 2] = radius * Math.cos(phi);
        
        starSizes[i / 3] = Math.random() * 2;
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));
      starGeometry.setAttribute('size', new THREE.BufferAttribute(starSizes, 1));

      const starMaterial = new THREE.PointsMaterial({
        color: isDarkMode ? 0xffffff : 0x0000FF,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      starsRef.current = stars;
      return stars;
    };

    // Create Earth
    const createEarth = () => {
      const radius = window.innerWidth < 768 ? 1.5 : 2;
      const segments = 64;
      const geometry = new THREE.IcosahedronGeometry(radius, segments / 8);
      
      const material = new THREE.MeshPhongMaterial({
        color: isDarkMode ? 0x4444ff : 0x2196f3,
        shininess: 100,
        specular: 0x333333,
        flatShading: true,
      });

      const continentMaterial = new THREE.MeshPhongMaterial({
        color: isDarkMode ? 0x44aa44 : 0x4caf50,
        shininess: 50,
        flatShading: true,
      });

      const sphere = new THREE.Mesh(geometry, material);
      sphereRef.current = sphere;

      // Create atmosphere glow
      const atmosphereGeometry = new THREE.SphereGeometry(radius * 1.1, segments, segments);
      const atmosphereMaterial = new THREE.MeshPhongMaterial({
        color: isDarkMode ? 0x1a237e : 0x64b5f6,
        transparent: true,
        opacity: 0.3,
        side: THREE.BackSide,
      });
      const atmosphere = new THREE.Mesh(atmosphereGeometry, atmosphereMaterial);
      
      // Create shatter particles
      const particleCount = geometry.attributes.position.count;
      const particleGeometry = new THREE.BufferGeometry();
      const positions = new Float32Array(particleCount * 3);
      const originalPositions = new Float32Array(particleCount * 3);

      for (let i = 0; i < particleCount * 3; i += 3) {
        positions[i] = geometry.attributes.position.array[i];
        positions[i + 1] = geometry.attributes.position.array[i + 1];
        positions[i + 2] = geometry.attributes.position.array[i + 2];

        originalPositions[i] = positions[i];
        originalPositions[i + 1] = positions[i + 1];
        originalPositions[i + 2] = positions[i + 2];
      }

      particleGeometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
      
      const particleMaterial = new THREE.PointsMaterial({
        color: isDarkMode ? 0x4444ff : 0x2196f3,
        size: 0.05,
        transparent: true,
      });

      const particles = new THREE.Points(particleGeometry, particleMaterial);
      particles.visible = false;
      shatterParticlesRef.current = particles;
      originalPositionsRef.current = originalPositions;

      const earthGroup = new THREE.Group();
      earthGroup.add(sphere);
      earthGroup.add(atmosphere);
      earthGroup.add(particles);

      return earthGroup;
    };

    const earth = createEarth();
    const stars = createStars();
    scene.add(earth);
    scene.add(stars);

    // Lighting
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(5, 3, 5);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.3);
    backLight.position.set(-5, -3, -5);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Position camera
    camera.position.z = 6;

    // Explosion animation
    const explode = (progress) => {
      const particles = shatterParticlesRef.current;
      const originalPositions = originalPositionsRef.current;
      const positions = particles.geometry.attributes.position.array;

      for (let i = 0; i < positions.length; i += 3) {
        const x = originalPositions[i];
        const y = originalPositions[i + 1];
        const z = originalPositions[i + 2];

        const explosionFactor = 3;
        positions[i] = x + (x * progress * explosionFactor);
        positions[i + 1] = y + (y * progress * explosionFactor);
        positions[i + 2] = z + (z * progress * explosionFactor);
      }

      particles.geometry.attributes.position.needsUpdate = true;
    };

    // Animation
    let autoRotationAngle = 0;
    const animate = () => {
      requestAnimationFrame(animate);

      // Auto-rotation for stars
      starsRef.current.rotation.y += 0.0003;
      starsRef.current.rotation.x += 0.0001;

      // Auto-rotation for earth
      autoRotationAngle += 0.001;
      earth.rotation.y = autoRotationAngle;

      // Handle explosion based on scroll (starts immediately)
      if (scrollProgressRef.current > 0) {
        sphereRef.current.visible = false;
        shatterParticlesRef.current.visible = true;
        explode(scrollProgressRef.current);
      } else {
        sphereRef.current.visible = true;
        shatterParticlesRef.current.visible = false;
      }

      renderer.render(scene, camera);
    };

    // Handle scroll
    const handleScroll = () => {
      scrollProgressRef.current = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight);
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    // Mouse interaction
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      earth.rotation.x += (mouseY - earth.rotation.x) * 0.05;
      earth.rotation.y += (mouseX - earth.rotation.y) * 0.05;

      // Make stars respond slightly to mouse movement
      starsRef.current.rotation.x += (mouseY - starsRef.current.rotation.x) * 0.01;
      starsRef.current.rotation.y += (mouseX - starsRef.current.rotation.y) * 0.01;
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    window.addEventListener('mousemove', handleMouseMove);
    animate();

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh || object instanceof THREE.Points) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div 
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full -z-10 mt-7"
    />
  );
};

export default EarthScene;