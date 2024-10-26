
"use client";

import Link from "next/link";

import { usePathname } from 'next/navigation'
import ThemeToggle from './ThemeToggle'
const TopBar = () => {
    const currentRoute =usePathname()
    return (
            <div className="flex justify-between items-center px-2 max-w-[1200px] mx-auto mt-10 mb-0">
            <button className={` ${currentRoute=='/'&& "bg-[#262F40] text-white"} cursor-pointer border-2 p-2 border-gray-600 rounded-md hover:bg-[#262F40] hover:text-white text-md}`} >
              <Link href={"/"}> Popular Movie</Link>
             </button>
             <button className={` ${currentRoute=='/watchlist'&& "bg-[#262F40] text-white"} cursor-pointer border-2 p-2 border-gray-600 rounded-md hover:bg-[#262F40] hover:text-white text-md}`} >
             <Link href={"/watchlist"}> WatchList Movie</Link>
             </button>
             <ThemeToggle/>
          </div>
    );
};

export default TopBar;