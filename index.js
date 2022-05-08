
const loggedUser = () => {
    const user = localStorage.getItem(`user`);
    if (!user) window.location.href = "./login.html";
};

loggedUser();

class Articulo {
    constructor(dispositivo, precio) {
        this.dispositivo = dispositivo;
        this.precio = parseInt(precio);
    }

    precioTotal() {
        return this.precio * 1.21;
    }
}

const listaDeProductos = document.querySelector("#products-list");
let iphoneList = [];

fetch("./productos.json")
    .then((res) => res.json())
    .then((data) => {
        data.forEach((producto) => {
            const div = document.createElement("div");
            div.innerHTML = `
          <div class="col">
              <div class="card">
                  <img src="https://i4.hurimg.com/i/hurriyet/75/1200x675/6149d02f4e3fe112044e7d2b.jpg"
                  class="card-img-top" alt="...">
                  <div class="card-body">
                      <h5 class="card-title">${producto.nombre}</h5>
                      <p class="card-text">${producto.descripcion}</p>
                      <P>$${producto.precio} + IVA</P>
                  </div>
                  <div class="boton">
                      <button type="button" id="btn${producto.id}" onclick="addToCart('${producto.nombre}')"
                          class="btn btn-primary btn-lg shop-button">Agregar al
                          carro</button>
                  </div>
              </div>
          </div>
          `;
            listaDeProductos.append(div);
        });

        for (let i = 0; i < data.length; i++) {
            const producto = new Articulo(data[i].nombre, data[i].precio);
            iphoneList.push(producto);
        }
    });

let userName = JSON.parse(localStorage.getItem("user")).userName;

let shoppingCart = [];

const addToCart = (nombreProducto) => {
    const selectedIphone = iphoneList.find(
        (item) => item.dispositivo === `${nombreProducto}`
    );
    shoppingCart.push(selectedIphone);

    Swal.fire({
        position: "center",
        icon: "success",
        text: "¡Producto agregado al carrito!",
        showConfirmButton: false,
        timer: 1500,
    });

    const cartDiv = document.getElementById("cart");
    cartDiv.innerText = `${shoppingCart.length}`;
};

const listarElementosDelCarro = () => {
    let mensaje = "";
    shoppingCart.map((item) => {
        mensaje = `Proceda a Pagar`;
    });
    alert(mensaje);
};

// let btn = document.getElementById(`btn11`);
// btn.addEventListener("click", respuesta);

// function respuesta() {
//   Swal.fire({
//     position: "top-end",
//     icon: "success",
//     text: "¡Producto agregado al carrito!",
//     showConfirmButton: false,
//     timer: 1500,
//   });
//   // alert("iPhone 11 agregado al carro!")
// }


// let eleccion = prompt(
//     `Hola ${nombre}, bienvenido a Tienda MDZ, elegí el iPhone que desees comprar:
//     Escriba 1 para ${producto1.dispositivo}, precio ${producto1.precio} + IVA
//     Escriba 2 para ${producto2.dispositivo}, precio ${producto2.precio} + IVA
//     Escriba 3 para ${producto3.dispositivo}, precio ${producto3.precio} + IVA`
// )

// let total = 0;

// function eleccionDeIphone(){

//     while(eleccion != "NO"){

//         console.log(`${nombre} tus dispositivos elegidos son ${iphoneElegido[eleccion-1].dispositivo}`)

//         total += iphoneElegido[eleccion-1].precioTotal();

//         eleccion = prompt(
//             `${nombre}, ¿Querés agregar otro producto?

//             SI - Selecciona el iPhone que deseas comprar
//             Digite 1 para ${producto1.dispositivo}, precio ${producto1.precio} + IVA
//             Digite 2 para ${producto2.dispositivo}, precio ${producto2.precio} + IVA
//             Digite 3 para ${producto3.dispositivo}, precio ${producto3.precio} + IVA

//             SALIR - Para salir, presiona NO`
//         )

//         console.log(`Total a pagar ${total}`)
//     }
// }

// eleccionDeIphone();

let totalDeLaCompra = 0;

const calcularTotal = () => {
    shoppingCart.map((item) => {
        totalDeLaCompra = totalDeLaCompra + item.precioTotal();
    });
};

function pagar() {
    calcularTotal();

    if (totalDeLaCompra === 0)
        return Swal.fire({
            text: "¡El carrito está vacío!",
        });

    let formaPago = parseInt(
        prompt(`${userName}, el monto a pagar es $ ${totalDeLaCompra}, qué medio de pago vas a utilizar?
      presiona 1 para tarjeta de Débito
      presiona 2 para tarjeta de Crédito: `)
    );

    if (formaPago === 1) {
        let pago = prompt("Ingresa el número de la tarjeta de Débito: ");

        alert(`${userName}, tu pago fue exitoso, gracias por comprar en Tienda MDZ
          DETALLE: 
          Usuario que realizó la compra: ${userName} 
          Total abonado: $${totalDeLaCompra}`);
    } else if (formaPago === 2) {
        let pago = prompt("Ingresa el numero de la tarjeta de Crédito: ");

        let cuotas = parseInt(
            prompt(`${userName}, ¿En cuántas cuotas deseas pagar?
              1 para 3 cuotas (8% de interés),
              2 para 6 cuotas (13% de interés),
              3 para 12 cuotas (22% de interés)`)
        );

        let recargo = 0;
        let cuota = 0;

        switch (cuotas) {
            case 1:
                recargo = total * 0.08;
                totalDeLaCompra += recargo;

                cuota = totalDeLaCompra / 3;

                alert(`${userName}, tu pago fue realizado con éxito, ¡Gracias por comprar en Tienda MDZ!
                      DETALLE: 
                      Usuario que realizó la compra: ${userName} 
                      Total abonado: $ ${totalDeLaCompra}`);
                break;
            case 2:
                recargo = totalDeLaCompra * 0.13;
                totalDeLaCompra += recargo;

                cuota = totalDeLaCompra / 6;

                alert(`${userName}, tu pago fue realizado con éxito, ¡Gracias por comprar en Tienda MDZ!
                      DETALLE: 
                      Usuario que realizó la compra: ${userName} 
                      Total abonado: $ ${totalDeLaCompra}`);
                break;
            case 3:
                recargo = totalDeLaCompra * 0.22;
                totalDeLaCompra += recargo;

                cuota = totalDeLaCompra / 12;

                alert(`${userName}, tu pago fue realizado con éxito, ¡Gracias por comprar en Tienda MDZ!
                      DETALLE: 
                      Usuario que realizó la compra: ${userName}
                      Total abonado: $ ${totalDeLaCompra}`);
                break;
        }
    } else {
        Swal.fire({
            icon: "error",
            text: "No se pudo realizar el pago, intente nuevamente",
        });
        // alert("No se pudo realizar el pago, intente nuevamente");
    }
}

const logout = () => {
    // localStorage.clear();
    // window.location.href = "/login.html";
    Swal.fire({
        text: "¿Confirmas que deseas salir de la página?",
        icon: "warning",
        showCancelButton: true,
        confirmButtonColor: "#3085d6",
        cancelButtonColor: "#d33",
        confirmButtonText: "Confirmar",
        cancelButtonText: "Cancelar",
    }).then((result) => {
        if (result.isConfirmed) localStorage.clear();
        window.location.href = "./login.html";
        {
        }
    });
};