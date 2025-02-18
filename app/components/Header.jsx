import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Header = () => {
    return (
        <div className='w-11/12 max-w-3xl text-center mx-auto h-screen flex flex-col items-center justify-center gap-5 lg:pt-20  sm:pt-20 max-sm:pt-60 md:pt-30 '>
            <div>
                <Image src={assets.profile_img} alt='' className='rounded-full w-32' />
            </div>
            <h3 className='flex items-end gap-2 text-xl md:text-2xl mb-3 font-Ovo '>Hi! I'm Hirusha <Image src={assets.hand_icon} alt='' className='w-6' /> </h3>
            <h1 className='text-3xl sm:text-6xl lg:text-[66px] font-Ovo'>Backend Developer from SriLanka</h1>
            <p className='max-w-2xl mx-auto font-Ovo'>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ab doloribus placeat odio a itaque dolorem modi iusto earum optio expedita, assumenda vel repellendus incidunt id suscipit blanditiis nihil perspiciatis saepe?
            </p>
            <div className='flex flex-col sm:flex-row items-center gap-5 mt-10'>
                <a href="#contact" className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2 bg-black text-white '>Contact me <Image src={assets.right_arrow_white} alt='' className=' w-4' /> </a>
                <a href="/sample-resume.pdf" download className='px-10 py-3 border rounded-full border-gray-500 flex items-center gap-2'>CV <Image src={assets.download_icon} alt='' className=' w-4' /> </a>
            </div>
        </div>
    )
}

export default Header
