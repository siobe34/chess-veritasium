// import styled from 'styled-components';
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faBars } from '@fortawesome/free-solid-svg-icons';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChessQueen } from '@fortawesome/free-solid-svg-icons';

// import { Link } from 'react-router-dom';
import { useState } from 'react';

// import NavLink from './NavLink';
// import Button from './Button';

// type ComponentProps = {
//     className?: string;
// };

// function UnstyledNavbar({ className }: ComponentProps) {
function Navbar() {
    const [mobileMenu, setMobileMenu] = useState<boolean>(false);
    const handleMenuToggle = () => {
        if (window.innerWidth <= 786) setMobileMenu(!mobileMenu);
    };
    const handleMenuClose = () => {
        if (window.innerWidth <= 786) setMobileMenu(false);
    };
    return (
        <>
        <nav className='flex items-center content-center justify-between flex-wrap bg-blue-500'>
            <div className='flex items-center flex-shrink-0 text-white ml-6 mr-12'>
                <FontAwesomeIcon className='mr-2' icon={faChessQueen} />
                <span className='font-semibold text-xl tracking-tight'>10K-Chess</span>
            </div>
            <div className='w-full block flex-grow lg:flex lg:items-center lg:w-auto'>
                <div className='text-sm lg:flex-grow'>
                    <a href='#responsive-header' className='block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4'>
                        Practice
                    </a>
                    <a href='#responsive-header' className='block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white mr-4'>
                        About
                    </a>
                    <a href='#responsive-header' className='block mt-4 lg:inline-block lg:mt-0 text-blue-200 hover:text-white'>
                        Get in Touch
                    </a>
                </div>
            </div>
            <div className='block lg:active'>
                <button className='flex items-center px-3 py-2 border rounded text-blue-200 border-blue-400 hover:text-white hover:border-white'>
                <svg className='fill-current h-3 w-3' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><title>Menu</title><path d="M0 3h20v2H0V3zm0 6h20v2H0V9zm0 6h20v2H0v-2z"/></svg>
                </button>
            </div>
        </nav>
        </>
    );
}

{/* <nav className={`navbar ${className}`}>
    <Link to='/' onClick={handleMenuClose}>
        <Logo />
    </Link>
        <ul className={`navigation-links-container ${mobileMenu ? 'active' : null}`}>
            <NavLink to='/page-not-found' onClick={handleMenuClose}>
                PageNotFound
            </NavLink>
        </ul>
    <div className='mobile-menu' onClick={handleMenuToggle}>
        <FontAwesomeIcon icon={faBars} />
    </div>
</nav> */}
// const Navbar = styled(UnstyledNavbar)`
//     position: relative;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;
//     border-bottom: 1px solid black;
//     // *** //
//     .logo {
//         margin-left: 1rem;
//     }
//     .navigation-links-container {
//         display: flex;
//         align-items: center;
//         justify-content: center;
//         gap: 2vw;
//         list-style-type: none;
//         margin-block-start: 0;
//         margin-block-end: 0;
//         margin-inline-start: 0;
//         margin-inline-end: 0;
//         padding-inline-start: 0;
//     }
//     .mobile-menu {
//         display: none;
//     }
//     .mobile-menu svg {
//         height: 1.5rem;
//     }
//     @media screen and (max-width: 786px) {
//         .mobile-menu {
//             display: inline-flex;
//             margin-right: 1rem;
//             cursor: pointer;
//         }
//         .navigation-links-container {
//             position: absolute;
//             top: calc(100% + 40px);
//             left: -150%;
//             display: flex;
//             flex-direction: column;
//             gap: 0;
//             width: 100%;
//             background-color: white;
//             transition: left 250ms ease;
//         }
//         .navigation-links-container.active {
//             display: flex;
//             left: 0%;
//             transition: left 250ms ease;
//         }
//     }
// `;

export default Navbar;