import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Home from './component/Home';
import CountryDetails from './component/CountryDetails';


function App() {

  return (
    <Router>
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/country/:countryCode" element={<CountryDetails />} />
    </Routes>
  </Router>
  )
}

export default App
