import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './pages/Home/Home';
import Carro from "./pages/Carro/Carro";
import Moto from "./pages/Moto/Moto";
import Oficina from "./pages/Oficina/Oficina";


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/carros" element={<Carro />} />
        <Route path="/motos" element={<Moto />} />
        <Route path="/oficinas" element={<Oficina />} />
        
      </Routes>
    </Router>
  );
}

export default App;