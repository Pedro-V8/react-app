import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineMonitorHeart } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import './Home.css';

function Home() {

  const navigate = useNavigate();

  return (
    <div>
       <nav className="home-nav">
          <ul className="home-ul">
            <li className="home-li">
              <button className="home-button" onClick={() => navigate('/carros')}>Carros</button>
            </li>
            <li className="home-li">
              <button className="home-button" onClick={() => navigate('/motos')}>Motos</button>
            </li>
            <li className="home-li">
              <button className="home-button" onClick={() => navigate('/oficinas')}>Oficinas</button>
            </li>
          </ul>
        </nav>
    </div>
  );
}

export default Home;
