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

const container = document.getElementById("container");
const formulario = document.getElementById("form");

function crearCard(miembro) {
        const card = document.createElement("div");
        card.className = "card";

        card.innerHTML = 
                        `<p>Nombre: ${miembro.nombre}</p>
                         <p>Edad: ${miembro.edad}</p>
                         <p>Disciplina: ${miembro.disciplina}</p>
                         <p>Entrenamiento: ${miembro.entrenamiento}</p>`;

        const boton = document.createElement("button")
        boton.className = "boton"
        boton.innerText = `Eliminar`;
        boton.addEventListener("click", () =>{ 
            card.remove()
            alert("Eliminaste un miembro")
        })

        card.appendChild(boton)
        container.appendChild(card);
        
}
miembros.forEach(miembro => crearCard(miembro));

class NuevoMiembro {
  constructor(nombre, edad, disciplina, entrenamiento) {
    this.nombre = nombre;
    this.edad = edad;
    this.disciplina = disciplina;
    this.entrenamiento = entrenamiento;
  }
}

formulario.addEventListener("submit", (e) => {
    e.preventDefault();
    const nombre = e.target.nombre.value;
    const edad = e.target.edad.value;
    const disciplina = e.target.disciplinas.value;
    const entrenamiento = e.target.dias.value;
    const miembroNuevo = new NuevoMiembro(nombre, edad, disciplina, entrenamiento);

    miembros.push(miembroNuevo);
    crearCard(miembroNuevo);
    alert("Creaste un nuevo miembro")
});

formfiltracion.addEventListener("submit", (e) => {
    e.preventDefault();
    const valorElegido = e.target.disciplina.value;
    const filtro = miembros.filter((miembro)=>miembro.disciplina===valorElegido)
    container.innerHTML = "";
    filtro.forEach((miembro) => crearCard(miembro));
}    
)








