import React, { useState, useEffect } from 'react';
import axios from 'axios';

const TOKEN = import.meta.env.VITE_BEARER_TOKEN;

function Banner() {
  const [movie, setMovie] = useState(null);
  const [trailerKey, setTrailerKey] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        // Fetch now playing movies
        const res = await axios.get("https://api.themoviedb.org/3/movie/now_playing", {
          headers: { Authorization: `Bearer ${TOKEN}` },
          params: { language: "en-US", page: 1 }
        });

        // Pick a random movie
        const randomMovie = res.data.results[Math.floor(Math.random() * res.data.results.length)];
        setMovie(randomMovie);

        // Fetch trailer
        const trailerRes = await axios.get(`https://api.themoviedb.org/3/movie/${randomMovie.id}/videos`, {
          headers: { Authorization: `Bearer ${TOKEN}` }
        });

        const trailer = trailerRes.data.results.find(v => v.type === "Trailer" && v.site === "YouTube");
        if (trailer) {
          setTrailerKey(trailer.key);
        }
      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <header className="banner">
      {trailerKey && (
       <iframe
        className="banner-video"
        src={`https://www.youtube.com/embed/${trailerKey}?autoplay=1&mute=1&controls=0&modestbranding=1&rel=0&showinfo=0&iv_load_policy=3&loop=1&playlist=${trailerKey}`}
        title="Trailer"
        frameBorder="0"
        allow="autoplay; encrypted-media"
    ></iframe>
      )}

      <div className="banner-content">
        <h1 className="banner-title">{movie?.title}</h1>
        <p className="banner-overview">{movie?.overview}</p>
      </div>
    </header>
  );
}

export default Banner;
