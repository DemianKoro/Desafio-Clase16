const express = require('express')
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server)

const Contenedor = require ('./public/js/Contenedor');
const contenedorMensajes = new Contenedor('./public/chat.txt');
const contenedorProductos = new Contenedor('./public/productos.txt');

let mensajes =[];
let productos=[];

app.use(express.static('public'));


io.on('connection', function(socket){
    console.log('Un cliente se ha conectado');
    socket.emit('mensajes', mensajes);
    socket.emit('productos', productos);

    socket.on('nuevo-mensaje', function(data) {
        mensajes.push(data);
        contenedorMensajes.save(mensajes);
        io.sockets.emit('mensajes', mensajes);
    });

    socket.on('nuevo-producto', function(data){
        productos.push(data);
        contenedorProductos.save(productos);
        io.sockets.emit('productos', productos);
    })
});

const PORT = process.env.PORT || 8080;

const srv = server.listen(PORT, () => { 
    console.log(`Servidor Http con Websockets escuchando en el puerto ${srv.address().port}`);
})
srv.on('error', error => console.log(`Error en servidor ${error}`))