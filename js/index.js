//simulador de carrito de compras de sushi el usuario ingresa la pieza que quiere comprar y la cantidad de piezas y la funcion devulve el precio por la cantidad de piezas que quiere llevar.

//funcion que multiplica la cantidad de piezas clasicas por el precio

function sumaClasicos(cantClas) {

    const precio = 150;

    return (resultado = precio * cantClas);

}

//funcion que multiplica la cantidad de piezas especiales por el precio

function sumaEspeciales(cantEsp) {

    const precio = 200;

    return (resultado = precio * cantEsp);

}

//funcion que multiplica la cantidad de piezas nigiris por el precio

function sumaNigiris(cantNigi) {

    const precio = 250;

    return (resultado = precio * cantNigi);

}

//funcion que multiplica la cantidad de piezas geishas por el precio

function sumaGeisha(cantGei) {

    const precio = 300;

    return (resultado = precio * cantGei);

}

//variable para ir sumando las compras

let carrito = 0;

//varible para la condicion del while

let seleccion = 0;

//constructor para los objetos productos
function Producto(id,nombre,precio,cantidad){
    this.id = id;
    this.nombre = nombre;
    this.precio = precio;
    this.cantidad = cantidad;
    this.disponible = true;
}

const producto1 = new Producto(1,"Clásicos",150,200,true);
const producto2 = new Producto(2,"Cocidos",200,150,true);
const producto3 = new Producto(3,"Hot Rolls",250,55,true);
const producto4 = new Producto(4,"Sin Arroz",300,75,true);
const producto5 = new Producto(5,"Niguiri",350,100,true);
const producto6 = new Producto(6,"Geisha",400,100,true);

//declaro un array de productos y pusheo los objetos
let Productos =[];
Productos.push(producto1);
Productos.push(producto2);
Productos.push(producto3);
Productos.push(producto4);
Productos.push(producto5);
Productos.push(producto6);


let container = document.querySelector('.carritoCompra');

let article ="";

for(producto of Productos){
    article +=`
    <div class="cajaDeCompra">
                <article class="producto">
                    <div class="imagenDiv">
                        <img src="./media/fotos/piezas/clasico.jpg" alt="">
                    </div>
                    <h3>Sushi Clásico</h3>
                    <h4>$150 c/u</h4>
                    <button class="botonCompra" type="button">Agregar al Carrito</button>
                </article>
                <article class="producto">
                    <div class="imagenDiv">
                        <img src="./media/fotos/piezas/cocidos.jpg" alt="">
                    </div>
                    <h3>Sushi Cocido</h3>
                    <h4>$200 c/u</h4>
                    <button class="botonCompra" type="button">Agregar al Carrito</button>
                </article>
                <article class="producto">
                    <div class="imagenDiv">
                        <img src="./media/fotos/piezas/hotroll.jpg" alt="">
                    </div>
                    <h3>Sushi Hot Rolls</h3>
                    <h4>$250 c/u</h4>
                    <button class="botonCompra" type="button">Agregar al Carrito</button>
                </article>
            </div>
            <br>
            <div class="cajaDeCompra">
                <article class="producto">
                    <div class="imagenDiv">
                        <img src="./media/fotos/piezas/sinarroz.jpg" alt="">
                    </div>
                    <h3>Sushi Sin Arroz</h3>
                    <h4>$300 c/u</h4>
                    <button class="botonCompra" type="button">Agregar al Carrito</button>
                </article>
                <article class="producto">
                    <div class="imagenDiv">
                        <img src="./media/fotos/piezas/niguiri.jpg" alt="">
                    </div>
                    <h3>Sushi Niguiri</h3>
                    <h4>$350 c/u</h4>
                    <button class="botonCompra" type="button">Agregar al Carrito</button>
                </article>
                <article class="producto">
                    <div class="imagenDiv">
                        <img src="./media/fotos/piezas/geisha.png" alt="">
                    </div>
                    <h3>Sushi Geisha</h3>
                    <h4>$400 c/u</h4>
                    <button class="botonCompra" type="button">Agregar al Carrito</button>
                </article>
            </div>`
}

