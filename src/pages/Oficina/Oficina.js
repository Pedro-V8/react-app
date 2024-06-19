import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Oficina.css';

function Oficina() {
  const [oficinaData, setOficinaData] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newOficina, setNewOficina] = useState({ name: "", address: "" });
  const [editIndex, setEditIndex] = useState(null);
  const [showCarsModal, setShowCarsModal] = useState(false);
  const [showMotosModal, setShowMotosModal] = useState(false);
  const [selectedCars, setSelectedCars] = useState([]);
  const [selectedMotos, setSelectedMotos] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8000/workshops');
      setOficinaData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados das oficinas:', error);
    }
  }

  async function createOficina() {
    try {
      await axios.post('http://localhost:8000/workshop', newOficina);
      setShowModal(false);
      setNewOficina({ name: "", address: "" });
      fetchData();
    } catch (error) {
      console.error('Erro ao criar oficina:', error);
    }
  }

  async function deleteOficina(id) {
    try {
      await axios.delete(`http://localhost:8000/workshop/${id}`);
      fetchData();
    } catch (error) {
      console.error('Erro ao excluir oficina:', error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewOficina(prevState => ({
      ...prevState,
      [name]: value
    }));
  }

  function editOficina(index) {
    setEditIndex(index);
    setNewOficina({ ...oficinaData[index] });
    setShowModal(true);
  }

  async function updateOficina() {
    try {
      await axios.put(`http://localhost:8000/workshop/${newOficina.id}`, newOficina);
      setShowModal(false);
      setNewOficina({ name: "", address: "" });
      setEditIndex(null);
      fetchData();
    } catch (error) {
      console.error('Erro ao atualizar oficina:', error);
    }
  }

  function openCarsModal(cars) {
    setSelectedCars(cars);
    setShowCarsModal(true);
  }

  function closeCarsModal() {
    setShowCarsModal(false);
    setSelectedCars([]);
  }

  function openMotosModal(motos) {
    setSelectedMotos(motos);
    setShowMotosModal(true);
  }

  function closeMotosModal() {
    setShowMotosModal(false);
    setSelectedMotos([]);
  }

  function goHome() {
    navigate("/");
  }

  return (
    <div>
      <h1>Oficina</h1>
      <button className="oficina-button" onClick={() => setShowModal(true)}>Criar Oficina</button>
      {showModal && (
        <div className="oficina-modal">
          <div className="oficina-modal-content">
            <span className="oficina-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="oficina-h2">{editIndex !== null ? "Editar Oficina" : "Criar Nova Oficina"}</h2>
            <form onSubmit={editIndex !== null ? updateOficina : createOficina}>
              <label>
                Nome:
                <input type="text" name="name" value={newOficina.name} onChange={handleChange} />
              </label>
              <label>
                Endereço:
                <input type="text" name="address" value={newOficina.address} onChange={handleChange} />
              </label>
              <button type="submit" className="oficina-button">{editIndex !== null ? "Editar" : "Criar"}</button>
            </form>
          </div>
        </div>
      )}
      <button className="oficina-button" onClick={goHome}>Voltar</button>
      <div className="oficina-monitoring-table">
        <table className="oficina-table">
          <thead>
            <tr>
              <th className="oficina-th">Nome</th>
              <th className="oficina-th">Endereço</th>
              <th className="oficina-th">Carros</th>
              <th className="oficina-th">Motos</th>
              <th className="oficina-th">Editar</th>
              <th className="oficina-th">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {oficinaData.map((oficina, index) => (
              <tr className="oficina-tr" key={index}>
                <td className="oficina-td">{oficina.name}</td>
                <td className="oficina-td">{oficina.address}</td>
                <td className="oficina-td">
                  <button className="oficina-button" onClick={() => openCarsModal(oficina.cars)}>Ver Carros</button>
                </td>
                <td className="oficina-td">
                  <button className="oficina-button" onClick={() => openMotosModal(oficina.motorcycles)}>Ver Motos</button>
                </td>
                <td className="oficina-td"><button className="oficina-button" onClick={() => editOficina(index)}>Editar</button></td>
                <td className="oficina-td"><button className="oficina-button" onClick={() => deleteOficina(oficina.id)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

     
      {showCarsModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeCarsModal}>&times;</span>
            <h2>Carros</h2>
            <ul>
              {selectedCars.map((car, idx) => (
                <li key={idx}>{car.model} - {car.year} - {car.color}</li>
              ))}
            </ul>
          </div>
        </div>
      )}

      
      {showMotosModal && (
        <div className="modal-overlay">
          <div className="modal">
            <span className="close" onClick={closeMotosModal}>&times;</span>
            <h2>Motos</h2>
            <ul>
              {selectedMotos.map((moto, idx) => (
                <li key={idx}>{moto.model} - {moto.year} - {moto.color}</li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </div>
  );
}

export default Oficina;
