"use strict";
//HAY QE TENER el JSON SERVER instalarlo y corriendo en la terminal para simular un api.
//Instalar json server ----- npm install -g json-server
//Iniciar json server ----- npx json-server -p 3000 --watch db.json
//Dejarlo corriendo en terminal para similar la consulta a la api --- npx json-server --watch .\assets\db.json

//VARIABLES 
const contenedorProductos = document.getElementById('contenedorProductos');
const contenedorCarrito = document.getElementById('carrito-contenedor');
const botonVaciar = document.getElementById('vaciar-carrito');
const comprar = document.getElementById('compra');
const contadorCarrito = document.getElementById('contadorCarrito');
const cantidad = document.getElementById('cantidad');
const precioTotal = document.getElementById('precioTotal');
const cantidadTotal = document.getElementById('cantidadTotal');
const mas = document.getElementById('mas');
const menos = document.getElementById('menos');

//evento para cargar el dom y si existe algun item en el session o local storage cargarlo al carrito.
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
// BORRAR TODO EL CARRITO
botonVaciar.addEventListener('click', () => {
    carrito.length = 0
    carrito.cantidad = 0

    sessionStorage.setItem('carrito', JSON.stringify(carrito))
    localStorage.setItem('carrito', JSON.stringify(carrito))
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
//fetch para traer de db.json los datos
//HAY QE TENER el JSON SERVER instalarlo y corriendo en la terminal para simular un api
const options = {method: 'GET'};

fetch('http://localhost:3000/productos', options)
  .then(response => response.json())
  .then(stockProductos => {

    stockProductos.forEach((producto)=>{

        const div = document.createElement('div');
        div.classList.add('productos');
        div.innerHTML = 
        `
        <article class="producto">
                        <div class="imagenDiv">
                            <img class="img" src="${producto.imagen.fields.file.url}" alt="">
                        </div>
                        <h3 class="titulo">${producto.nombre}</h3>
                        <h4 class="precio">$ ${producto.precio} c/u</h4>
                        <div>
                        <button id="agregar${producto.id}" class="botonCompra">Agregar</button>
                        <button id="sumar${producto.id}" class="botonCompra"> + </button>
                        <button id="restar${producto.id}" class="botonCompra"> - </button>
                        </div>
        </article>
        `
        contenedorProductos.appendChild(div);
    
        const boton = document.getElementById(`agregar${producto.id}`)
        const botonSumar = document.getElementById(`sumar${producto.id}`)
        const botonRestar = document.getElementById(`restar${producto.id}`)
    
        //escucho los eventos del click en el boton de agrear
        boton.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        })
        botonSumar.addEventListener('click', () => {
            agregarAlCarrito(producto.id);
        })
        botonRestar.addEventListener('click', () => {
            restarCarrito(producto.id);
        })
        
    })
    
//Trae el producto cuyo id sea igual id qe reciba por parametro
//AGREGAR AL CARRITO

const agregarAlCarrito = (prodId) => {

    //PARA AUMENTAR LA CANTIDAD Y QUE NO SE REPITA
    const existe = carrito.some (prod => prod.id === prodId); 
    //comprobar si el elemento ya existe en el carro

    if (existe){ 
        //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
        const prod = carrito.map (prod => { 
            //creamos un nuevo arreglo e iteramos sobre cada uno y cuando
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
    //Va a buscar el item, agregarlo al carrito y llama a la funcion actualizarCarrito.
    actualizarCarrito() 
    //LLAMAMOS A LA FUNCION QUE CREAMOS EN EL TERCER PASO. CADA VEZ Q SE 
    //MODIFICA EL CARRITO
}
})
.catch(err => console.error(err));

//agregarAlCarrito(1) //Le pasamos el ID por parametro. Tenemos que asigarle como evento esta funcion al boton
//con el id de su producto correspondiente

// ELIMINAR DEL CARRITO
const eliminarDelCarrito = (prodId) => {
    
    const item = carrito.find((prod) => prod.id == prodId)
    const indice = carrito.indexOf(item) //Busca el elemento q yo le pase y nos devuelve su indice.
    carrito.splice(indice, 1) //Le pasamos el indice de mi elemento ITEM y borramos el elemento 
    carrito.cantidad = 0
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
    //console.log(carrito)
}
// ESTA FUNCION ACTUALIZA EL CARRO CADA VEZ QUE SE MODIFICA ALGUN VALOR
const actualizarCarrito = () => {

    //LOS APPENDS SE VAN ACUMULANDO CON LO QE HABIA ANTES
    contenedorCarrito.innerHTML = "" 
    //Cada vez que yo llame a actualizarCarrito, lo primero q hago
    //es borrar el nodo. Y despues recorro el array lo actualizo de nuevo y lo rellena con la info actualizada
    //Agregamos al html. Recorremos sobre el array de carrito.
    //Por cada producto creamos un div con esta estructura y le hacemos un append al contenedorCarrito para qe se vea la lista

    carrito.forEach((prod) => {
        const div = document.createElement('div')
        div.className = ('productoEnCarrito')
        div.innerHTML = `
        <p>${prod.nombre}</p>
        <p>Precio: $${prod.precio}</p>
        <p>Cantidad: <span id="cantidad">${prod.cantidad} piezas</span></p>
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
//RESTA UNA UNIDAD DE LA CANTIDAD
const restarCarrito = (prodId) => {
    //SI YA ESTÁ EN EL CARRITO, ACTUALIZAMOS LA CANTIDAD
    const prod = carrito.map (prod => { 
        //creamos un nuevo arreglo e iteramos sobre cada uno y cuando
        // map encuentre cual es el q igual al que está agregado, le suma la cantidad
        if (prod.id === prodId){
            prod.cantidad--
            Toastify({
                text: "Sacaste una unidad",
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
    actualizarCarrito();
}

//popup con la compra.
const realizarCompra = () =>{
    let total = precioTotal.textContent;
    //console.log(total);    
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