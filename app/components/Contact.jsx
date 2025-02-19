import { assets } from '@/assets/assets'
import Image from 'next/image'
import React, { useState } from 'react'

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
        <div
            id='contact'
            className="w-full px-[12%] py-10 scroll-mt-20  bg-no-repeat bg-center bg-[length:90%_auto] dark:bg-none"
        >
            <h4 className='text-center mb-2 text-lg font-Ovo'>Connect With Me</h4>
            <h2 className='text-center text-5xl font-Ovo'>Get In Touch</h2>
            <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error totam asperiores recusandae qui, vel commodi consequatur odio, ut, quia autem quis harum incidunt fuga nam facere distinctio et quibusdam. Repellat.</p>
            <form action="" className='max-w-2xl mx-auto' onSubmit={onSubmit}>
                <div className='grid grid-cols-auto gap-6 mt-10 mb-8'>
                    <input type="text" placeholder='Enter Your Name' required
                        className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90'  name='name'/>
                    <input type="email" placeholder='Enter Your email' required
                        className='flex-1 p-3 outline-none border-[0.5px] border-gray-400 rounded-md bg-white dark:bg-darkHover/30 dark:border-white/90' name='email' />
                </div>
                <textarea rows={6} placeholder='Enter Your Message' required name="message" id="" className='dark:bg-darkHover/30 dark:border-white/90 w-full p-4 outline-none border-[0.5px] border-gray-400 rounded-md bg-white mb-6'></textarea>

                <button type='submit' className='dark:bg-transparent dark:border-[0.5px] dark:hover:bg-darkHover  py-3 px-8 w-max flex items-center justify-between gap-2 bg-black/80 text-white rounded-full mx-auto hover:bg-black duration-500'>Submit now <Image alt='' className='w-4' src={assets.right_arrow_bold_dark} />  </button>
                <p className='mt-4'>{result}</p>
            </form>
        </div>
    )
}

export default Contact
