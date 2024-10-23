import {pool} from "../db.js"

//Funcion para crear una empresa mediante un query
export const insertarEmpresa = async (nombre,fecha_constitucion,tipo_empresa,comentarios,favorita) => {
    try{
        const [result] = await pool.execute(
            'INSERT INTO empresa (nombre,fecha_constitucion,tipo_empresa,comentarios,favorita) VALUES(?,?,?,?,?)',
            [nombre,fecha_constitucion,tipo_empresa,comentarios,favorita]
        )
        return result
    }
    catch(error){
        console.log(error)
        throw error
    }
}

//Funcion para obtener las empresas mediante un query
export const consultaEmpresa = async () => {
    try {
      const [result] = await pool.execute(
        'SELECT id,nombre, fecha_constitucion, tipo_empresa, favorita FROM empresa ORDER BY nombre ASC'
      )
      return result
    } catch (error) {
      console.error('Error al consultar empresas:', error)
      throw error
    }
  };

//Funcion para actualizar las empresas mediante un query
export const actualizaEmpresa = async (nombre,fecha_constitucion,tipo_empresa,comentarios,favorita,id) => {
  try {
    const [result] = await pool.execute(
      'UPDATE empresa SET nombre = ?, fecha_constitucion = ?, tipo_empresa = ?,comentarios = ?,favorita = ? WHERE id = ?',
      [nombre,fecha_constitucion,tipo_empresa,comentarios,favorita,id]
    )
    return result
  } catch (error) {
    throw error
  }
}

//Funcion para borrar las empresas mediante un query
export const eliminarEmpresa = async (id) => {
  try {
    const [result] = await pool.execute(
      'DELETE FROM empresa WHERE id = ?',
      [id]
    )
    return result;
  } catch (error) {
    throw error;
  }
}
