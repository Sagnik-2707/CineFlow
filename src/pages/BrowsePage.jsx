// src/pages/BrowsePage.jsx
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import MovieRow from '../components/MovieRow';
import Navbar from '../components/NavBar';
import Banner from '../components/Banner';
import Footer from '../components/Footer';

const TOKEN = import.meta.env.VITE_BEARER_TOKEN;

function BrowsePage() {
  const [trending, setTrending] = useState([]);
  const [topRated, setTopRated] = useState([]);
  const [actionMovies, setActionMovies] = useState([]);
  const [bollywoodMovies, setBollywoodMovies] = useState([]); 
  const [romComs, setRomComs] = useState([]);
  const [horrorMovies, setHorrorMovies] = useState([]);
  const [thrillerMovies, setThrillerMovies] = useState([]);

  useEffect(() => {
    async function fetchData() {
      const config = {
        headers: {
          Authorization: `Bearer ${TOKEN}`,
        },
      };

      try {
        // Trending
        const trendingRes = await axios.get(
          `https://api.themoviedb.org/3/trending/movie/week?language=en-US`,
          config
        );
        setTrending(trendingRes.data.results);

        // Top Rated
        const topRatedRes = await axios.get(
          `https://api.themoviedb.org/3/movie/top_rated?language=en-US`,
          config
        );
        setTopRated(topRatedRes.data.results);

        // Action Movies
        const actionRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=28&language=en-US`,
          config
        );
        setActionMovies(actionRes.data.results);

        // Bollywood (Hindi-language movies)
        const bollywoodRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_original_language=hi&sort_by=popularity.desc`,
          config
        );
        setBollywoodMovies(bollywoodRes.data.results);

        // RomComs (Romance + Comedy)
        const romComRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=10749,35&language=en-US&sort_by=popularity.desc`,
          config
        );
        setRomComs(romComRes.data.results);

        // Horror
        const horrorRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=27&language=en-US&sort_by=popularity.desc`,
          config
        );
        setHorrorMovies(horrorRes.data.results);

        // Thriller
        const thrillerRes = await axios.get(
          `https://api.themoviedb.org/3/discover/movie?with_genres=53&language=en-US&sort_by=popularity.desc`,
          config
        );
        setThrillerMovies(thrillerRes.data.results);

      } catch (error) {
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <>
      <Navbar />
      <Banner/>
      <MovieRow title="Trending Now" movies={trending} />
      <MovieRow title="Top Rated" movies={topRated} />
      <MovieRow title="Heart Wrenching" movies={actionMovies} />
      <MovieRow title="Bollywood Blockbusters" movies={bollywoodMovies} /> 
      <MovieRow title="Heartfelt" movies={romComs} />
      <MovieRow title="Creepy" movies={horrorMovies} />
      <MovieRow title="Nail-Biters" movies={thrillerMovies} />
      <Footer/>
    </>
  );
}

export default BrowsePage;
