import React, { useEffect, useState } from 'react';
import { Routes, Route, useLocation } from 'react-router-dom';

import reactLogo from './assets/react.svg';
import './styles/style.css';

import Home from './templates/Home';
import Results from './templates/Results';

function App() {
  return (
    <Routes>
    {/* <Route exact path="/">
      <Redirect to="/home" /> : <Home />
    </Route> */}
    <Route path="/" element={<Home />} />
    <Route path="/results" element={<Results />} />
  </Routes>
  );
}

export default App;
