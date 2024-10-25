/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import MovieList from "@/component/MovieList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  useState } from "react";

export default function Page() {
  const [clientQuery]=useState(()=>new QueryClient())
  const [searchTerm, setSearchTerm]=useState<string>("")
  const HandleSubmit= async (e:any)=>{
    e.preventDefault()
    const form =e.target
    const queryData=form.searchValue.value
    setSearchTerm(queryData)
  }
  return (
    <div>
      <QueryClientProvider client={clientQuery}>
        <div>
         
          <form onSubmit ={HandleSubmit}className="flex justify-center">
            <div className="flex items-center rounded border-2 border-[#262F40]">
            <input type="text" className="h-[40px] p-2 focus:outline-none focus:border-transparent w-[400px] text-md font-semibold" placeholder="Search Movie" name="searchValue"></input>
            <button type="submit" className="p-2 bg-[#262F40] h-[40px] text-xl font-semibold text-white">Search</button>
            </div>
          </form>
        </div>
        <MovieList searchTerm={searchTerm}/>
      </QueryClientProvider>
    </div>
  );
}
