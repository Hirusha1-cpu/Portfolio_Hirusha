import React from 'react'

const Contact = () => {
    return (
        <div id='contact' className='w-full px-[12%] py-10 scroll-mt-20 bg-[url("/footer-bg-color.png")] bg-no-repeat bg-center  bg-[length:90%_auto] '>
            <h4 className='text-center mb-2 text-lg font-Ovo'>Connect With Me</h4>
            <h2 className='text-center text-5xl font-Ovo'>Get In Touch</h2>
            <p className='text-center max-w-2xl mx-auto mt-5 mb-12 font-Ovo'>Lorem ipsum dolor sit amet, consectetur adipisicing elit. Error totam asperiores recusandae qui, vel commodi consequatur odio, ut, quia autem quis harum incidunt fuga nam facere distinctio et quibusdam. Repellat.</p>
            <form action="">
                <div>
                    <input type="text" placeholder='Enter Your Name'  required />
                    <input type="email" placeholder='Enter Your email'  required />
                </div>
                    <textarea rows={6} placeholder='Enter Your Message' required name="" id=""></textarea>

                    <button type='submit'>Submit now</button>
            </form>
        </div>
    )
}

export default Contact
