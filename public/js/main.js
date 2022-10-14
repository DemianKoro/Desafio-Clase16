
const socket = io.connect(); //Acá conectamos el cliente con el servidor
socket.on('mensajes',data=>{
    console.log("data mensaje",data);
    renderMensaje(data);
})

socket.on('productos',data=>{
    console.log("data productos",data);
    renderProductos(data);
})

const agregarMensaje = (e)=>{
    const mensaje = {
        autor:document.getElementById('email').value,
        time: new Date().toLocaleString(),
        mensaje: document.getElementById('texto').value
    }
    socket.emit('nuevo-mensaje',mensaje);
    return false;
}

function renderMensaje(data){
   
    const html = data.map((elem, index)=>{
        return `<div>
                    <strong style="color:blue;">${elem.autor}</strong> 
                    <span style="color:brown";>${elem.time}</span>:
                    <em style="color:green;">${elem.mensaje}</em></div>`
    }).join(" ");
    document.getElementById('mensajes').innerHTML = html;
}

const agregarProducto = (e)=>{
    const producto = {
        name: document.getElementById('name').value,
        price:document.getElementById('price').value,
        image:document.getElementById('image').value
    }
    console.log("agregar producto", producto)
    socket.emit('nuevo-producto',producto);
    return false;
}

function renderProductos(data){
    const html = data.map((prod, index)=>{
        return `<div>
                    <strong>${prod.name}</strong>:
                    <em>$${prod.price}</em></div>
                    <img src="${prod.image}" style="width: 40px;"></img>`

    }).join(" ");
    document.getElementById('productos').innerHTML = html;
}

// socket.on('mensajes',function(data){renderMensaje(data);});
// socket.on('productos',function(data){renderProductos(data);});