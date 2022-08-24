//Stock de sushi
let stockProductos =[
    {id: 1,nombre:'Sushi Clásico',precio:150,cantidad:1,imagen:'clasico.jpg'},
    {id: 2,nombre:'Sushi Cocido',precio:200,cantidad:1,imagen:'cocidos.jpg'},
    {id: 3,nombre:'Sushi Hot Rolls',precio:250,cantidad:1,imagen:'hotroll.jpg'},
    {id: 4,nombre:'Sushi Sin Arroz',precio:300,cantidad:1,imagen:'sinarroz.jpg'},
    {id: 5,nombre:'Sushi Niguiri',precio:350,cantidad:1,imagen:'niguiri.jpg'},
    {id: 6,nombre:'Sushi Geisha',precio:400,cantidad:1,imagen:'geisha.png'}];

//Traigo el div del html para llenarlo y lo qe voy a usar    
const contenedorProductos = document.getElementById('contenedorProductos');
const contenedorCarrito = document.getElementById('carrito-contenedor');

const botonVaciar = document.getElementById('vaciar-carrito');
const comprar = document.getElementById('compra');

//SEXTIMO PASO, MODIFICAR LOS CONTADORES
const contadorCarrito = document.getElementById('contadorCarrito');

//OCTAVO PASO
const cantidad = document.getElementById('cantidad')
const precioTotal = document.getElementById('precioTotal')
const cantidadTotal = document.getElementById('cantidadTotal')


document.addEventListener('DOMContentLoaded', () => {
    if (sessionStorage.getItem('carrito')){
        carrito = JSON.parse(sessionStorage.getItem('carrito'))
        actualizarCarrito()
    }
    if (localStorage.getItem('carrito')){
        carrito = JSON.parse(localStorage.getItem('carrito'))
        actualizarCarrito()
    }
})
//SEXTO PASO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    Toastify({
        text: "Todos los productos eliminados del carrito.",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, rgb(207, 27, 27), rgb(17, 14, 14))",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    actualizarCarrito()
})

let carrito =[];
//Lleno el html
stockProductos.forEach((producto)=>{
    const div = document.createElement('div');
    div.classList.add('productos');
    div.innerHTML = 
    `
    <article class="producto">
                    <div class="imagenDiv">
                        <img class="img" src="./media/fotos/piezas/${producto.imagen}" alt="">
                    </div>
                    <h3 class="titulo">${producto.nombre}</h3>
                    <h4 class="precio">$${producto.precio} c/u</h4>
                    <button id="agregar${producto.id}" class="botonCompra">Agregar</button>
    </article>
    `
    contenedorProductos.appendChild(div);

    const boton = document.getElementById(`agregar${producto.id}`)

    //escucho los eventos del click en el boton de agrear
    boton.addEventListener('click', () => {
        agregarAlCarrito(producto.id);
    })
    
})

//trae el producto cuyo id sea igual id qe reciba por parametro
// 1- PRIMER PASO

//AGREGAR AL CARRITO
const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId); 
    //comprobar si el elemento ya existe en el carro

    if (existe){ 
        //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { 
            //creamos un nuevo arreglo e iteramos sobre cada curso y cuando
            // map encuentre cual es el q igual al que está agregado, le suma la cantidad
            if (prod.id === prodId){
                prod.cantidad++
                Toastify({
                    text: "Agregaste otra unidad",
                    duration: 1000,
                    newWindow: true,
                    close: true,
                    gravity: "top", // `top` or `bottom`
                    position: "right", // `left`, `center` or `right`
                    stopOnFocus: true, // Prevents dismissing of toast on hover
                    style: {
                    background: "linear-gradient(to right,rgb(207, 27, 27), rgb(17, 14, 14))",
                    },
                    onClick: function(){} // Callback after click
                }).showToast();
            }
        })
    } else { 
        //EN CASO DE QUE NO ESTÉ, AGREGAMOS AL CARRITO
        const item = stockProductos.find((prod) => prod.id === prodId)
        //Trabajamos con las ID
        Toastify({
            text: "Agregado al carrito correctamente",
            duration: 3000,
            newWindow: true,
            close: true,
            gravity: "top", // `top` or `bottom`
            position: "right", // `left`, `center` or `right`
            stopOnFocus: true, // Prevents dismissing of toast on hover
            style: {
            background: "linear-gradient(to right, rgb(207, 27, 27), rgb(17, 14, 14))",
            },
            onClick: function(){} // Callback after click
        }).showToast();
        //Una vez obtenida la ID, lo que haremos es hacerle un push para agregarlo al carrito
        carrito.push(item)
    }
    //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito, que recorre
    actualizarCarrito() 
    //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
}
//agregarAlCarrito(1) //Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente

// 5 - QUINTO PASO
const eliminarDelCarrito = (prodId) => {
    const item = carrito.find((prod) => prod.id === prodId)

    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.

    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos 
    // un elemento 
    Toastify({
        text: "Eliminado del carrito",
        duration: 3000,
        newWindow: true,
        close: true,
        gravity: "top", // `top` or `bottom`
        position: "right", // `left`, `center` or `right`
        stopOnFocus: true, // Prevents dismissing of toast on hover
        style: {
        background: "linear-gradient(to right, rgb(207, 27, 27), rgb(17, 14, 14))",
        },
        onClick: function(){} // Callback after click
    }).showToast();
    actualizarCarrito() //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
    console.log(carrito)
}

const actualizarCarrito = () => {

    //LOS APPENDS SE VAN ACUMULANDO CON LO QE HABIA ANTES
    contenedorCarrito.innerHTML = "" 
    //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info
    //actualizado
    //Agregamos al html. Recorremos sobre el array de carrito.

    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito para qe se vea la lista
    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad}</span></p>
        <button onclick="eliminarDelCarrito(${prod.id})" class="boton-eliminar">X</button>
        `

        contenedorCarrito.appendChild(div)
        
        sessionStorage.setItem('carrito', JSON.stringify(carrito))
        localStorage.setItem('carrito', JSON.stringify(carrito))

    })
    //actualizamos con la longitud del carrito
    contadorCarrito.innerText = carrito.length
    //console.log(carrito)
     //Por cada producto q recorro en mi carrito, al acumulador le suma la propiedad precio, con el acumulador
    //empezando en 0.
    precioTotal.innerText = carrito.reduce((acc, prod) => acc + prod.cantidad * prod.precio, 0)
}

const realizarCompra = () =>{
    let total = precioTotal.textContent;
    console.log(total);    
    Swal.fire({
        title: `Compra Realizada Con Éxito! <br> Total: $${precioTotal.textContent}`,
        imageUrl: 'media/fotos/logo.png',
        imageWidth: 400,
        imageHeight: 200,
        imageAlt: 'Custom image',
    })
} 
//evento para realizar la compra
comprar.addEventListener('click', () => {
    realizarCompra();
})