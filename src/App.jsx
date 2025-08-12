// src/App.jsx
import React from 'react';
import { Routes, Route } from 'react-router-dom';
import BrowsePage from './pages/BrowsePage';
import DescriptionPage from './pages/DescriptionPage';

function App() {
  return (
    <Routes>
      <Route path="/" element={<BrowsePage />} />
      <Route path="/movie/:id" element={<DescriptionPage />} />
    </Routes>
  );
}

export default App;
