import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { MdOutlineMonitorHeart } from "react-icons/md";
import { MdEdit } from "react-icons/md";
import { FaRegTrashAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";


import './Home.css';

function Home() {
  const [clientData, setClientData] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    axios.get('http://192.168.10.251:8000/clients/')
      .then(response => {
        setClientData(response.data);
      })
      .catch(error => {
        console.error('Error fetching client data:', error);
      });
  }, []);

  function monitorClick(client){
    navigate("/monitor", {
      state: { client }
    });
  }

  function editClick(){
    alert("OI");
  }

  function removeClick(){
    alert("OI");
  }

  return (
    <div>
      <h1>Client Data</h1>
      <table>
        <thead>
          <tr>
            <th>Id</th>
            <th>Client</th>
            <th>IP Address</th>
            <th></th>
            <th>Actions</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {clientData.map(client => (
            <tr key={client.id}>
              <td>{client.id}</td>
              <td>{client.name}</td>
              <td>{client.address}</td>
              <td><MdOutlineMonitorHeart className='icon' onClick={() => monitorClick(client)} /></td>
              <td><MdEdit className='icon' onClick={editClick}/></td>
              <td><FaRegTrashAlt className='icon' onClick={removeClick} /></td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Home;