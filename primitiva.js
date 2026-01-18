
// Creamos el contenedor donde irá el título
const contenedor = document.createElement('div');
contenedor.style.width = '310px';
contenedor.style.margin = '5px auto';
contenedor.style.border = "3px solid #b10202";
contenedor.style.borderRadius = "5px";
document.body.appendChild(contenedor);

// Creamos el titulo
const titulo = document.createElement('h5');
titulo.textContent = 'LOTERIA PRIMITIVA.';
titulo.style.textAlign = 'left';
titulo.style.margin = '5px 5px 5px 10px';
contenedor.appendChild(titulo);

// Creamos el contenedor para los números
const grid = document.createElement('div');
grid.style.display = 'grid';
grid.style.width = '295px';
grid.style.margin = '5px auto';
grid.style.gridTemplateColumns = 'repeat(7, 1fr)';
grid.style.gap = '10px';
grid.style.padding = "7px";
grid.style.border = "3px solid #b10202";
grid.style.borderRadius = "5px";
document.body.appendChild(grid);

// Array donde guardaremos los números seleccionados
let seleccionados = [];

// Recorremos del 1 al 49 creando un botón por cada número
for (let n = 1; n <= 49; n++) {
    const casilla = document.createElement("button");
    casilla.textContent = n;
    casilla.dataset.numero = n;
    casilla.style.width = '30px';
    casilla.style.height = '30px';
    casilla.style.borderRadius = '5px';
    casilla.style.backgroundColor = '#ffffff';
    casilla.style.color = '#000000';
    casilla.style.fontSize = '16px';
    casilla.style.textAlign = 'center';
    casilla.style.display = 'flex';
    casilla.style.justifyContent = 'center';
    casilla.style.alignItems = 'center';
    casilla.style.cursor = 'pointer';


    // marcar o desmarcar al hacer click
    casilla.addEventListener("click", () => {
        const num = Number(casilla.dataset.numero);
        const indice = seleccionados.indexOf(num);

        if (indice === -1) {
            // aún no está seleccionado
            if (seleccionados.length >= 6) {
                alert("Solo puedes marcar 6 números.");
                return;
            }
            seleccionados.push(num);
            casilla.style.color = '#ff1919'; // marcado
            casilla.style.fontWeight = 'bold';
        } else {
            
            seleccionados.splice(indice, 1);
            casilla.style.color = "#000000"; // vuelve a negro
        }
    });
    grid.appendChild(casilla);
}

// Creamos el contenedor para botón y resultados de números ganadores
const contenedorBoton = document.createElement('div');
contenedorBoton.style.marginTop = '10px';
contenedorBoton.style.padding = '5px';
contenedorBoton.style.border = "3px solid #b10202";
contenedorBoton.style.borderRadius = "5px";
contenedorBoton.style.width = '300px';
contenedorBoton.style.margin = '5px auto';
contenedorBoton.style.display = 'flex';
contenedorBoton.style.alignItems = 'center';
contenedorBoton.style.gap = '5px';
document.body.appendChild(contenedorBoton);


// Creamos el botón de Realizar sorteo
const btnSorteo = document.createElement('button');
btnSorteo.textContent = 'Realizar sorteo';
btnSorteo.style.width = '55px';
btnSorteo.style.height = '40px';
btnSorteo.style.borderRadius = '3px';
btnSorteo.style.backgroundColor = '#ecebeb';
btnSorteo.style.fontSize = '10px';
btnSorteo.style.textAlign = 'center';
btnSorteo.style.display = 'flex';
btnSorteo.style.justifyContent = 'center';
btnSorteo.style.alignItems = 'center';
btnSorteo.style.cursor = 'pointer';
contenedorBoton.appendChild(btnSorteo);

// Al pulsar el botón se valida, se genera el sorteo y se muestran los resultados
btnSorteo.addEventListener("click", () => {
    // 1) validar que haya 6 marcados
    if (seleccionados.length !== 6) {
        mensajeAciertos.textContent = "Debes marcar exactamente 6 números.";
        mensajeAciertos.style.color = "red";
        return;
    }

    // 2) Generar sorteo
    const ganadores = generarSorteo();

    // 3) Mostrar los números ganadores
    resultadoSorteo.textContent = '';
    ganadores.forEach(n => {
        const b = document.createElement("button");
        b.textContent = n;
        b.style.width = "30px";
        b.style.height = "30px";
        b.style.margin = "3px";
        b.style.borderRadius = "5px";
        b.style.backgroundColor = "#ffffff";
        b.style.fontSize = "16px";
        resultadoSorteo.appendChild(b);
    });
    // 4)  Contar cuántos aciertos hay
    let aciertos = 0;
    seleccionados.forEach(num => {
        if (ganadores.includes(num)) aciertos++;
    });
    // 5) Mostrar los aciertos
    mensajeAciertos.textContent = "Has tenido " + aciertos + " aciertos.";
    mensajeAciertos.style.color = aciertos > 0 ? "green" : "black";
});

// Donde mostraremos los 6 números ganadores
const resultadoSorteo = document.createElement("div");
resultadoSorteo.style.marginTop = "8px";
resultadoSorteo.style.gap = "5px";
resultadoSorteo.style.display = "flex";
contenedorBoton.appendChild(resultadoSorteo);

// Cuadro de mensaje de aciertos
const mensajeAciertos = document.createElement("div");
mensajeAciertos.style.marginTop = "8px";
mensajeAciertos.style.padding = "5px";
mensajeAciertos.style.border = "3px solid #b10202";
mensajeAciertos.style.borderRadius = "5px";
mensajeAciertos.style.width = "300px";
mensajeAciertos.style.margin = "5px auto";
document.body.appendChild(mensajeAciertos);

// Función para generar el sorteo
function generarSorteo() {
    const numeros = [];
    // Mientras no tengamos 6 numeros
    while (numeros.length < 6) {
        // Generamos un número aleatorio
        const n = Math.floor(Math.random() * 49) + 1; // 1..49
        // Si no hemos generado ese número, lo metemos
        if (!numeros.includes(n)) {
            numeros.push(n);
        }
    }
    // Ordenamos los números
    return numeros.sort((a, b) => a - b);
}
