import { assets, serviceData } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'
import { motion } from "motion/react"


const Services = () => {
  return (
    <motion.div
    initial={{opacity:0}}
    whileInView={{opacity:1}}
    transition={{duration:1}}
    id='services' className='w-full px-[12%] py-10 scroll-mt-20 '>
        <motion.h4
         initial={{opacity:0,y:-20}}
         whileInView={{opacity:1,y:0}}
         transition={{duration:0.5, delay:0.3}}
        className='text-center mb-2 text-lg font-Ovo'>What I Offer</motion.h4>
        <motion.h2
         initial={{opacity:0,y:-20}}
         whileInView={{opacity:1,y:0}}
         transition={{duration:0.5, delay:0.5}}
        className='text-center text-5xl font-Ovo'>My Services</motion.h2>
        <motion.p
         initial={{opacity:0}}
         whileInView={{opacity:1}}
         transition={{duration:0.6, delay:0.7}}
        className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error totam asperiores recusandae qui, vel commodi consequatur odio, ut, quia autem quis harum incidunt fuga nam facere distinctio et quibusdam. Repellat.</motion.p>
        <motion.div
         initial={{opacity:0}}
         whileInView={{opacity:1}}
         transition={{duration:0.6, delay:0.9}}
        className='grid grid-cols-auto gap-6 my-10'>
            {serviceData.map(({icon,title,description, link},index)=>(
                <motion.div
                whileHover={{scale:1.05}}
                key={index} className='border border-gray-400 rounded-lg px-8 py-12 hover:shadow-black cursor-pointer  hover:-translate-y-1 duration-500 dark:hover:bg-darkHover dark:hover:shadow-white'>
                    <Image src={icon} alt='' className='w-10'/>
                    <h3 className='text-lg my-4 text-gray-700 dark:text-white'>{title}</h3>
                    <p className='text-sm text-gray-400 lending-5 dark:text-white/80 '>{description}</p>
                    <a href={link} className='flex items-center gap-2 text-sm mt-5'>Read More <Image alt='' src={assets.right_arrow} className='w-4'/>  </a>
                </motion.div>
            ))}
        </motion.div>
    </motion.div>
  )
}

export default Services
