import React, { useState, useEffect } from 'react'
import Axios from "axios"
import { Table, Button, Modal, Form, Message } from 'semantic-ui-react'
import { useTranslation } from 'react-i18next'
import { tipoTraducciones } from '../translations/tipoTraducciones';

const EmpresaLista = () => {
  const { t, i18n } = useTranslation()
  const [empresas, setEmpresas] = useState([])
  const [modalOpen, setModalOpen] = useState(false)
  const [selectedEmpresa, setSelectedEmpresa] = useState(null)
  const [nombre, setNombre] = useState('')
  const [fechaConstitucion, setFechaConstitucion] = useState('')
  const [tipo, setTipo] = useState('')
  const [comentarios, setComentarios] = useState('')
  const [favorita, setFavorita] = useState(false)
  const [error, setError] = useState('')

  // Cargar el idioma desde localStorage al iniciar el componente
  useEffect(() => {
    const idiomaGuardado = localStorage.getItem('i18nextLng')
    if (idiomaGuardado) {
      i18n.changeLanguage(idiomaGuardado)
    }
  }, [i18n])

  // Obtener las empresas
  useEffect(() => {
    const fetchEmpresas = async () => {
      try {
        const { data } = await Axios.get("http://localhost:4000/obtenerEmpresas")
        
        if (data.message && data.message === 'Sin empresas') {
          setEmpresas([])
        } else {
          setEmpresas(data)
        }
      } catch (error) {
        console.error("Error al obtener empresas:", error)
        setError(t('error_fetching'))
      }
    };
    fetchEmpresas()
  }, [t])

  // Función para agregar y actualizar empresas
  const handleSave = async () => {
    if (!nombre || !fechaConstitucion || !tipo) {
      setError(t('all_fields_required'))
      return
    }

    try {
      const nuevaEmpresa = { 
        nombre, 
        fecha_constitucion: fechaConstitucion, 
        tipo_empresa: tipo, 
        comentarios, 
        favorita: favorita ? 1 : 0 
      }
      if (selectedEmpresa) {
        await Axios.put(`http://localhost:4000/actualizaEmpresas/${selectedEmpresa.id}`, nuevaEmpresa)
        setEmpresas(empresas.map(empresa => (empresa.id === selectedEmpresa.id ? nuevaEmpresa : empresa)))
      } else {
        await Axios.post("http://localhost:4000/agregarEmpresas", nuevaEmpresa)
        setEmpresas([...empresas, nuevaEmpresa])
      }
      setModalOpen(false)
      resetForm()
    } catch (error) {
      console.error('Error al guardar empresa:', error)
      setError(t('error_saving'))
    }
  };

  // Función para eliminar empresas
  const handleDelete = async (id) => {
    try {
      await Axios.delete(`http://localhost:4000/borrarEmpresas/${id}`)
      setEmpresas(empresas.filter(empresa => empresa.id !== id))
    } catch (error) {
      console.error('Error al eliminar empresa:', error)
      setError(t('error_deleting'))
    }
  };

  // Reiniciar los datos del formulario
  const resetForm = () => {
    setNombre('')
    setFechaConstitucion('')
    setTipo('')
    setComentarios('')
    setFavorita(false)
    setError('')
    setSelectedEmpresa(null)
  };

  // Editar los datos de la empresa seleccionada
  const handleEdit = (empresa) => {
    setSelectedEmpresa(empresa)
    setNombre(empresa.nombre)
    setFechaConstitucion(empresa.fecha_constitucion.split('T')[0])
    setTipo(empresa.tipo_empresa)
    setComentarios(empresa.comentarios || '')
    setFavorita(empresa.favorita === 1)
    setModalOpen(true)
  };

  // Cambiar el idioma y guardarlo en localStorage
  const cambiarIdioma = (idioma) => {
    i18n.changeLanguage(idioma)
    localStorage.setItem('i18nextLng', idioma)
  }

  return (
    <div>
      <Button primary onClick={() => {
        resetForm()
        setModalOpen(true)
      }}>{t('add_company')}</Button>
      <Button onClick={() => cambiarIdioma('es')}>Español</Button>
      <Button onClick={() => cambiarIdioma('en')}>English</Button>
      
      {empresas.length === 0 ? (
        <p>{t('no_companies')}</p>
      ) : (
        <Table celled>
          <Table.Header>
            <Table.Row>
              <Table.HeaderCell>{t('name')}</Table.HeaderCell>
              <Table.HeaderCell>{t('company_type')}</Table.HeaderCell>
              <Table.HeaderCell>{t('constitution_date')}</Table.HeaderCell>
              <Table.HeaderCell>{t('favorite')}</Table.HeaderCell>
              <Table.HeaderCell>{t('actions')}</Table.HeaderCell>
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {empresas.map((empresa) => (
              <Table.Row key={empresa.id}>
                <Table.Cell>{empresa.nombre}</Table.Cell>
                <Table.Cell>{tipoTraducciones[empresa.tipo_empresa][i18n.language]}</Table.Cell>
                <Table.Cell>{empresa.fecha_constitucion.split('T')[0]}</Table.Cell>
                <Table.Cell>{empresa.favorita ? t('yes') : t('no')}</Table.Cell>
                <Table.Cell>
                  <Button onClick={() => handleEdit(empresa)}>{t('edit')}</Button>
                  <Button negative onClick={() => handleDelete(empresa.id)}>{t('delete')}</Button>
                </Table.Cell>
              </Table.Row>
            ))}
          </Table.Body>
        </Table>
      )}

      <Modal open={modalOpen} onClose={() => {
        resetForm(); 
        setModalOpen(false);
      }}>
        <Modal.Header>{selectedEmpresa ? t('edit_company') : t('add_company')}</Modal.Header>
        <Modal.Content>
          {error && <Message negative>{error}</Message>}
          <Form>
            <Form.Field>
              <label>{t('name')}</label>
              <input value={nombre} onChange={(e) => setNombre(e.target.value)} required />
            </Form.Field>
            <Form.Field>
              <label>{t('constitution_date')}</label>
              <input type="date" value={fechaConstitucion} onChange={(e) => setFechaConstitucion(e.target.value)} required />
            </Form.Field>
            <Form.Field>
              <label>{t('company_type')}</label>
              <select value={tipo} onChange={(e) => setTipo(e.target.value)} required>
                <option value="">{t('select_type')}</option>
                <option value="Distribuidor">{t('distributor')}</option>
                <option value="Mayorista">{t('wholesaler')}</option>
                <option value="Usuario final">{t('end_user')}</option>
              </select>
            </Form.Field>
            <Form.Field>
              <label>{t('comments')}</label>
              <textarea value={comentarios} onChange={(e) => setComentarios(e.target.value)} maxLength="1020"></textarea>
            </Form.Field>
            <Form.Field>
              <label>
                <input type="checkbox" checked={favorita} onChange={(e) => setFavorita(e.target.checked)} />
                {t('favorite')}
              </label>
            </Form.Field>
            <Button type="button" onClick={handleSave} primary>
              {selectedEmpresa ? t('update') : t('save')}
            </Button>
          </Form>
        </Modal.Content>
      </Modal>
    </div>
  )
}

export default EmpresaLista
