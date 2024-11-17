'use client'

import Link from 'next/link';
import React from 'react'
import { FaUserCircle } from 'react-icons/fa';
import { IoMdStarOutline } from 'react-icons/io';
import { MdAirplaneTicket, MdExplore } from "react-icons/md";
import Searchbar from './Searchbar';
import { usePathname } from 'next/navigation';

function Navbar() {
    const currentPathname = usePathname()

    // Workaround to hide navbar on details page which contains UUID in url, since navbar is added in layout
    const pathname = usePathname(); 
    const isUuid = /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;
    const isDynamicRoute = pathname.split('/').length === 2 && isUuid.test(pathname.split('/')[1]);
    const isHomePage = pathname === '/';

  
    return (
        <>
          {/* Conditionally render the mobile bottom navbar */}
          {!isDynamicRoute && (
            <div className="z-10 fixed flex items-center text-sm justify-between px-10 bottom-0 h-[85px] w-full bg-[#F0F0F0] border rounded-t-xl md:hidden sm:px-24">
              {/* Mobile bottom navbar */}
              <Link href="/" className={`flex flex-col items-center ${currentPathname == "/" ? "text-accent" : "text-[#666666]"} hover:text-[#555555]`}>    
                <MdExplore size={23}/>  
                <p>Explore</p>
              </Link>
              <Link href="/favorites" className={`flex flex-col items-center ${currentPathname == "/favorites" ? "text-accent" : "text-[#666666]"} hover:text-[#555555]`}>
                <IoMdStarOutline size={23}/>
                <p>Favorites</p>
              </Link>
              <Link href="/trips" className={`flex flex-col items-center ${currentPathname == "/trips" ? "text-accent" : "text-[#666666]"} hover:text-[#555555]`}>
                <MdAirplaneTicket size={23}/>
                <p>Trips</p>
              </Link>
              <Link href="/profile" className={`flex flex-col items-center ${currentPathname == "/profile" ? "text-accent" : "text-[#666666]"} hover:text-[#555555]`}>
                <FaUserCircle size={23}/>
                <p>Profile</p>
              </Link>
            </div>
          )}
    
          {/* Show the desktop navbars on bigger than md screens */}
          <div className="hidden md:flex items-center z-30 fixed top-0 left-0 h-[72px] w-full bg-[#F0F0F0] border ">
            <div className="hidden md:flex items-center justify-between px-16 xl:max-w-7xl xl:px-auto xl:mx-auto w-full">
              {/* Desktop top navbar */}
              <Link href="/">
                LuxestayIcon
              </Link>
              {/* Only render searchbar on home page */}
              {isHomePage && (
                <div className="flex-1">
                  <Searchbar />
                </div>
              )}      
              <div className="flex gap-8">
                <Link href="/favorites" className="">
                  <p>Favorites</p>
                </Link>
                <Link href="/trips" className="">
                  <p>Trips</p>
                </Link>
              </div>
              <Link href="/profile" className="text-[#666666] hover:text-[#555555]">
                <FaUserCircle size={45}/>
              </Link>
            </div>
          </div>
        </>
      )
    }
    
    export default Navbar;