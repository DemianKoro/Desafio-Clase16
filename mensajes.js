import ClienteSql from './sql.js'
import { options2 } from './options/SQLite3.js';


const sqlite = new ClienteSql(options2);


try {
    // Crear tabla ↓

    // await sqlite.crearTablaMessage()
    // console.log("1) tabla creada")  

    // Mostrar Tabla ↓

    const mostrarTabla = await sqlite.getAllMessages()
    console.table(mostrarTabla);

} catch (error) {
    console.log(error)
} finally {
    sqlite.close()
}
