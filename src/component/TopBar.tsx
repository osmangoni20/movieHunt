
"use client";

import Link from "next/link";

import { usePathname } from 'next/navigation'
import ThemeToggle from '../ui/ThemeToggle'
const TopBar = () => {
    const currentRoute =usePathname()
    return (
            <div className="flex justify-between items-center px-2 max-w-[1200px] mx-auto mt-10 mb-0">
             <Link href={"/"}> <button className={` ${currentRoute=='/'&& "bg-[#262F40] text-white"} cursor-pointer border-2 p-2 border-gray-600 rounded-md hover:bg-[#262F40] hover:text-white text-md}`} >
             Popular Movie
             </button>
             </Link>
             <Link href={"/watchlist"}>
             <button className={` ${currentRoute=='/watchlist'&& "bg-[#262F40] text-white"} cursor-pointer border-2 p-2 border-gray-600 rounded-md hover:bg-[#262F40] hover:text-white text-md}`} >
             WatchList Movie
             </button>
             </Link>
             <ThemeToggle/>
          </div>
    );
};

export default TopBar;