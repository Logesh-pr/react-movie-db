const key = import.meta.env.VITE_TMDB_API_KEY;
export const requests = {
  nowPlaying: `https://api.themoviedb.org/3/movie/now_playing?api_key=${key}`,
  trendingMovies: `
  https://api.themoviedb.org/3/trending/movie/day?api_key=${key}`,
  trendingTvShows: `
  https://api.themoviedb.org/3/trending/tv/day?api_key=${key}`,
  topRatedMovies: `
  https://api.themoviedb.org/3/movie/top_rated?api_key=${key}`,
  topRatedTvShows: `
  https://api.themoviedb.org/3/tv/top_rated?api_key=${key}`,
  movieGenres: `https://api.themoviedb.org/3/genre/movie/list?api_key=${key}&language=en`,
  tvGenres: `https://api.themoviedb.org/3/genre/tv/list?api_key=${key}&language=en`,
  discoverMovieGenres: `https://api.themoviedb.org/3/discover/movie?api_key=${key}&with_genres=`,
};

export default requests;
