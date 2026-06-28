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
let paletaActual = [];

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

    const total = Number(cantidad.value);
    const nuevaPaleta = [];

    for (let i = 0; i < total; i++) {
        if (paletaActual[i] && paletaActual[i].bloqueado) {
            nuevaPaleta.push(paletaActual[i]);
        } else {
            const color = formato.value === "hex" ? generarColorHex() : generarColorHSL();
            nuevaPaleta.push({ color: color, bloqueado: false });
        }
    }

    paletaActual = nuevaPaleta;
    renderizarPaleta();
    mostrarToast("Paleta generada");
}

function renderizarPaleta() {

    paleta.innerHTML = "";

    paletaActual.forEach((item) => {

        const tarjeta = document.createElement("article");
        tarjeta.classList.add("color-card");
        if (item.bloqueado) tarjeta.classList.add("bloqueado");

        tarjeta.style.backgroundColor = item.color;

        tarjeta.innerHTML = `
            <button class="btn-bloquear" type="button">${item.bloqueado ? "🔒" : "🔓"}</button>
            <span class="codigo">${item.color}</span>
        `;

        tarjeta.addEventListener("click", async function () {
            await navigator.clipboard.writeText(item.color);
            mostrarToast("Copiado: " + item.color);
        });

        tarjeta.querySelector(".btn-bloquear").addEventListener("click", function (e) {
            e.stopPropagation();
            item.bloqueado = !item.bloqueado;
            renderizarPaleta();
        });

        paleta.appendChild(tarjeta);
    });
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