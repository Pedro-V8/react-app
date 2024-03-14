import React from 'react';
import './Monitor.css';
import { useLocation } from 'react-router-dom';

function Monitor() {
  const location = useLocation();
  const client = location.state.client;

  console.log(client)


  return (
    <div>
      <h1>Monitor</h1>
      
    </div>
  );
}

export default Monitor;