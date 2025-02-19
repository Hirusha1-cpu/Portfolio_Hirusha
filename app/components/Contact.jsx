import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'
import { motion } from "motion/react"

const Contact = () => {
    const [result, setResult] = useState("");

    const onSubmit = async (event) => {
        event.preventDefault();
        setResult("Sending....");
        const formData = new FormData(event.target);

        formData.append("access_key", "9a652381-6a41-407e-be3e-f676b6c22af8");

        const response = await fetch("https://api.web3forms.com/submit", {
            method: "POST",
            body: formData
        });

        const data = await response.json();

        if (data.success) {
            setResult("Form Submitted Successfully");
            event.target.reset();
        } else {
            console.log("Error", data);
            setResult(data.message);
        }
    };
    return (
        <motion.div

            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            transition={{ duration: 1 }}
            id='contact'
            className="w-full px-[12%] py-10 scroll-mt-20  bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none"
        >
            <motion.h4
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.3 }}
                className='text-center mb-2 text-lg font-Ovo'>Connect With Me</motion.h4>
            <motion.h2
                initial={{ opacity: 0, y: -20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.5 }}
                className='text-center text-5xl font-Ovo'>Get In Touch</motion.h2>
            <motion.p
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.7 }}
                className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error totam asperiores recusandae qui, vel commodi consequatur odio, ut, quia autem quis harum incidunt fuga nam facere distinctio et quibusdam. Repellat.</motion.p>
            <motion.form
                initial={{ opacity: 0 }}
                whileInView={{ opacity: 1 }}
                transition={{ duration: 0.6, delay: 0.9 }}
                action="" className='max-w-2xl mx-auto' onSubmit={onSubmit}>
                <div className='grid grid-cols-auto gap-6 mt-10 mb-8'>
                    <motion.input
                        initial={{ x:-50,opacity: 0 }}
                        whileInView={{ x:0,opacity: 1 }}
                        transition={{ duration: 0.6, delay:1.1 }}
                        type="text" placeholder='Enter Your Name' required
                        className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90' name='name' />
                    <motion.input
                        initial={{ x:50,opacity: 0 }}
                        whileInView={{x:0, opacity: 1 }}
                        transition={{ duration: 0.6, delay: 0.9 }}
                        type="email" placeholder='Enter Your email' required
                        className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90' name='email' />
                </div>
                <motion.textarea
                  initial={{ y:100,opacity: 0 }}
                  whileInView={{y:0, opacity: 1 }}
                  transition={{ duration: 0.6, delay: 1.3 }}
                rows={6} placeholder='Enter Your Message' required name="message" id="" className='dark:bg-darkHover/30 dark:border-white/90 w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6'></motion.textarea>

                <motion.button  
                whileHover={{scale:1.05}}
                transition={{duration:0.3}}
                type='submit' className='dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover  py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500'>Submit now <Image alt='' className='w-4' src={assets.right_arrow_bold_dark} />  </motion.button>
                <p className='mt-4'>{result}</p>
            </motion.form>
        </motion.div>
    )
}

export default Contact
