/* eslint-disable @typescript-eslint/no-explicit-any */
"use client"
import MovieList from "@/component/MovieList";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import {  useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";

type Inputs={
  searchValue:string
}
export default function Page() {
  const { register, handleSubmit } = useForm<Inputs>();
  const [searchTerm,setSearchTerm]=useState("")
  const handleSearchTerm: SubmitHandler<Inputs> = data => {
    setSearchTerm(data?.searchValue)
  };

  const [clientQuery]=useState(()=>new QueryClient())
 

  return (
    <div>
      <QueryClientProvider client={clientQuery}>
        <div>
         
          <form onSubmit ={handleSubmit(handleSearchTerm)}className="flex justify-center my-4">
            <div className="flex items-center rounded border-2 border-[#262F40] dark:border-gray-500">
            <input type="text" className="h-[40px] sm:w-[300px] lg:w-[400px] md:w-[400px] p-2 focus:outline-none focus:border-transparent  text-md font-semibold" defaultValue={""} placeholder="Search Movie" {...register("searchValue")}></input>
            <button type="submit" className="p-2 bg-[#262F40] h-[40px] text-xl font-semibold text-white">Search</button>
            </div>
          </form>
        </div>
        <MovieList searchTerm={searchTerm}/>
      </QueryClientProvider>
    </div>
  );
}
