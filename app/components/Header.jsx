import { assets } from "@/assets/assets";
import Image from "next/image";
import React from "react";
import { motion } from "motion/react";

const Header = () => {
  return (
    <div className="w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-5 lg:pt-20  sm:pt-20 max-sm:pt-60 md:pt-30 ">
      <motion.div
        initial={{ scale: 0 }}
        whileInView={{ scale: 1 }}
        transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      >
        {/* <Image src={assets.my_photo2} alt='' className='rounded-full w-32' /> */}
        <Image
          src={assets.my_photo_2}
          alt=""
          className="rounded-full w-64 transition-transform duration-300 hover:scale-110 animate-pulse"
        />
      </motion.div>
      <motion.h3
        initial={{ y: -30, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo "
      >
        Hi! I'm Hirusha <Image src={assets.hand_icon} alt="" className="w-6" />{" "}
      </motion.h3>
      <motion.h1
        initial={{ y: -20, opacity: 0 }}
        whileInView={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, delay: 0.5 }}
        className="text-3xl sm:text-6xl lg:text-[66px] font-Ovo"
      >
        Full Stack Engineer from SriLanka
      </motion.h1>
      <motion.p
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="max-w-2xl mx-auto font-Ovo"
      >
        I'm a passionate Full Stack Engineer with expertise in DevOps practices and Backend development. I build scalable web apps, automate deployments, and develop secure, decentralized solutions—bridging innovation with technology to create impactful digital experiences
      </motion.p>
      <div className="flex flex-col sm:flex-row items-center gap-5 mt-10 ">
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1 }}
          href="#contact"
          className="dark:bg-transparent px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-black text-white "
        >
          Contact me{" "}
          <Image src={assets.right_arrow_white} alt="" className=" w-4" />{" "}
        </motion.a>
        <motion.a
          initial={{ y: 30, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.6, delay: 1.2 }}
          href="/Hirusha_Fernando_ASE.pdf"
          download
          className="bg-white dark:text-black px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2"
        >
          CV <Image src={assets.download_icon} alt="" className=" w-4" />{" "}
        </motion.a>
      </div>
    </div>
  );
};

export default Header;
