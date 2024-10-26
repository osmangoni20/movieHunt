
# Movie Hunt

A movie browsing application that allows users to discover new movies, view details, and manage a watchlist.

## Features

- Search for movies using the TMDB API.
- View detailed information about selected movies.
- Add movies to a watchlist.
- Dynamic movie recommendations based on user preferences.

## Future Enhancements

1. **User Authentication**: Implement user authentication to allow users to save their favorite movies and watchlists securely. This could include using OAuth providers or a custom authentication solution.

2. **Search and Filter Functionality**: Enhance the search feature to allow filtering by genres, ratings, and release years for a more tailored movie selection experience.

3. **UI/UX Improvements**: Invest time in improving the UI/UX, perhaps by utilizing a design system or library for consistent styling and enhanced accessibility.

4. **Unit and Integration Testing**: Add tests to improve code quality and ensure features work as intended. Consider using Jest and React Testing Library for testing components and Redux actions.

## Trade-offs Made

- **API Rate Limiting**: The project uses the TMDB API for fetching movie data, which has rate limits. To manage this, I opted for dynamic caching but could potentially hit limits with extensive user interactions.

- **Initial Loading Time**: While implementing Server-Side Rendering (SSR) improves SEO and user experience on initial load, it may slow down the time taken to render pages, especially for users with slower internet connections.

- **State Management Complexity**: Using Redux for state management introduces complexity that might be unnecessary for smaller apps. However, it allows for more scalable solutions as the app grows.

## Live Demo

You can view the live application [here](https://movie-hunt-seven.vercel.app/).