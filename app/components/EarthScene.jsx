'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const StarScene = ({ isDarkMode }) => {
  const mountRef = useRef(null);
  const starsRef = useRef(null);

  useEffect(() => {
    // Scene setup
    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(
      75,
      window.innerWidth / window.innerHeight,
      0.1,
      1000
    );
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

      for (let i = 0; i < starCount * 3; i += 3) {
        const radius = 20 + Math.random() * 30;
        const theta = Math.random() * Math.PI * 2;
        const phi = Math.random() * Math.PI;

        starPositions[i] = radius * Math.sin(phi) * Math.cos(theta);
        starPositions[i + 1] = radius * Math.sin(phi) * Math.sin(theta);
        starPositions[i + 2] = radius * Math.cos(phi);
      }

      starGeometry.setAttribute('position', new THREE.BufferAttribute(starPositions, 3));

      const starMaterial = new THREE.PointsMaterial({
        color: isDarkMode ? 0xffffff : 0x0000ff,
        size: 0.1,
        transparent: true,
        opacity: 0.8,
        sizeAttenuation: true,
      });

      const stars = new THREE.Points(starGeometry, starMaterial);
      starsRef.current = stars;
      return stars;
    };

    const stars = createStars();
    scene.add(stars);

    // Optional lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.2);
    scene.add(ambientLight);

    // Camera position
    camera.position.z = 50;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Rotate stars slightly
      starsRef.current.rotation.y += 0.0003;
      starsRef.current.rotation.x += 0.0001;

      renderer.render(scene, camera);
    };

    // Mouse interaction
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;

      starsRef.current.rotation.x += (mouseY - starsRef.current.rotation.x) * 0.01;
      starsRef.current.rotation.y += (mouseX - starsRef.current.rotation.y) * 0.01;
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('resize', handleResize);

    animate();

    // Cleanup
    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      window.removeEventListener('resize', handleResize);
      mountRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Points) {
          object.geometry.dispose();
          object.material.dispose();
        }
      });
      renderer.dispose();
    };
  }, [isDarkMode]);

  return <div ref={mountRef} className="fixed top-0 left-0 w-full h-full -z-10 mt-7" />;
};

export default StarScene;
