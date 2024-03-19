import React, { useState, useEffect } from "react";
import { useLocation } from 'react-router-dom';
import { useNavigate } from "react-router-dom";
import './Monitor.css';

function Monitor() {
  const location = useLocation();
  const client = location.state.client;
  const navigate = useNavigate();

  const [websckt, setWebsckt] = useState(null);
  const [data, setData] = useState([]);
  const [isMounted, setIsMounted] = useState(false); // Track component mount state
  
  useEffect(() => {
    const url = "ws://localhost:8000/ws/" + 1;
    const ws = new WebSocket(url);
    ws.onopen = () => {
      ws.send(JSON.stringify(client));
    };

    ws.onmessage = (e) => {
      const message = JSON.parse(e.data);
      setData(JSON.parse(message));
    };

    setWebsckt(ws);

    // Cleanup function when the component unmounts
    return () => {
      ws.close();
    };

  }, []);

  function goHome() {
    navigate("/");
  }

  return (
    <div>
      <h1>Monitor</h1>
      <div className="monitoring-table">
        <button onClick={goHome}>Back</button>
        <h2>Monitoring Table</h2>
        <table>
          <thead>
            <tr>
              <th>Type</th>
              <th>Status</th>
              <th>Message</th>
            </tr>
          </thead>
          <tbody>
            {data.map((item, index) => (
              <tr key={index}>
                <td>{item.type}</td>
                <td className={item.status === 'OK' ? 'status-ok' : 'status-warning'}>{item.status}</td>
                <td>{item.message}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Monitor;