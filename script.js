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

    function hexAHSL(hex) {

    let r = parseInt(hex.substring(1, 3), 16) / 255;
    let g = parseInt(hex.substring(3, 5), 16) / 255;
    let b = parseInt(hex.substring(5, 7), 16) / 255;

    let max = Math.max(r, g, b);
    let min = Math.min(r, g, b);

    let h, s, l;

    l = (max + min) / 2;

    if (max === min) {

        h = 0;
        s = 0;

    } else {

        let d = max - min;

        s = l > 0.5
            ? d / (2 - max - min)
            : d / (max + min);

        switch (max) {

            case r:
                h = (g - b) / d + (g < b ? 6 : 0);
                break;

            case g:
                h = (b - r) / d + 2;
                break;

            case b:
                h = (r - g) / d + 4;
                break;

        }

        h /= 6;

    }

    h = Math.round(h * 360);
    s = Math.round(s * 100);
    l = Math.round(l * 100);

    return `hsl(${h}, ${s}%, ${l}%)`;

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
            
             const color = generarColorHex();
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

         let codigoMostrar;

         if (formato.value === "hex") {
          codigoMostrar = item.color;
        } else {
      codigoMostrar = hexAHSL(item.color);
}



       tarjeta.innerHTML = `
            <button class="btn-bloquear" type="button">${item.bloqueado ? "🔒" : "🔓"}</button>
            <span class="codigo">${codigoMostrar}</span>
        `;

        tarjeta.addEventListener("click", async function () {
            await navigator.clipboard.writeText(codigoMostrar);
            mostrarToast("Copiado: " + codigoMostrar);
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

formato.addEventListener("change", renderizarPaleta);

generarPaleta();