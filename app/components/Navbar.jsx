import { assets } from '@/assets/assets'
import Image from 'next/image'
import React from 'react'

const Navbar = () => {
    return (
        <>
            <div className='fixed top-0 right-0 w-11/12 -z-10 translate-y-[-80%]'>
                <Image src={assets.header_bg_color} alt='' className='w-full' />
            </div>
            <nav className='w-full fixed px-5 lg:px-8 xl:px-[8%] py-4 flex justify-between items-center bg-white z-50'>
                <a href="#top">
                    <Image src={assets.hirusha_logo} className='w-28 cursor-pointer mr-14' alt='' />
                </a>
                <ul className='hidden md:flex items-center gap-6 lg:gap-8 rounded-full px-12 py-3 bg-white shadow-sm bg-opacity-60'>
                    <li><a className='font-Ovo' href="#top">Home</a></li>
                    <li><a className='font-Ovo' href="#about">About</a></li>
                    <li><a className='font-Ovo' href="#services">Services</a></li>
                    <li><a className='font-Ovo' href="#work">My Work</a></li>
                    <li><a className='font-Ovo' href="#contact">Contact me</a></li>
                </ul>
                <div className='flex items-center gap-4'>
                    <button>
                        <Image src={assets.moon_icon} alt='' className='w-6' />
                    </button>
                    <a href="#contact" className='hidden lg:flex items-center gap-3 px-10 py-2.5 border border-gray-500 rounded-full ml-4 font-Ovo'>Contact
                        <Image src={assets.arrow_icon} className='w-3' alt='' /></a>

                    <button className='block md:hidden ml-3'>
                        <Image src={assets.menu_black} alt='' className='w-6' />
                    </button>
                </div>
                {/* mobile menu */}
                <ul className='flex md:hidden flex-col gap-4 py-20 px-10 fixed -right-0 top-0 bottom-0 w-64 z-50 h-screen bg-rose-50 transition duration-300 '>
                    <li><a className='font-Ovo' href="#top">Home</a></li>
                    <li><a className='font-Ovo' href="#about">About</a></li>
                    <li><a className='font-Ovo' href="#services">Services</a></li>
                    <li><a className='font-Ovo' href="#work">My Work</a></li>
                    <li><a className='font-Ovo' href="#contact">Contact me</a></li>
                </ul>
            </nav>
        </>
    )
}

export default Navbar
