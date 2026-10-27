const formulario = document.getElementById("form");
const mensajeFeedback = document.getElementById("mensaje-feedback");

const usersContainer = document.getElementById("users-container")
const url = "./db/data.json"

let miembros = JSON.parse(localStorage.getItem("miembros")) || [];

function renderMiembros(listaMiembros) {
     usersContainer.innerHTML = "";

    listaMiembros.forEach(miembro => {
        const { nombre, edad, dni, disciplina, entrenamiento, precio, categoria } = miembro;
        const card = document.createElement("div")
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
      renderMiembros(miembros);
       Swal.fire({
      icon: "success",
      title: "¡Guardado!",
      text: `${nombre} ahora realiza ${nuevaDisciplina}.`,
      timer: 1500,
      showConfirmButton: false
    });
    }
  });

  const boton = document.createElement("button")
  boton.className = "boton"
  boton.innerText = `Eliminar`;
  boton.addEventListener("click", () => {
    Swal.fire({
  title: "Estas seguro?",
  text: "No vas a poder reveritr la eliminacion!",
  icon: "warning",
  showCancelButton: true,
  confirmButtonColor: "#3085d6",
  cancelButtonColor: "#d33",
  confirmButtonText: "Si, eliminalo!"
}).then((result) => {
  if (result.isConfirmed) 
    card.remove()
    miembros = miembros.filter((m) => m.dni !== miembro.dni);
    localStorage.setItem("miembros", JSON.stringify(miembros));
    Swal.fire({
    title: "Eliminado!",
    text: "Tu tarjeta se elimino.",
    icon: "success"
  });
});
  })
  card.appendChild(boton)
  usersContainer.appendChild(card);
  })} 

async function inicializarMiembros() {
  if (miembros.length === 0) {
    try {
      const response = await fetch(url);
      const data = await response.json();
      miembros = data;
      localStorage.setItem("miembros", JSON.stringify(miembros));
    } catch (err) {
      console.error("Error al cargar url:", err);
    }
  }
  renderMiembros(miembros);
}
inicializarMiembros();

function mostrarMensaje(texto) {
  mensajeFeedback.textContent = texto;
   setTimeout(() => {
    mensajeFeedback.textContent = "";
  }, 3000);
}

function renderizarTarjetas(lista) {
  usersContainer.innerHTML = "";
  lista.forEach((miembro) => renderMiembros(miembro));
}

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
  }}

formulario.addEventListener("submit", (e) => {
  e.preventDefault();
  const nombre = e.target.nombre.value;
  const edad = e.target.edad.value;
  if (isNaN(edad) || edad <= 0 || edad>100) {
    Swal.fire({
  icon: "error",
  title: "Edad Invalida",
  text: "Por favor, ingresá una edad válida, hasta 99 (número positivo)!",
});
    return;}

  const dni = e.target.dni.value;
  const disciplina = e.target.disciplinas.value;
  const entrenamiento = e.target.dias.value;
  const miembroNuevo = new NuevoMiembro(nombre, edad, dni, disciplina, entrenamiento);

  Swal.fire({
    title: `¿Querés registrar a ${nombre}?`,
    text: `DNI: ${dni} - Disciplina: ${disciplina}`,
    showDenyButton: true,
    showCancelButton: true,
    confirmButtonText: "Guardar",
    denyButtonText: "No guardar",
    cancelButtonText: "Cancelar"
  }).then((result) => {
    if (result.isConfirmed) {
      const miembroNuevo = new NuevoMiembro(nombre, edad, dni, disciplina, entrenamiento);
      miembros = [...miembros, miembroNuevo];
      localStorage.setItem("miembros", JSON.stringify(miembros));
      renderMiembros(miembros);
      e.target.reset();
      Swal.fire("¡Registrado!", `Se agregó a ${nombre} correctamente.`, "success");
    } else if (result.isDenied) {
      Swal.fire("Registro cancelado", "No se guardó el nuevo miembro.", "info");
    }
  });
});

formfiltracion.addEventListener("submit", (e) => {
  e.preventDefault();
  const valorElegido = e.target.disciplina.value;
  const filtro = miembros.filter((miembro) => miembro.disciplina === valorElegido);
  renderMiembros(filtro);
   if (filtro.length > 0) {
    Swal.fire({
      title: "¡Filtro aplicado!",
      text: `Se encontraron ${filtro.length} miembro(s) en ${valorElegido}.`,
      icon: "success",
      draggable: true
    });
  } else {
    Swal.fire({
      title: "Sin resultados",
      text: `No hay miembros registrados en ${valorElegido}.`,
      icon: "info",
      draggable: true
    });
}})