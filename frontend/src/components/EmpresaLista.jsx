import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { Table, Button, Modal, Form, Message } from 'semantic-ui-react'

const EmpresaLista = () => {
  const [empresas, setEmpresas] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEmpresa, setSelectedEmpresa] = useState(null)
  const [nombre, setNombre] = useState('')
  const [fechaConstitucion, setFechaConstitucion] = useState('')
  const [tipo, setTipo] = useState('')
  const [comentarios, setComentarios] = useState('')
  const [favorita, setFavorita] = useState(false)
  const [error, setError] = useState('')


  //Funcion para obtener las empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const { data } = await Axios.get("http://localhost:4000/obtenerEmpresas")
        // console.log("Empresas recibidas:", data)
        
        if (data.message && data.message === 'Sin empresas') {
          setEmpresas([])
        } else {
          setEmpresas(data)
        }
      } catch (error) {
        console.error("Error al obtener empresas:", error);
        setError('Error al obtener empresas. Intente nuevamente.')
      }
    };
    fetchEmpresas();
  }, [])

  //Funcion para agregar y actualizar las empresas
  const handleSave = async () => {
    if (!nombre || !fechaConstitucion || !tipo) {
      setError('Todos los campos son obligatorios.')
      return
    }

    try {
      const nuevaEmpresa = { 
        nombre, 
        fecha_constitucion: fechaConstitucion, 
        tipo_empresa: tipo, 
        comentarios, 
        favorita: favorita ? 1 : 0 
      };
      if (selectedEmpresa) {
        await Axios.put(`http://localhost:4000/actualizaEmpresas/${selectedEmpresa.id}`, nuevaEmpresa)
        setEmpresas(empresas.map(empresa => (empresa.id === selectedEmpresa.id ? nuevaEmpresa : empresa)))
      } else {
        await Axios.post("http://localhost:4000/agregarEmpresas", nuevaEmpresa)
        setEmpresas([...empresas, nuevaEmpresa])
      }
      setModalOpen(false)
      resetForm()
      window.location.reload()
    } catch (error) {
      console.error('Error al guardar empresa:', error);
      setError('Error al guardar la empresa. Intente nuevamente.')
    }
  }

  //Funcion para eliminar las empresas
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:4000/borrarEmpresas/${id}`)
      setEmpresas(empresas.filter(empresa => empresa.id !== id))
    } catch (error) {
      console.error('Error al eliminar empresa:', error);
      setError('Error al eliminar la empresa. Intente nuevamente.')
    }
  }

  //Funcion para reiniciar los datos del formulario
  const resetForm = () => {
    setNombre('')
    setFechaConstitucion('')
    setTipo('')
    setComentarios('')
    setFavorita(false)
    setError('')
    setSelectedEmpresa(null)
  };

  //Funcion para editar los datos de la empresa seleccionada
  const handleEdit = (empresa) => {
    setSelectedEmpresa(empresa)
    setNombre(empresa.nombre)
    setFechaConstitucion(empresa.fecha_constitucion.split('T')[0])
    setTipo(empresa.tipo_empresa)
    setComentarios(empresa.comentarios || '')
    setFavorita(empresa.favorita === 1)
    setModalOpen(true)
  }

  return (
    <div>
      <Button primary onClick={() => {
        resetForm();
        setModalOpen(true);
      }}>Agregar Empresa</Button>
      
      {empresas.length === 0 ? (
        <p>No hay empresas registradas.</p>
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>Nombre</Table.HeaderCell>
              <Table.HeaderCell>Tipo de Empresa</Table.HeaderCell>
              <Table.HeaderCell>Fecha de Constitución</Table.HeaderCell>
              <Table.HeaderCell>Favorita</Table.HeaderCell>
              <Table.HeaderCell>Acciones</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {empresas.map((empresa) => (
              <Table.Row key={empresa.id}>
                <Table.Cell>{empresa.nombre}</Table.Cell>
                <Table.Cell>{empresa.tipo_empresa}</Table.Cell>
                <Table.Cell>{empresa.fecha_constitucion.split('T')[0]}</Table.Cell>
                <Table.Cell>{empresa.favorita ? 'Sí' : 'No'}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(empresa)}>Editar</Button>
                  <Button negative onClick={() => handleDelete(empresa.id)}>Eliminar</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <Modal open={modalOpen} onClose={() => {
        resetForm() 
        setModalOpen(false)
        }}
      >
        <Modal.Header>{selectedEmpresa ? 'Editar Empresa' : 'Agregar Empresa'}</Modal.Header>
        <Modal.Content>
          {error && <Message negative>{error}</Message>}
          <Form>
            <Form.Field>
              <label>Nombre</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </Form.Field>
            <Form.Field>
              <label>Fecha de Constitución</label>
              <input type="date" value={fechaConstitucion} onChange={(e) => setFechaConstitucion(e.target.value)} required />
            </Form.Field>
            <Form.Field>
              <label>Tipo de Empresa</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                <option value="">Selecciona un tipo</option>
                <option value="Distribuidor">Distribuidor</option>
                <option value="Mayorista">Mayorista</option>
                <option value="Usuario final">Usuario final</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>Comentarios</label>
              <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} maxLength="1020"></textarea>
            </Form.Field>
            <Form.Field>
              <label>
                <input type="checkbox" checked={favorita} onChange={(e) => setFavorita(e.target.checked)} />
                Favorita
              </label>
            </Form.Field>
            <Button type="button" onClick={handleSave} primary>
              {selectedEmpresa ? 'Actualizar' : 'Guardar'}
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  );
};

export default EmpresaLista
