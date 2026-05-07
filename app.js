// ================= FIREBASE =================
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
};

firebase.initializeApp(firebaseConfig);

const auth = firebase.auth();
const db = firebase.firestore();

let currentUser = null;

// ================= REGISTRO =================
document.getElementById("registerBtn")?.addEventListener("click", () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((user) => {

      db.collection("users").doc(user.user.uid).set({
        email,
        role
      });

      alert("Usuario creado");
    });
});


// ================= LOGIN =================
document.getElementById("loginBtn")?.addEventListener("click", () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((user) => {
      window.location.href = "dashboard.html";
    });
});


// ================= CHECK USER =================
auth.onAuthStateChanged(async (user) => {

  if (!user) return;

  currentUser = user;

  const doc = await db.collection("users").doc(user.uid).get();
  const role = doc.data().role;

  // CLIENTE
  if (role === "cliente") {
    document.getElementById("clientePanel").style.display = "block";
  }

  // Cargar viajes
  loadTrips();
});


// ================= CREAR VIAJE =================
document.getElementById("pedirViaje")?.addEventListener("click", () => {

  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;

  db.collection("trips").add({
    origen,
    destino,
    status: "pendiente",
    userId: currentUser.uid
  });

  alert("Viaje solicitado");
});


// ================= VER VIAJES =================
function loadTrips() {

  const div = document.getElementById("viajes");

  db.collection("trips")
    .onSnapshot(snapshot => {

      div.innerHTML = "";

      snapshot.forEach(doc => {
        const t = doc.data();

        div.innerHTML += `
          <p>
            ${t.origen} → ${t.destino} | ${t.status}
            <button onclick="aceptar('${doc.id}')">Aceptar</button>
          </p>
        `;
      });
    });
}


// ================= ACEPTAR VIAJE =================
function aceptar(id) {
  db.collection("trips").doc(id).update({
    status: "aceptado"
  });
}


// ================= LOGOUT =================
function logout() {
  auth.signOut();
  window.location.href = "index.html";
}
