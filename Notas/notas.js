let notas = [
    {
        id: 1,
        titulo: "Lavar la loza",
        texto: "Antes de que llegue mi mamá",
        finalizada: false
    },
    {
        id: 2,
        titulo: "Estudiar para el examen",
        texto: "Matematicas, martes 7am",
        finalizada: false
    },
    {
        id: 3,
        titulo: "Sacar al perro a pasear",
        texto: "Llevar varias bolsas",
        finalizada: false
    }
]

let idGlobal = 3

let contenedor = document.getElementById("contenedor")
let borrar = document.getElementById("borrar")


borrar.addEventListener("click", () => {
    document.querySelector("#form input[type=text]").value = "";
    document.querySelector("#form textarea").value = "";
})

function agregarNota(titulo, texto) {
    if (titulo !== "" && texto !== "") {
        idGlobal++;
        let nota = {
            id: idGlobal,
            titulo: titulo,
            texto: texto,
            finalizada: false
        };
        notas.push(nota);
        mostrarNota(nota);
    } else {
        alert("Campos vacíos");
    }
}

function mostrarNota(nota) {
    let card = document.createElement("div");
    card.className = "card d-flex col-3 p-2";
    card.innerHTML = `
        <div class="card-body gap-3 d-flex flex-column align-items-center justify-content-between">
            <div class="d-flex gap-2">
                <input onClick="marcarRealizada(${nota.id})" type="checkbox" ${nota.finalizada? "checked": ""}>
                <h5 class="card-title">${nota.titulo}</h5>
            </div>
            <p class="card-text">${nota.texto}</p>
            <button class="btn btn-danger" onclick="borrarNota(${nota.id})">Borrar Nota</button>
        </div>
    `;
    contenedor.appendChild(card);
}



function borrarNota(id) {
    notas = notas.filter(nota => nota.id !== id);
    actualizarNotas(notas);
}

function actualizarNotas(notasParaMostrar) {
    contenedor.innerHTML = "";
    if (notasParaMostrar.length === 0) {
        contenedor.innerHTML = "<p class='text-center'>NO HAY NOTAS PARA MOSTRAR</p>";
    } else {
        notasParaMostrar.forEach(nota => mostrarNota(nota));
    }
}

function marcarRealizada(id) {
    let nota = notas.find(nota => nota.id === id);
    if (nota) {   
        nota.finalizada = !nota.finalizada;
        actualizarNotas(notas);
        console.log(nota);
    }
}

function filtrarPorFinalizada(notas) {
    return notas.filter(nota => nota.finalizada);
}

let realizadas = document.getElementById("realizadas");
realizadas.addEventListener("change", () => {
    let notasAmostrar = realizadas.checked ? filtrarPorFinalizada(notas) : notas;
    actualizarNotas(notasAmostrar);
});

function filtrarPorBuscador(notas, texto) { 
    if (filtrarPorFinalizada(notas).length === 0) {
        actualizarNotas(notas);
        return notas.filter(nota => nota.titulo.toLowerCase().includes(texto) || nota.texto.toLowerCase().includes(texto))
    } else {
        let notasAmostrar = filtrarPorFinalizada(notas);
        return notasAmostrar.filter(nota => nota.titulo.toLowerCase().includes(texto) || nota.texto.toLowerCase().includes(texto))
    }
   
}

let buscador = document.getElementById("buscador");
buscador.addEventListener("input", () => {
    let texto = buscador.value;
    let notasAmostrar = filtrarPorBuscador(notas, texto);
    actualizarNotas(notasAmostrar);
});

document.getElementById("btn").addEventListener("click", () => {
    let titulo = document.querySelector("#form input[type=text]").value;
    let texto = document.querySelector("#form textarea").value;
    agregarNota(titulo, texto);
    document.querySelector("#form input[type=text]").value = "";
    document.querySelector("#form textarea").value = "";
});

actualizarNotas(notas);