// src/pages/DescriptionPage.jsx
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import Navbar from '../components/Navbar';

const TOKEN = import.meta.env.VITE_BEARER_TOKEN;

  const genreClassMap = {
  28: "'Bebas Neue', sans-serif", // Action
  12: "'Russo One', sans-serif",  // Adventure
  35: "'Chewy', cursive",         // Comedy
  18: "'Playfair Display', serif",// Drama
  14: "'Uncial Antiqua', cursive",// Fantasy
  27: "'Creepster', cursive",     // Horror
  9648: "'Special Elite', monospace", // Mystery
  10749: "'Great Vibes', cursive",    // Romance
  878: "'Orbitron', sans-serif",      // Sci-Fi
  53: "'Teko', sans-serif",           // Thriller
  37: "'Rye', cursive",               // Western
};



function DescriptionPage() {
  const { id } = useParams();
  const [movie, setMovie] = useState(null);
  const[trailer, setTrailer] = useState(null);
  const[titleFont, setTitleFont] = useState('');
  const[showPoster, setShowPoster] = useState(true);

  useEffect(() => {
    async function getMovieDetails() {
      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };

      try {
        const res = await axios.get(
          `https://api.themoviedb.org/3/movie/${id}?language=en-US`,
          config
        );
        setMovie(res.data);

        if(res.data.genres && res.data.genres.length > 0)
        {
            const genreId = res.data.genres[0].id;
            const font = genreClassMap[genreId] || '';
            setTitleFont(font);
        }
      } catch (error) {
        console.error("Failed to fetch movie details:", error);
      }
    }

    getMovieDetails();
  }, [id]);

  useEffect(() => {
    async function getMovieTrailer() {
        const config = {
            headers: {
                Authorization : `Bearer ${TOKEN}`,
            },
        };
        try{
            const res = await axios.get(`https://api.themoviedb.org/3/movie/${id}/videos?language=en-US`, config);
            const trailer = res.data.results.find(
                (vid) => vid.type ==="Trailer" && vid.site ==="YouTube");
            if(trailer)
                setTrailer(trailer.key);
        }
        catch (error){
            console.error("Failed to fetch trailer", error);
        }
    }
    getMovieTrailer();
  }, [id]);
   /*useEffect(() => {
    const timer = setTimeout(() => {
      setShowPoster(false);
    }, 5000);
    return () => clearTimeout(timer);
  }, [id]);*/

  
 return (
  <div>
    <Navbar />
    {trailer ? (
      <div className="video-wrapper">
        {/* Trailer iframe */}
        <iframe
          id="video"
          width="100%"
          height="500"
          src={`https://www.youtube.com/embed/${trailer}?autoplay=1&mute=1&start=5`}
          title="Movie Trailer"
          frameBorder="0"
          allow="autoplay; fullscreen"
          allowFullScreen
        ></iframe>

        {/* Title */}
        <h1 className="title" style={{ fontFamily: titleFont }}>
          {movie.title}
        </h1>
        {//<div className="info"><strong>Overview:</strong> {movie.overview}</div>
        /*<div className="info"><strong>Release Date:</strong> {movie.release_date}</div>
        <div className="info"><strong>Rating:</strong> {movie.vote_average} / 10</div>
        {/* Movie info in separate div */}
        {/*<div className="movie-info">
          <p><strong>Overview:</strong> {movie.overview}</p>
          <p><strong>Release Date:</strong> {movie.release_date}</p>
          <p><strong>Rating:</strong> {movie.vote_average} / 10</p>
        </div>*/}
      </div>
    ) : (
      <p>Loading...</p>
    )}
  </div>
);
}
export default DescriptionPage;
