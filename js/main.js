const miembrosIniciales = [
  { nombre: "Carlos", edad: 34, dni: 38134567, disciplina: "Musculacion", entrenamiento: "Dos dias a la semana", precio: "$35000", categoria: "Mayor de edad" },
  { nombre: "Jorge", edad: 28, dni: 40454890, disciplina: "Crossfit", entrenamiento: "Tres dias a la semana", precio: "$40000", categoria: "Mayor de edad" },
  { nombre: "Jimena", edad: 31, dni: 39555123, disciplina: "Crossfit", entrenamiento: "Cinco dias a la semana", precio: "$50000", categoria: "Mayor de edad" },
  { nombre: "Yamila", edad: 25, dni: 43121343, disciplina: "Boxeo", entrenamiento: "Tres dias a la semana", precio: "$40000", categoria: "Mayor de edad" },
  { nombre: "Roman", edad: 21, dni: 46880900, disciplina: "Musculacion", entrenamiento: "Cinco dias a la semana", precio: "$50000", categoria: "Mayor de edad" },
  { nombre: "Mateo", edad: 45, dni: 28631232, disciplina: "Boxeo", entrenamiento: "Dos dias a la semana", precio: "$35000", categoria: "Mayor de edad" }
];

const miembrosGuardados = JSON.parse(localStorage.getItem("miembros"));

let miembros = miembrosGuardados || miembrosIniciales;
if (!miembrosGuardados) {
  localStorage.setItem("miembros", JSON.stringify(miembros));
}

setInterval(() => {
    alert("Cargue los datos del formulario para agregar un nuevo miembro")
}, 20000)

const container = document.getElementById("container");
const formulario = document.getElementById("form");

function renderizarTarjetas(lista) {
  container.innerHTML = ""; // Limpia las tarjetas actuales para evitar duplicados
  lista.forEach((miembro) => crearCard(miembro));
}

function crearCard(miembro) {
  const { nombre, edad, dni, disciplina, entrenamiento, precio, categoria } = miembro
  const card = document.createElement("div");
  card.className = "card";

  card.innerHTML =
                        `<p>Nombre: ${nombre}</p>
                         <p>Edad: ${edad}</p>
                         <p>Dni: ${dni}</p>
                         <p>Disciplina: ${disciplina}</p>
                         <p>Entrenamiento: ${entrenamiento}</p>
                         <p>Precio: ${precio}</p>
                         <p>Categoria: ${categoria}</p>
                         
                         <div class="bloque-edicion">
                         <select class="select-disciplina">
                         <option value="Musculacion" ${disciplina === "Musculacion"}>Musculación</option>
                         <option value="Crossfit" ${disciplina === "Crossfit"}>Crossfit</option>
                         <option value="Boxeo" ${disciplina === "Boxeo"}>Boxeo</option>
                         </select>
                         <button type="button" class="btn-guardar">Cambiar Disciplina</button>
                        </div>`;
  
  const btnGuardar = card.querySelector(".btn-guardar");
  const selectDisciplina = card.querySelector(".select-disciplina");

  btnGuardar.addEventListener("click", () => {
    const nuevaDisciplina = selectDisciplina.value;
    const miembroAEditar = miembros.find((m) => (m.dni) === (dni));
    if (miembroAEditar) {
      miembroAEditar.disciplina = nuevaDisciplina;
      localStorage.setItem("miembros", JSON.stringify(miembros));
      renderizarTarjetas(miembros);
      alert(`Disciplina de ${nombre} cambiada a ${nuevaDisciplina}`);
    }
  });

  const boton = document.createElement("button")
  boton.className = "boton"
  boton.innerText = `Eliminar`;
  boton.addEventListener("click", () => {
    card.remove()
    miembros = miembros.filter((m) => m.nombre !== miembro.nombre);
    localStorage.setItem("miembros", JSON.stringify(miembros));
    alert("Eliminaste un miembro")
  })
  card.appendChild(boton)
  container.appendChild(card);
}

miembros.forEach(m => crearCard(m));

class NuevoMiembro {
  constructor(nombre, edad, dni, disciplina, entrenamiento) {
    this.nombre = nombre;
    this.edad = edad;
    this.dni = dni;
    this.disciplina = disciplina;
    this.entrenamiento = entrenamiento;
    this.precio = this.caclcularPrecio(entrenamiento);
    this.categoria = edad >= 18 ? "Mayor de edad" : "Menor de edad"
  }

  caclcularPrecio(entrenamiento) {
    const precios = {
      dosDias: "$35000",
      tresDias: "$40000",
      cincoDias: "$50000"
    }
    if (entrenamiento === "Dos dias a la semana") { return precios.dosDias }
    else if (entrenamiento === "Tres dias a la semana") { return precios.tresDias }
    else (entrenamiento === "Cinco dias a la semana"); { return precios.cincoDias }
  }
}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = e.target.nombre.value;
  const edad = e.target.edad.value;
  if (isNaN(edad) || edad <= 0) {
    alert("Por favor, ingresá una edad válida (número positivo).");
    return;
  }

  const dni = e.target.dni.value;
  const disciplina = e.target.disciplinas.value;
  const entrenamiento = e.target.dias.value;
  const miembroNuevo = new NuevoMiembro(nombre, edad, dni, disciplina, entrenamiento);

  miembros = [...miembros, miembroNuevo];
  localStorage.setItem("miembros", JSON.stringify(miembros));
  crearCard(miembroNuevo);
  alert("Creaste un nuevo miembro")
});

formfiltracion.addEventListener("submit", (e) => {
  e.preventDefault();
  const valorElegido = e.target.disciplina.value;
  const filtro = miembros.filter((miembro) => miembro.disciplina === valorElegido)
  container.innerHTML = "";
  filtro.forEach((miembro) => crearCard(miembro));
}
)