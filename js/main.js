const miembros= [
    { nombre: "Carlos",
      edad: 34,
      disciplina: "Musculacion",
      entrenamiento: "Dos dias a la semana",
    },
    { nombre: "Jorge",
      edad: 28,
      disciplina: "Crossfit",
      entrenamiento: "Tres dias a la semana",
    },
    { nombre: "Jimena",
      edad: 31,
      disciplina: "Crossfit",
      entrenamiento: "Cinco dias a la semana",
    },
    { nombre: "Yamila",
      edad: 25,
      disciplina: "Boxeo",
      entrenamiento: "Tres dias a la semana",
    },
    { nombre: "Roman",
      edad: 21,
      disciplina: "Musculacion",
      entrenamiento: "Cinco dias a la semana"
    },
    { nombre: "Mateo",
      edad: 45,
      disciplina: "Boxeo",
      entrenamiento: "Dos dias a la semana",
    },
]

const header = document.getElementById("header")
header.className = "header"
const titulo = document.createElement("h1")
titulo.innerText = "BoxGym"
const subtitulo = document.createElement("h2")
subtitulo.innerText = "Panel de administracion"
header.appendChild(titulo)
header.appendChild(subtitulo)

const formu = document.getElementById("spanFormu")
const tituloFormu = document.createElement("h3")
tituloFormu.innerText = "Formulario de nuevos miembros"
const parrafoFormu = document.createElement("p")
parrafoFormu.innerText = "LLene los datos del nuevo miembro para agregarlo a la lista"
formu.appendChild(tituloFormu);
formu.appendChild(parrafoFormu);

const tituloTarjetas = document.getElementById("spanContainer")
const cardTitle = document.createElement("h3")
cardTitle.innerText = "Tarjeta de miembros"
tituloTarjetas.appendChild(cardTitle)

const container = document.getElementById("container");
const formulario = document.getElementById("form");
const inputNombre = document.getElementById("Nombre");
const inputEdad = document.getElementById("edad");
const inputDisciplina = document.getElementById("disciplina");
const inputEntrenamiento = document.getElementById("entrenamiento");

function crearCard(miembro) {
        const card = document.createElement("div");
        card.className = "card";

        const nombre = document.createElement("p");
        nombre.innerText = miembro.nombre

        const edad = document.createElement("p");
        edad.innerText = miembro.edad

        const disciplina = document.createElement("p");
        disciplina.innerText = miembro.disciplina

        const entrenamiento = document.createElement("p");
        entrenamiento.innerText = miembro.entrenamiento

        const boton = document.createElement("button")
        boton.className = "boton"
        boton.innerText = `Eliminar`;
        boton.addEventListener("click", () =>{ 
            card.remove()
            alert("Eliminaste un miembro")
        })

        card.appendChild(nombre);
        card.appendChild(edad);
        card.appendChild(disciplina);
        card.appendChild(entrenamiento);
        card.appendChild(boton)

        container.appendChild(card);
    
}

miembros.forEach(miembro => crearCard(miembro));

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nuevoMiembro = {
        nombre: inputNombre.value,
        edad: parseInt(inputEdad.value),
        disciplina: inputDisciplina.value,
        entrenamiento: inputEntrenamiento.value,
    };

    miembros.push(nuevoMiembro);
    crearCard(nuevoMiembro);
    alert("Creaste un nuevo miembro")
});

formfiltracion.addEventListener("submit", (e) => {
    e.preventDefault();
    const filter = e.target.filtrar.value
    const filtro = miembros.filter((miembro)=>miembro.disciplina===filter)
    container.innerHTML = "";
    filtro.forEach((miembro) => crearCard(miembro));
}    
)







