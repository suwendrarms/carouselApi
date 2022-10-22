import React from 'react'
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import HomeSlider from './components/Carousel'
import AddSlider from './components/AddSlider'

function App() {
  return (<div>
    <Router>
        <Routes>
          <Route path="/" element={<HomeSlider />} />
          <Route path="/create-slider" element={<AddSlider />} />
        </Routes>
      </Router>
  </div>);
}

export default App;
