import mysql from 'mysql2/promise';

//Funcion para guardar los datos de la base de datos
export const pool = mysql.createPool({
  host: "localhost",
  user: "root",
  password: "cesar",
  database: "retoTecnico"
});

//Funcion para hacer la conexion a la base de datos
export const connectDB = async () => {
  try {
    const connection = await pool.getConnection();
    console.log("Conexión exitosa a la base de datos");
    connection.release();
  } catch (error) {
    console.log("Error al conectar a la base de datos:", error);
  }
};
