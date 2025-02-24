'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';

const RotatingTextScene = ({ isDarkMode }) => {
  const mountRef = useRef(null);
  const textRef = useRef(null);
  const scrollRef = useRef(0);

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

    // Lights
    const frontLight = new THREE.DirectionalLight(isDarkMode ? 0x7f7fd5 : 0x6366f1, 1);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(isDarkMode ? 0x86a8e7 : 0x91a7ff, 0.5);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Create text
    const fontLoader = new FontLoader();
    fontLoader.load('/fonts/helvetiker_bold.typeface.json', (font) => {
      const textGeometry = new TextGeometry('HIRUSHA', {
        font: font,
        size: window.innerWidth < 768 ? 0.5 : 1,
        height: 0.2,
        curveSegments: 12,
        bevelEnabled: true,
        bevelThickness: 0.03,
        bevelSize: 0.02,
        bevelOffset: 0,
        bevelSegments: 5
      });

      textGeometry.center();

      // Create gradient texture
      const canvas = document.createElement('canvas');
      canvas.width = 256;
      canvas.height = 256;
      const context = canvas.getContext('2d');
      const gradient = context.createLinearGradient(0, 0, 256, 0);
      
      if (isDarkMode) {
        gradient.addColorStop(0, '#7f7fd5');
        gradient.addColorStop(0.5, '#86a8e7');
        gradient.addColorStop(1, '#91eae4');
      } else {
        gradient.addColorStop(0, '#6366f1');
        gradient.addColorStop(0.5, '#91a7ff');
        gradient.addColorStop(1, '#c4b5fd');
      }
      
      context.fillStyle = gradient;
      context.fillRect(0, 0, 256, 256);

      const texture = new THREE.CanvasTexture(canvas);

      const material = new THREE.MeshPhongMaterial({
        map: texture,
        shininess: 100,
        reflectivity: 1,
      });

      const text = new THREE.Mesh(textGeometry, material);
      textRef.current = text;
      scene.add(text);
    });

    // Position camera
    camera.position.z = 5;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      if (textRef.current) {
        // Calculate rotation based on scroll position
        const targetRotationY = (scrollRef.current / (document.documentElement.scrollHeight - window.innerHeight)) * Math.PI * 2;
        
        // Smooth rotation
        textRef.current.rotation.y += (targetRotationY - textRef.current.rotation.y) * 0.05;
        
        // Add floating animation
        textRef.current.position.y = Math.sin(Date.now() * 0.001) * 0.1;
        
        // Add subtle tilt
        textRef.current.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;
      }

      renderer.render(scene, camera);
    };

    // Handle scroll
    const handleScroll = () => {
      scrollRef.current = window.scrollY;
    };

    // Handle resize
    const handleResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);

      // Update text size for mobile
      if (textRef.current) {
        const newSize = window.innerWidth < 768 ? 0.5 : 1;
        textRef.current.scale.set(newSize, newSize, newSize);
      }
    };

    // Add mouse movement effect
    const handleMouseMove = (event) => {
      if (textRef.current) {
        const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
        const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
        
        textRef.current.rotation.x += (mouseY - textRef.current.rotation.x) * 0.05;
        textRef.current.rotation.z += (mouseX - textRef.current.rotation.z) * 0.05;
      }
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
      
      if (textRef.current) {
        textRef.current.geometry.dispose();
        textRef.current.material.dispose();
      }
      
      renderer.dispose();
    };
  }, [isDarkMode]);

  return (
    <div 
      ref={mountRef}
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none mt-5"
    />
  );
};

export default RotatingTextScene;