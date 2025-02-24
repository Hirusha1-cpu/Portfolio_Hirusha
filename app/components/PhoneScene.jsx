'use client'
import React, { useEffect, useRef } from 'react';
import * as THREE from 'three';

const PhoneScene = ({ isDarkMode }) => {
  const mountRef = useRef(null);
  const phoneRef = useRef(null);
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

    // Create phone model
    const createPhone = () => {
      const group = new THREE.Group();

      // Phone body
      const bodyGeometry = new THREE.BoxGeometry(3, 6, 0.3);
      const bodyMaterial = new THREE.MeshPhongMaterial({
        color: isDarkMode ? 0x333333 : 0xcccccc,
        shininess: 100,
      });
      const body = new THREE.Mesh(bodyGeometry, bodyMaterial);
      group.add(body);

      // Screen
      const screenGeometry = new THREE.BoxGeometry(2.8, 5.8, 0.01);
      const screenMaterial = new THREE.MeshPhongMaterial({
        color: isDarkMode ? 0x222222 : 0xffffff,
        shininess: 200,
      });
      const screen = new THREE.Mesh(screenGeometry, screenMaterial);
      screen.position.z = 0.16;
      group.add(screen);

      // Camera bump
      const cameraBumpGeometry = new THREE.CylinderGeometry(0.2, 0.2, 0.1, 32);
      const cameraBumpMaterial = new THREE.MeshPhongMaterial({
        color: isDarkMode ? 0x222222 : 0xdddddd,
        shininess: 100,
      });
      const cameraBump = new THREE.Mesh(cameraBumpGeometry, cameraBumpMaterial);
      cameraBump.rotation.x = Math.PI / 2;
      cameraBump.position.set(0.7, 2.5, -0.15);
      group.add(cameraBump);

      return group;
    };

    // Add phone to scene
    const phone = createPhone();
    phoneRef.current = phone;
    scene.add(phone);

    // Lighting
    const frontLight = new THREE.DirectionalLight(0xffffff, 1);
    frontLight.position.set(0, 0, 10);
    scene.add(frontLight);

    const backLight = new THREE.DirectionalLight(0xffffff, 0.5);
    backLight.position.set(0, 0, -10);
    scene.add(backLight);

    const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
    scene.add(ambientLight);

    // Position camera
    camera.position.z = 8;

    // Animation
    const animate = () => {
      requestAnimationFrame(animate);

      // Smooth scroll animation
      const targetRotationY = (scrollRef.current / window.innerHeight) * Math.PI * 2;
      phone.rotation.y += (targetRotationY - phone.rotation.y) * 0.1;

      // Add floating animation
      phone.position.y = Math.sin(Date.now() * 0.001) * 0.2;

      // Add subtle rotation
      phone.rotation.x = Math.sin(Date.now() * 0.0005) * 0.1;

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
    };

    window.addEventListener('scroll', handleScroll);
    window.addEventListener('resize', handleResize);
    animate();

    // Add parallax effect
    const handleMouseMove = (event) => {
      const mouseX = (event.clientX / window.innerWidth) * 2 - 1;
      const mouseY = -(event.clientY / window.innerHeight) * 2 + 1;
      
      phone.rotation.y += (mouseX - phone.rotation.y) * 0.05;
      phone.rotation.x += (mouseY - phone.rotation.x) * 0.05;
    };

    window.addEventListener('mousemove', handleMouseMove);

    // Cleanup
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('resize', handleResize);
      window.removeEventListener('mousemove', handleMouseMove);
      mountRef.current?.removeChild(renderer.domElement);
      scene.traverse((object) => {
        if (object instanceof THREE.Mesh) {
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
      className="fixed top-0 left-0 w-full h-full -z-10 pointer-events-none mt-4"
    />
  );
};

export default PhoneScene;