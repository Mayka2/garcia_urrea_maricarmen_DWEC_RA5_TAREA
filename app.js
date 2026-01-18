
// Creamos la variable donde se va a guardar la clave real

let claveReal = "";

// Creamos un contenedor con estilos básicos, que añadiremos al body con appenchild

const contenedor = document.createElement("div");
contenedor.style.maxWidth = "220px";
contenedor.style.maxHeight = "370px";
contenedor.style.margin = "20px auto";
contenedor.style.textAlign = "center";
contenedor.style.border = "9px solid #000000";
contenedor.style.borderRadius="8px";
contenedor.style.backgroundColor = "#c6d5f4";
document.body.appendChild(contenedor);

// Creamos el campo para visualizar la clave oculta y lo metemos en el contenedor
const inputOculto = document.createElement("input");
inputOculto.type = "password";
inputOculto.readOnly = true;
inputOculto.style.marginTop = "2px";
inputOculto.style.width = "145px";
inputOculto.style.height = "50px";
inputOculto.style.border = "5px solid #333333";
inputOculto.style.borderRadius="8px";
inputOculto.style.display = "block";
inputOculto.style.margin = "15px 0 5px 20px";
inputOculto.style.fontSize = "30px";



contenedor.appendChild(inputOculto);




// Creamos el contenedor para los botones
const contenedorBotones = document.createElement("div");
contenedor.appendChild(contenedorBotones);

// Creamos un array de números
let numeros = [1, 2, 3, 4, 5, 6, 7, 8, 9];
numeros.sort(() => Math.random() - 0.5);

// Recorremos el array números
numeros.forEach(num => {
    // Creamos el botón con el número y sus caracteristicas
    const btn = document.createElement("button");
    btn.textContent = num;
    btn.style.width = "50px";
    btn.style.height = "50px";
    btn.style.margin = "7px";
    btn.style.border = "5px solid #333333"; 
    btn.style.borderRadius="8px";
    btn.style.backgroundColor = "#6094fb";
    btn.style.fontSize = "30px";
    

    btn.addEventListener("click", () => {
        if (claveReal.length < 4) {          // máximo 4 dígitos
            claveReal += String(num);          // añadimos el número
            inputOculto.value = claveReal;     // el input password la oculta
            divMensajes.textContent = "";      // limpiamos mensajes
        }
    });

    // Metemos el botón en el contenedor de botones
    contenedorBotones.appendChild(btn);
});
contenedorBotones.appendChild(document.createElement("br"));

// Creamos el botón C
const btnC = document.createElement("button");
btnC.textContent = "C";
btnC.style.width = "40px";
btnC.style.height = "50px";
btnC.style.margin = "5px";
btnC.style.fontSize = "30px";
btnC.style.border = "5px solid #333333";
btnC.style.borderRadius="8px";

// Creamos la función del botón C, borrar si la clave real no está vacia
btnC.addEventListener("click", () => {
    if (claveReal.length > 0) {
        claveReal = claveReal.slice(0, -1);
        inputOculto.value = claveReal; // se actualiza y sigue oculto
        divMensajes.textContent = "";
    }
});
// Metemos el botón en el contenedor de botones
contenedorBotones.appendChild(btnC);

// Creamos el botón validar
const btnValidar = document.createElement("button");
btnValidar.textContent = "Validar";
btnValidar.style.width = "120px";
btnValidar.style.height = "50px";
btnValidar.style.margin = "5px";
btnValidar.style.fontSize = "30px";
btnValidar.style.border = "5px solid #333333";
btnValidar.style.borderRadius="8px";

// Creamos la función del botón validar
btnValidar.addEventListener("click", () => {
    if (claveReal.length !== 4) {
        divMensajes.textContent = "La clave debe tener exactamente 4 caracteres.";
        divMensajes.style.color = "red";
        return;
    }

    // Comprobar que la clave es 9999 con regex
    const regex = /^9999$/;   // solo acepta "9999"

    if (regex.test(claveReal)) {
        divMensajes.textContent = "Contraseña correcta. Acceso permitido.";
        divMensajes.style.color = "green";
    } else {
        divMensajes.textContent = "Contraseña incorrecta. Inténtelo de nuevo.";
        divMensajes.style.color = "red";
    }
});
contenedorBotones.appendChild(btnValidar);

// Div para mensajes
const divMensajes = document.createElement("div");
divMensajes.style.marginTop = "10px";
divMensajes.style.marginBottom = "10px";

contenedor.appendChild(divMensajes);

