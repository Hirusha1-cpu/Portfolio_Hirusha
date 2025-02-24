'use client'
import Image from "next/image";
import Navbar from "./components/Navbar";
import Header from "./components/Header";
import About from "./components/About";
import Services from "./components/Services";
import Work from "./components/Work";
import Contact from "./components/Contact";
import Footer from "./components/Footer";
import { useEffect, useState } from "react";
import ThreeScene from "./components/ThreeScene";
import PhoneScene from "./components/PhoneScene";
import RotatingTextScene from "./components/RotatingTextScene";
import EarthScene from "./components/EarthScene";

export default function Home() {
  const [isDarkMode, setIsDarkMode] = useState(true)
  useEffect(()=>{
    if (localStorage.theme === 'dark' || (!('theme' in localStorage) && window.matchMedia('(prefers-color-scheme:dark)').matches)) {
      setIsDarkMode(true)
    } else {
      setIsDarkMode(false)
    }
  },[])
  useEffect(()=>{
    if (isDarkMode) {
      document.documentElement.classList.add('dark')
      localStorage.theme = 'dark'
    } else {
      document.documentElement.classList.remove('dark')
      localStorage.theme = ''

    }
  },[isDarkMode])
  return (
   <>
   {/* <ThreeScene isDarkMode={isDarkMode} /> */}
   {/* <PhoneScene isDarkMode={isDarkMode} /> */}
   {/* <RotatingTextScene isDarkMode={isDarkMode} /> */}
   <EarthScene isDarkMode={isDarkMode} />
   <Navbar isDarkMode={isDarkMode} setIsDarkMode={setIsDarkMode}/>
   <Header isDarkMode={isDarkMode}/>
   <About isDarkMode={isDarkMode}/>
   <Services isDarkMode={isDarkMode}/>
   <Work isDarkMode={isDarkMode}/>
   <Contact isDarkMode={isDarkMode}/>
   <Footer isDarkMode={isDarkMode}/>
   </>
  );
}
