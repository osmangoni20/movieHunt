export interface  TMovie {
    adult: boolean;
    backdrop_path: string;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
  }
  export interface MovieResponse {
    page: number;
    results: TMovie[];
    total_pages: number;
    total_results: number;
  }

  // Type for Genres
export interface TGenre {
  id: number;
  name: string;
}

// Type for Movie Details
export interface TMovieDetail {
  id: number;
  title: string;
  overview: string;
  poster_path: string;
  release_date: string;
  genres: TGenre[];
}

// Type for Cast Member
export interface TCastMember {
  cast_id: number;
  name: string;
  character: string;
}

// Type for Credits (Cast List)
export interface TCredits {
  cast: TCastMember[];
}

// Type for Recommended Movie
export interface TRecommendedMovie {
  id: number;
  title: string;
  poster_path: string;
  release_date:string,
  vote_average:string
}

// Type for Recommendations
export interface TRecommendations {
  results: TRecommendedMovie[];
}