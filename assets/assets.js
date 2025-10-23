import user_image from './user-image.png';
import code_icon from './code-icon.png';
import code_icon_dark from './code-icon-dark.png';
import edu_icon from './edu-icon.png';
import edu_icon_dark from './edu-icon-dark.png';
import project_icon from './project-icon.png';
import project_icon_dark from './project-icon-dark.png';
import vscode from './vscode.png';
import firebase from './firebase.png';
import figma from './figma.png';
import git from './git.png';
import mongodb from './mongodb.png';
import right_arrow_white from './right-arrow-white.png';
import logo from './logo.png';
import logo_dark from './logo_dark.png';
import mail_icon from './mail_icon.png';
import mail_icon_dark from './mail_icon_dark.png';
import profile_img from './profile-img.png';
import download_icon from './download-icon.png';
import hand_icon from './hand-icon.png';
import header_bg_color from './header-bg-color.png';
import moon_icon from './moon_icon.png';
import sun_icon from './sun_icon.png';
import arrow_icon from './arrow-icon.png';
import arrow_icon_dark from './arrow-icon-dark.png';
import menu_black from './menu-black.png';
import menu_white from './menu-white.png';
import close_black from './close-black.png';
import close_white from './close-white.png';
import web_icon from './web-icon.png';
import mobile_icon from './mobile-icon.png';
import ui_icon from './ui-icon.png';
import graphics_icon from './graphics-icon.png';
import right_arrow from './right-arrow.png';
import send_icon from './send-icon.png';
import right_arrow_bold from './right-arrow-bold.png';
import right_arrow_bold_dark from './right-arrow-bold-dark.png';
import hirusha_logo from './hirusha-logo.jpg';
import hirusha_logo_dark from './hirusha-logo_darkmode.png';
import my_photo1 from './public/my_photo1.png';
import my_photo2 from './public/my_photo2.jpeg';
import my_photo_2 from './public/my_photo_2.jpg';
import my_photo3 from './public/my_photo3.jpeg';
import erp_1 from './public/ERP_1.png'
import erp_aahaas from './public/ERP_aahaas.png'
import erp_apple from './public/ERP_apple.png'
import jeewa from './public/Jeewa.png'
import pos from './public/POS_1.png'
import mern_1 from './public/mern_1.png'

export const assets = {
    user_image,
    code_icon,
    code_icon_dark,
    edu_icon,
    edu_icon_dark,
    project_icon,
    project_icon_dark,
    vscode,
    firebase,
    figma,
    git,
    mongodb,
    right_arrow_white,
    logo,
    logo_dark,
    mail_icon,
    mail_icon_dark,
    profile_img,
    download_icon,
    hand_icon,
    header_bg_color,
    moon_icon,
    sun_icon,
    arrow_icon,
    arrow_icon_dark,
    menu_black,
    menu_white,
    close_black,
    close_white,
    web_icon,
    mobile_icon,
    ui_icon,
    graphics_icon,
    right_arrow,
    send_icon,
    right_arrow_bold,
    right_arrow_bold_dark,
    hirusha_logo,
    hirusha_logo_dark,
    my_photo1,
    my_photo2,
    my_photo3,
    my_photo_2,
    erp_1,
    erp_aahaas,
    erp_apple,
    jeewa,
    pos
};

export const workData = [
    {
        title: 'ERP and POS project',
        description: 'Connecting POS system and ERP system when some stock sales happen from POS system then as soon as possible it updated in ERP system',
        bgImage: '/ERP_1.png',
        link: 'https://github.com/Hirusha1-cpu/Retail_ERP_Suite.git',
        categories: ['erp', 'pos'],
        techStack: ['React', 'Node.js', 'MySQL', 'Express']
    },
    {
        title: 'ERP for Aahaas, AppleHolidays Companies',
        description: 'There connecting three companies together then when they get there system orders and quotations as soon as possible it shows in ERP system and created invoices, PNL details, Bank accounts , manual invoices creations also happen there. There According to account receivables and payables then can be get there actulal PnL details. And summary reports also available in the system.',
        bgImage: '/ERP_aahaas.png',
        link: 'https://dev-erp.aahaas.com/', // Add your actual link
        categories: ['erp'],
        techStack: ['React', 'Node.js', 'MySQL', 'Express']
    },
    {
        title: 'MERN auth site',
        description: 'Developed a secure authentication system with JWT-based authentication, email OTP verification using Nodemailer, and password reset functionality.',
        bgImage: '/mern_1.png',
        link: 'https://mern-auth-client-omega.vercel.app/', // Add your actual link
        categories: ['fullstack'],
        techStack: ['MERN Stack', 'JWT', 'Nodemailer']
    },
    {
        title: 'Sales, Purchase, Inventory, and Repair Management System for Jeewa Computers',
        description: 'Developed a secure business management system handling sales, repairs, employees, invoices, and reports using MySQL for efficient real-time data operations.',
        bgImage: '/Jeewa.png',
        link: 'https://github.com/Hirusha1-cpu/jeewasolutions', // Add your actual link
        categories: ['management'],
        techStack: ['MySQL', 'React', 'Node.js']
    },
]

export const serviceData = [
  { 
    icon: assets.web_icon, 
    title: 'Full Stack Web Development', 
    description: 'I build high-performance web applications using Laravel and React, ensuring seamless backend–frontend integration with clean, maintainable code.', 
    link: '' 
  },
  { 
    icon: assets.mobile_icon, 
    title: 'Cloud & DevOps Solutions', 
    description: 'Designing CI/CD pipelines with Jenkins, Docker, Kubernetes, and AWS for automated, scalable, and secure application delivery.', 
    link: '' 
  },
  { 
    icon: assets.ui_icon, 
    title: 'API Development & Integration', 
    description: 'Expert in RESTful and GraphQL APIs, integrating third-party services like payment gateways, social platforms, and analytics tools.', 
    link: '' 
  },
  { 
    icon: assets.graphics_icon, 
    title: 'Database Design & Optimization', 
    description: 'Creating optimized MySQL and PostgreSQL architectures for efficient data handling, analytics, and high-traffic performance.', 
    link: '' 
  },
  { 
    icon: assets.web_icon, 
    title: 'System Security & Compliance', 
    description: 'Implementing secure authentication, encryption, and access control to ensure data protection and compliance with web standards.', 
    link: '' 
  },
  { 
    icon: assets.mobile_icon, 
    title: 'Enterprise & ERP Systems', 
    description: 'Developing custom ERP and automation systems for sales, inventory, accounting, and reporting tailored to business needs.', 
    link: '' 
  },
];


export const infoList = [
    { icon: assets.code_icon, iconDark: assets.code_icon_dark, title: 'Lang & Frameworks', description: 'PHP, Java, JavaScript, React, Laravel, MERN, Next Js, SpringBoot' },
    { icon: assets.edu_icon, iconDark: assets.edu_icon_dark, title: 'Education', description: 'BIT UCSC' },
    { icon: assets.project_icon, iconDark: assets.project_icon_dark, title: 'Projects', description: 'Built more than 5 projects' }
];

export const toolsData = [
    assets.vscode, assets.firebase, assets.mongodb, assets.figma, assets.git
];