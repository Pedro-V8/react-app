import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Carro.css';

function Carro() {
  const [carData, setCarData] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newCar, setNewCar] = useState({ model: "", year: "", color: "", workshop_id: "" });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  async function fetchData() {
    try {
      const response = await axios.get('http://localhost:8000/cars');
      setCarData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados do carro:', error);
    }
  }

  useEffect(() => {
    fetchData();
  }, []);

  async function fetchWorkshops() {
    try {
      const response = await axios.get('http://localhost:8000/workshops');
      setWorkshops(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados das oficinas:', error);
    }
  }
  
  useEffect(() => {
    fetchWorkshops();
  }, []);

  async function createCar() {
    try {
      await axios.post('http://localhost:8000/car', newCar);
      setShowModal(false);
      setNewCar({ model: "", year: "", color: "", workshop_id: "" });
      fetchData();
    } catch (error) {
      console.error('Erro ao criar carro:', error);
    }
  }

  async function deleteCar(index) {
    try {
      await axios.delete(`http://localhost:8000/car/${carData[index].id}`);
      fetchData();
    } catch (error) {
      console.error('Erro ao excluir carro:', error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewCar({ ...newCar, [name]: value });
  }

  function editCar(index) {
    setEditIndex(index);
    const selectedCar = carData[index];
    if (selectedCar) {
      
      const workshopId = selectedCar.workshop_id ? selectedCar.workshop_id.toString() : "";
      setNewCar({
        ...selectedCar,
        workshop_id: workshopId,
      });
      setShowModal(true);
    }
  }
  

  async function updateCar() {
    try {
      await axios.put(`http://localhost:8000/car/${newCar.id}`, {
        model: newCar.model,
        year: newCar.year,
        color: newCar.color,
        workshop_id: newCar.workshop_id, 
      });
      setShowModal(false);
      setNewCar({ model: "", year: "", color: "", workshop_id: "" });
      setEditIndex(null);
      fetchData();
    } catch (error) {
      console.error('Erro ao atualizar carro:', error);
    }
  }

  function goHome() {
    navigate("/");
  }

  return (
    <div>
      <h1>Carro</h1>
      <button className="carro-button" onClick={() => setShowModal(true)}>Criar Carro</button>
      {showModal && (
        <div className="carro-modal">
          <div className="carro-modal-content">
            <span className="carro-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="carro-h2">{editIndex !== null ? "Editar Carro" : "Criar Novo Carro"}</h2>
            <form onSubmit={editIndex !== null ? updateCar : createCar}>
              <label>
                Modelo:
                <input type="text" name="model" value={newCar.model} onChange={handleChange} />
              </label>
              <label>
                Ano:
                <input type="text" name="year" value={newCar.year} onChange={handleChange} />
              </label>
              <label>
                Cor:
                <input type="text" name="color" value={newCar.color} onChange={handleChange} />
              </label>
              <label>
                Oficina:
                <select name="workshop_id" value={newCar.workshop_id} onChange={handleChange}>
                  <option value="">Selecione uma oficina</option>
                  {workshops.map(workshop => (
                    <option key={workshop.id} value={workshop.id}>{workshop.name}</option>
                  ))}
                </select>
            </label>
              <button type="submit" className="carro-button">{editIndex !== null ? "Editar" : "Criar"}</button>
            </form>
          </div>
        </div>
      )}
      <button className="carro-button" onClick={goHome}>Voltar</button>
      <div className="carro-monitoring-table">
        <table className="carro-table">
          <thead>
            <tr>
              <th className="carro-th">Modelo</th>
              <th className="carro-th">Ano</th>
              <th className="carro-th">Cor</th>
              <th className="carro-th">Oficina</th>
              <th className="carro-th">Editar</th>
              <th className="carro-th">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {carData.map((car, index) => (
              <tr className="carro-tr" key={index}>
                <td className="carro-td">{car.model}</td>
                <td className="carro-td">{car.year}</td>
                <td className="carro-td">{car.color}</td>
                <td className="carro-td">{car.workshop_name}</td>
                <td className="carro-td"><button className="carro-button" onClick={() => editCar(index)}>Editar</button></td>
                <td className="carro-td"><button className="carro-button" onClick={() => deleteCar(index)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Carro;
