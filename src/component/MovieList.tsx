
"use client"; 

import { useInfiniteQuery } from '@tanstack/react-query';
import Image from 'next/image';
import { useInView } from 'react-intersection-observer';
import { useEffect, useMemo } from 'react';
import { getMovies } from '@/utils/api/getMovies';
import Link from 'next/link';

const MovieList = ({searchTerm}:{searchTerm: string}) => {
  const { ref, inView } = useInView({
    triggerOnce: false,
    rootMargin: '100px',
  });
console.log(searchTerm)
  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetchingNextPage,
    isLoading,
    isError,
  } = useInfiniteQuery({
    queryKey: ['movies',searchTerm],
    queryFn: ({ pageParam = 1 }) => getMovies(pageParam,searchTerm),  
    getNextPageParam: (lastPage) => {
      return lastPage.page < lastPage.total_pages ? lastPage.page + 1 : undefined;
    },
    initialPageParam: 1, 
  });

  const allMovies = useMemo(() => {
    const all = data?.pages.flatMap(page => page.results);
    
    // Use a Set to ensure uniqueness based on movie.id
    const uniqueMovies = Array.from(new Set(all?.map(movie => movie.id)))
      .map(id => all?.find(movie => movie.id === id));

    return uniqueMovies;
  }, [data]);


  useEffect(() => {

    if (inView && hasNextPage) {
      fetchNextPage();
    }
  }, [inView, hasNextPage, fetchNextPage]);

  if (isLoading) return <div className='flex justify-center'>
    <p className='loading_spinner'></p>
  </div>;
  if (isError) return <p className='text-sm font-semibold text-center text-red-500'>Error loading movies</p>;
 
  return (
    <div className='max-w-[1200px] mx-auto p-5'>
      <h1 className='text-3xl py-2 font-semibold font-sans'>Popular Movies</h1>
      <div className='grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5'>
        {
         allMovies?.map((movie) => (
           
              <div key={movie?.id} className='cursor-pointer'>
                 <Link href={`/movies/${movie?.id}`}>
              <Image
                src={`https://image.tmdb.org/t/p/w300${movie?.poster_path}`}
                alt={movie?.title||""}
                width={200}
                height={300}
                loading="lazy"
              />
              <h3>{movie?.title}</h3>
              <p><span className='font-semibold'>Release Date: </span>{movie?.release_date}</p>
              <p><span className='font-semibold'>Rating:</span> {movie?.vote_average}</p>
              </Link>
            </div>
            
          ))

        }
      </div>
      {
        allMovies.length==0&& <div className='w-full flex justify-center text-sm text-red-400'>
            <p>Not Found this movie . Search another movie </p>
          </div>
          }
      {isFetchingNextPage && <p>Loading more movies...</p>}
      {hasNextPage && !isFetchingNextPage && (
        <div ref={ref} style={{ height: '100px', background: 'transparent' }}></div>
      )}
    </div>
  );
};

export default MovieList;
