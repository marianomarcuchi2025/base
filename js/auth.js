function login() {
  const nombre = document.getElementById("nombre").value;
  const fuerza = document.getElementById("fuerza").value;

  if (!nombre || !fuerza) {
    alert("Completá todos los datos");
    return;
  }

  const user = {
    nombre,
    fuerza,
    fecha: new Date().toISOString()
  };

  localStorage.setItem("user", JSON.stringify(user));
  window.location.href = "index.html";
}
