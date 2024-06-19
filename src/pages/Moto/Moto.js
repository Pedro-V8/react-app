import React, { useState, useEffect } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
import './Moto.css'; 

function Moto() {
  const [motoData, setMotoData] = useState([]);
  const [workshops, setWorkshops] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [newMoto, setNewMoto] = useState({ model: "", year: "", color: "", workshop_id: "" });
  const [editIndex, setEditIndex] = useState(null);
  const navigate = useNavigate();

  async function fetchMotos() {
    try {
      const response = await axios.get('http://localhost:8000/motorcycles');
      setMotoData(response.data);
    } catch (error) {
      console.error('Erro ao buscar dados da moto:', error);
    }
  }

  useEffect(() => {
    fetchMotos();
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

  async function createMoto(event) {
    event.preventDefault();
    try {
      await axios.post('http://localhost:8000/motorcycle', newMoto); 
      setShowModal(false);
      setNewMoto({ model: "", year: "", color: "", workshop_id: "" });
      fetchMotos(); 
    } catch (error) {
      console.error('Erro ao criar moto:', error);
    }
  }

  async function deleteMoto(index) {
    try {
      await axios.delete(`http://localhost:8000/motorcycle/${motoData[index].id}`);
      fetchMotos(); 
    } catch (error) {
      console.error('Erro ao excluir moto:', error);
    }
  }

  function handleChange(event) {
    const { name, value } = event.target;
    setNewMoto({ ...newMoto, [name]: value });
  }

  function editMoto(index) {
    setEditIndex(index);
    const selectedMoto = motoData[index];
    if (selectedMoto) {
      const workshopId = selectedMoto.workshop_id ? selectedMoto.workshop_id.toString() : "";
      setNewMoto({
        ...selectedMoto,
        workshop_id: workshopId,
      });
      setShowModal(true);
    }
  }

  async function updateMoto() {
    try {
      await axios.put(`http://localhost:8000/motorcycle/${newMoto.id}`, newMoto); 
      setShowModal(false);
      setNewMoto({ model: "", year: "", color: "", workshop_id: "" });
      setEditIndex(null);
      fetchMotos(); 
    } catch (error) {
      console.error('Erro ao atualizar moto:', error);
    }
  }

  function goHome() {
    navigate("/");
  }

  return (
    <div>
      <h1>Moto</h1>
      <button className="moto-button" onClick={() => setShowModal(true)}>Criar Moto</button>
      {showModal && (
        <div className="moto-modal">
          <div className="moto-modal-content">
            <span className="moto-close" onClick={() => setShowModal(false)}>&times;</span>
            <h2 className="moto-h2">{editIndex !== null ? "Editar Moto" : "Criar Nova Moto"}</h2>
            <form onSubmit={editIndex !== null ? updateMoto : createMoto}>
              <label>
                Modelo:
                <input type="text" name="model" value={newMoto.model} onChange={handleChange} />
              </label>
              <label>
                Ano:
                <input type="text" name="year" value={newMoto.year} onChange={handleChange} />
              </label>
              <label>
                Cor:
                <input type="text" name="color" value={newMoto.color} onChange={handleChange} />
              </label>
              <label>
                Oficina:
                <select name="workshop_id" value={newMoto.workshop_id} onChange={handleChange}>
                  <option value="">Selecione uma oficina</option>
                  {workshops.map(workshop => (
                    <option key={workshop.id} value={workshop.id}>{workshop.name}</option>
                  ))}
                </select>
              </label>
              <button type="submit" className="moto-button">{editIndex !== null ? "Editar" : "Criar"}</button>
            </form>
          </div>
        </div>
      )}
      <button className="moto-button" onClick={goHome}>Voltar</button>
      <div className="moto-monitoring-table">
        <table className="moto-table">
          <thead>
            <tr>
              <th className="moto-th">Modelo</th>
              <th className="moto-th">Ano</th>
              <th className="moto-th">Cor</th>
              <th className="moto-th">Oficina</th>
              <th className="moto-th">Editar</th>
              <th className="moto-th">Excluir</th>
            </tr>
          </thead>
          <tbody>
            {motoData.map((moto, index) => (
              <tr className="moto-tr" key={index}>
                <td className="moto-td">{moto.model}</td>
                <td className="moto-td">{moto.year}</td>
                <td className="moto-td">{moto.color}</td>
                <td className="moto-td">{moto.workshop_name}</td>
                <td className="moto-td"><button className="moto-button" onClick={() => editMoto(index)}>Editar</button></td>
                <td className="moto-td"><button className="moto-button" onClick={() => deleteMoto(index)}>Excluir</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Moto;
