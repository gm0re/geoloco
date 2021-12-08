import React from 'react'
import {
  Routes,
  Route
} from 'react-router-dom';

import Home from './components/Home'
import GeoLocoInit from './components/GeoLocoInit'

const App = () => (
  <Routes>
    <Route path="/" element={<Home />}>
      <Route path="geoloco" element={<GeoLocoInit />} />
    </Route>
  </Routes>
)

export default App
