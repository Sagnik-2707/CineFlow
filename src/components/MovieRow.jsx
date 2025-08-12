// src/components/MovieRow.jsx
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/App.css';

function MovieRow({ title, movies }) {
  const navigate = useNavigate();

  return (
    <div className="row">
      <h2>{title}</h2>
      <div className="row-posters">
        {movies.map((movie) => (
          <img
            key={movie.id}
            className="row-poster"
            src={`https://image.tmdb.org/t/p/w300${movie.poster_path}`}
            alt={movie.title}
            onClick={() => navigate(`/movie/${movie.id}`)}
          />
        ))}
      </div>
    </div>
  );
}

export default MovieRow;
