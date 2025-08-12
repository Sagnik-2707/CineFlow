import React, { useState, useEffect } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/App.css';
import {useNavigate} from 'react-router-dom';

function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState('');
  //const[query, setQuery] = useState('');
  const[results, setResults] = useState([]);
  const navigate=useNavigate();

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
        },
      });
      setResults(res.data.results || []);
    } catch (error) {
      console.error("Search API Error", error);
    }
  };

  const debounce = setTimeout(fetchResults, 300); // debounce for smoother typing
  return () => clearTimeout(debounce);
}, [searchText]);

 return (
  <nav className="navbar">
    <div className="logo">CINEFLOW</div>
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
              setSearchText(''); // optional: clear text
            }}
          />
          {results.length > 0 && (
            <ul className="search-results">
              {results.slice(0, 5).map((movie) => (
                <li 
                    key={movie.id}
                    onClick={() => navigate(`/movie/${movie.id}`)}
                    style={{ cursor: 'pointer' }}
                    >{movie.title}</li>
              ))}
            </ul>
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
