import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/App.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios'; // ⬅️ IMPORTANT
const TOKEN = import.meta.env.VITE_BEARER_TOKEN;

function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState('');
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  const handleIconClick = () => {
    setShowInput(true);
    setTimeout(() => {
      document.getElementById('search-input')?.focus();
    }, 0);
  };

  useEffect(() => {
    if (searchText.trim() === '') {
      setResults([]);
      return;
    }

    const fetchResults = async () => {
      try {
        const res = await axios.get(`https://api.themoviedb.org/3/search/movie`, {
          params: { query: searchText },
          headers: {
            Authorization: `Bearer ${TOKEN}`,
            accept: 'application/json',
          },
        });
        setResults(res.data.results || []);
      } catch (error) {
        console.error("Search API Error", error);
      }
    };

    const debounce = setTimeout(fetchResults, 300);
    return () => clearTimeout(debounce);
  }, [searchText]);

  return (
    <nav className="navbar">
      <div className="logo" onClick={() => navigate(`/`)}>CINEFLOW</div>
      <div className="search-container">
        {showInput ? (
          <>
            <input
              id="search-input"
              className="search-input"
              type="text"
              placeholder="Search..."
              value={searchText}
              onChange={(e) => setSearchText(e.target.value)}
              onBlur={() => {
                setShowInput(false);
                setSearchText('');
              }}
            />
            {results.length > 0 && (
              <ul className="search-results">
              {results.slice(0, 5).map((movie) => {
              return (
              <li
                className='navabar-li'
                key={movie.id}
                onMouseDown={() => navigate(`/movie/${movie.id}`)}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w45${movie.poster_path}`} // smaller TMDB size
                  alt={movie.original_title}
                  style={{ borderRadius: '3px', width: '45px', height: 'auto' }}
                />
                <span style={{ lineHeight: '1.2' }}>
                  <strong style={{ fontSize: '0.95rem' }}>{movie.original_title}</strong>
                  <span style={{ fontSize: '0.8rem', color: '#666' }}>
                    {new Date(movie.release_date).getFullYear()}
                  </span>
                </span>
              </li>

                );
             })}                 </ul>
            )}
          </>
        ) : (
          <FaSearch
            className="search-icon"
            onClick={handleIconClick}
            style={{ cursor: 'pointer' }}
          />
        )}
      </div>
    </nav>
  );
}

export default Navbar;
