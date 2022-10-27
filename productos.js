import ClienteSql from '../sql.js'
import { options } from '../options/mysql.js';


const sql = new ClienteSql(options);

const producto = [];

try {
    // Punto 1 Crear tabla
    await sql.crearTabla()
    console.log("1) tabla creada")

    // Punto 2  Inocorporar Producto a la Tabla "Productos" ↓

    // await sql.save(producto)
    // console.log("2) Producto Ingresado")
    

} catch (error) {
    console.log(error)
} finally {
    sql.close()
}
