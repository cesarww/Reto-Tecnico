import {insertarEmpresa,consultaEmpresa,actualizaEmpresa,eliminarEmpresa} from "../../models/empresa.model.js"

//Funcion para obtener los datos de la empresa del frontEnd y realizar la insercion de los datos
export const crearEmpresa = async (req, res) =>{
    const {nombre,fecha_constitucion,tipo_empresa,comentarios,favorita} = req.body

    try{
        const result = await insertarEmpresa(nombre,fecha_constitucion,tipo_empresa,comentarios,favorita)
        res.status(201).json({ message: "Empresa creada exitosamente", id: result.insertId })

    } catch(error){
        res.status(500).json({message: error.message})
        console.log(error)
    }
}

//Funcion para mandar las empresas al frontEnd
export const obtenerEmpresas = async (req, res) => {
    try {
      const empresas = await consultaEmpresa();
      if (empresas.length === 0) {
        return res.status(200).json({ message: 'Sin empresas' });
      }
      res.status(200).json(empresas);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

  //Funcion para obtener los datos que se van a modificar y realizar la edicion de la base de datos
export const modificarEmpresa = async (req, res) => {
    const { id } = req.params
    const { nombre, fecha_constitucion, tipo_empresa, comentarios, favorita } = req.body
    
    try {
      const result = await actualizaEmpresa(nombre, fecha_constitucion, tipo_empresa, comentarios, favorita,id)
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Empresa actualizada exitosamente" })
      } else {
        res.status(404).json({ message: "Empresa no encontrada" })
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  //Funcion para eliminar empresas
  export const borrarEmpresa = async (req, res) => {
    const { id } = req.params
  
    try {
      const result = await eliminarEmpresa(id);
      if (result.affectedRows > 0) {
        res.status(200).json({ message: "Empresa eliminada exitosamente" })
      } else {
        res.status(404).json({ message: "Empresa no encontrada" })
      }
    } catch (error) {
      res.status(500).json({ message: error.message })
    }
  }
  