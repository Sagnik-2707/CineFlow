import React, { useState } from 'react';
import { FaSearch } from 'react-icons/fa';
import '../styles/App.css';

function Navbar() {
  const [showInput, setShowInput] = useState(false);
  const [searchText, setSearchText] = useState('');

  const handleIconClick = () => {
    setShowInput(true);
    setTimeout(() => {
      document.getElementById('search-input')?.focus();
    }, 0);
  };

  return (
    <nav className="navbar">
      <div className="logo">CINEFLOW</div>
      <div className="search-container">
        {showInput ? (
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
