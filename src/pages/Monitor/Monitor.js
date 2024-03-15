import React, { useState, useEffect } from "react";
import './Monitor.css';
import { useLocation } from 'react-router-dom';

function Monitor() {
  const location = useLocation();
  const client = location.state.client;

  const [websckt, setWebsckt] = useState(null);

  useEffect(() => {
    const url = "ws://localhost:8000/ws/" + 1;
    const ws = new WebSocket(url);

    ws.onopen = () => {
      /*setInterval(() => {
        ws.send(client);
      }, 1000);*/
      ws.send(JSON.stringify(client));
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      console.log(message);
    };

    setWebsckt(ws);

    // Clean up function when the component unmounts or before the effect runs again
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, []);


  return (
    <div>
      <h1>Monitor</h1>
      
    </div>
  );
}

export default Monitor;