console.log(Productos);




//menu desplegable de opciones para el usuario 
/*
while (seleccion != 6) {

    //el usuario ingresa que quiere comprar

    let seleccion = parseInt(

        prompt(

            "SELECCIONAR LA PIEZA QUE QUIERE COMPRAR\n1- ROLLS CLASICOS\n2- ROLLS ESPECIALES\n3- NIGUIRIS\n4- GEISHAS\n5- TOTAL A PAGAR\n6- PARA SEGUIR NAVEGANDO"

        )

    );

    switch (seleccion) {

        case 1:

            //llama la funcion y devuelve el resultado y lo va sumando al carrito

            let cantClas = parseInt(prompt("INGRESA LA CANTIDAD DE ROLLS CLASICOS QUE QUIERE LLEVAR (PRECIO UNITARIO POR PIEZA = $150)"));

            console.log("El precio de las " + cantClas + " piezas clasicas es: $" + sumaClasicos(cantClas));

            carrito += sumaClasicos(cantClas);

            break;

        case 2:

            //llama la funcion y devuelve el resultado y lo va sumando al carrito

            let cantEsp = parseInt(prompt("INGRESA LA CANTIDAD DE ROLLS ESPECIALES QUE QUIERE LLEVAR (PRECIO UNITARIO POR PIEZA = $200)"));

            console.log("El precio de las " + cantEsp + " piezas Especiales es: $" + sumaEspeciales(cantEsp));

            carrito += sumaEspeciales(cantEsp);

            break;

        case 3:

            //llama la funcion y devuelve el resultado y lo va sumando al carrito

            let cantNigi = parseInt(prompt("INGRESA LA CANTIDAD DE NIGUIRIS QUE QUIERE LLEVAR (PRECIO UNITARIO POR PIEZA = $250)"));

            console.log("El precio de las " + cantNigi + " piezas Niguiri es: $" + sumaNigiris(cantNigi));

            carrito += sumaNigiris(cantNigi);

            break;

        case 4:

            //llama la funcion y devuelve el resultado y lo va sumando al carrito

            let cantGei = parseInt(prompt("INGRESA LA CANTIDAD DE GEISHAS QUE QUIERE LLEVAR (PRECIO UNITARIO POR PIEZA = $300)"));

            console.log("El precio de las " + cantGei + " piezas Geisha es: $" + sumaGeisha(cantGei));

            carrito += sumaGeisha(cantGei);

            break;

        case 5:

            // caso 5 sale y te devuelve el total

            alert("GRACIAS POR LA COMPRA EL TOTAL ES: $" + carrito);

            break;

        case 6:
            
            // el caso 6 es para que salga de las opciones

            alert("Gracias por la compra!");

            break;

        default:

            alert("Ingreso una opción inválida. Elija otra del 1 al 5.".toUpperCase());

            break;

    }

    // finalizando el loop

    // este if cortar el loop

    if (seleccion === 6) {

        break;

    }

}
*/
//recorro el array
for(let i=0 ; i<Productos.length ; i++){
    //console.log(Productos[i]);
    console.log(`Nombre de piezas: ${Productos[i].nombre} y el Precio es: $${Productos[i].precio}`)
}

//Producto con poca cantidad menos de 50.
let producPocaCant = Productos.filter(producto => producto.cantidad <= 50);
//console.log(producPocaCant);
console.log("Productos con poca cantidad:");
for (const e of producPocaCant){
    console.log(`Nombre: ${e.nombre} Cantidad: ${e.cantidad}`);
}

//productos ordenados por cantidad 
//nuevo array para ordenarlos
let productosOrdenadosCant = [];
productosOrdenadosCant = Productos.map(e => e);
productosOrdenadosCant.sort(function(menor,mayor){
    return menor.cantidad - mayor.cantidad;
})
console.log("Productos ordenadas por cantidad");
console.log(productosOrdenadosCant);


