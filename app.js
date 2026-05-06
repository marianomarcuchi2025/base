const firebaseConfig = {
  apiKey: "XXXX",
  authDomain: "XXXX.firebaseapp.com",
  projectId: "XXXX",
  storageBucket: "XXXX",
  messagingSenderId: "XXXX",
  appId: "XXXX"
}
  let viajes = [];

function solicitarViaje() {
  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;

  if (!origen || !destino) {
    alert("Completa origen y destino");
    return;
  }

  const viaje = {
    id: Date.now(),
    origen,
    destino,
    estado: "pendiente"
  };

  viajes.push(viaje);

  mostrarViajes();
}

function mostrarViajes() {
  const lista = document.getElementById("listaViajes");
  lista.innerHTML = "";

  viajes.forEach(v => {
    lista.innerHTML += `
      <div class="card">
        🚗 Viaje #${v.id}<br>
        📍 ${v.origen} → ${v.destino}<br>
        📦 Estado: ${v.estado}
      </div>
    `;
  });
}
