const express = require('express');
const app = express();
const Contenedor = require ('./public/js/Contenedor');

const server = require('http').Server(app)
const io = require('socket.io')(server)

// const {Server:HttpServer} = require('http')
// const {Server:IOServer} = require('socket.io');
// const httpServer = new HttpServer(app);

// const io = new IOServer(httpServer);



app.use(express.static('public'));

const contenedorMensajes = new Contenedor('./public/chat.txt');
const contenedorProductos = new Contenedor('./public/productos.txt');


const productos = [];
// const productos = require('./productos.txt')
const mensajes = [];

io.on('connection',function(socket) {
    console.log("Nuevo cliente conectado");

    socket.emit('mensajes',mensajes); // emitir todos los mensajes a un cliente nuevo
    // socket.emit('productos',productos); // emitir todos los mensajes a un cliente nuevo

    socket.on('nuevo-mensaje',mensaje=>{
        io.sockets.emit('mensajes', mensajes); // Comunica a todos los sockets que estén conectados utilizando el método connect de io
        if(mensajes.length==0){
            mensajes.push(mensaje);
            contenedorMensajes.save(mensajes);
        }
        else{
            mensajes.push(mensaje);
            contenedorMensajes.save(mensaje);  
        }
    })
//     socket.on('nuevo-producto',producto=>{
//         io.sockets.emit('productos',productos); // Comunica a todos los sockets que estén conectados utilizando el método connect de io

//         if(productos.length==0){
//             productos.push(producto);
//             contenedorProductos.save(productos);
//         }
//         else{
//             productos.push(producto);
//             contenedorProductos.save(producto);
//         }

//         // productos.push(producto)
//         // contenedorProductos.save(productos)
//     })
})



// const PORT = 8080;
// server.listen(PORT,()=>console.log("SERVER ON")).on('error',error=>console.log(`Error en el servidor ${error}`));


const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))