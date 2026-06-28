/*
==========================================
PROYECTO: Generador de Paletas de Colores
AUTOR: Matías Gabriel Mancini

DESCRIPCIÓN:
Aplicación web que genera paletas de colores
aleatorias en formato HEX. Permite elegir
entre 6, 8 o 9 colores y muestra cada color
junto a su código correspondiente.
==========================================
*/


// ==========================================
// SELECCIÓN DE ELEMENTOS DEL DOM
// Se obtienen los elementos del HTML que
// serán utilizados por JavaScript.
// ==========================================


const boton = document.getElementById("generarBtn");
const paleta = document.getElementById("paleta");
const cantidad = document.getElementById("cantidad");
const formato = document.getElementById("formato");
const toast = document.getElementById("toast");


// ==========================================
// FUNCIÓN PARA GENERAR UN COLOR HEX
// Crea un color aleatorio en formato HEX.
// Ejemplo: #4F8A2C
// ==========================================

function generarColorHex() {

    const letras = "0123456789ABCDEF";
    let color = "#";

    for(let i = 0; i < 6; i++) {
        color += letras[Math.floor(Math.random() * 16)];
    }

    return color;
}

function generarColorHSL(){
    
    const h = Math.floor(Math.random() *361);
    const s = Math.floor(Math.random() *41) +60;
    const L = Math.floor(Math.random() *31) +35;
    return `hsl(${h}, ${s}%, ${L}%)`;
    }

// ==========================================
// FUNCIÓN GENERAR PALETA
// Limpia la paleta actual y crea una nueva
// cantidad de colores según la opción
// seleccionada por el usuario.
// ==========================================


function generarPaleta() {

    paleta.innerHTML = "";

    const total = Number(cantidad.value);

    for(let i = 0; i < total; i++) {

        let color;

        if(formato.value === "hex"){
            color = generarColorHex();
        } else {
            color = generarColorHSL();
        }

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("color-card");

        tarjeta.style.backgroundColor = color;
        
        tarjeta.innerHTML = `
            <span class="codigo">${color}</span>
        `;

        tarjeta.addEventListener("click", async function () {
      await navigator.clipboard.writeText(color);
      mostrarToast("Copiado: " + color);
});


         paleta.appendChild(tarjeta);
    }

    mostrarToast();
}


// ==========================================
// FUNCIÓN TOAST
// Muestra una notificación temporal
// indicando que la paleta fue generada.
// ==========================================

function mostrarToast(mensaje= "Paleta generada") {
    toast.textContent= mensaje ;
    toast.classList.add("mostrar");

    setTimeout(() => {
        toast.classList.remove("mostrar");
    }, 2000);
}

boton.addEventListener("click", generarPaleta);

generarPaleta();