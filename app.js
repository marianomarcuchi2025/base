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
let userRole = null;


// ================= REGISTRO =================
document.getElementById("registerBtn")?.addEventListener("click", () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;
  const role = document.getElementById("role").value;

  if (!email || !password) {
    alert("Completa los campos");
    return;
  }

  auth.createUserWithEmailAndPassword(email, password)
    .then(user => {

      db.collection("users").doc(user.user.uid).set({
        email: email,
        role: role
      });

      alert("Usuario creado correctamente");
    })
    .catch(err => alert(err.message));
});


// ================= LOGIN =================
document.getElementById("loginBtn")?.addEventListener("click", () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(err => alert(err.message));
});


// ================= AUTH STATE =================
auth.onAuthStateChanged(async user => {

  if (!user) return;

  currentUser = user;

  const doc = await db.collection("users").doc(user.uid).get();

  if (doc.exists) {
    userRole = doc.data().role;
  }

  loadTrips();
});


// ================= CREAR VIAJE =================
document.getElementById("pedirViaje")?.addEventListener("click", () => {

  const origen = document.getElementById("origen").value;
  const destino = document.getElementById("destino").value;

  if (!origen || !destino) {
    alert("Completa origen y destino");
    return;
  }

  db.collection("trips").add({
    origen: origen,
    destino: destino,
    status: "pendiente",
    userId: currentUser.uid,
    createdAt: new Date()
  });

  alert("Viaje solicitado");
});


// ================= CARGAR VIAJES =================
function loadTrips() {

  const div = document.getElementById("viajes");
  if (!div) return;

  db.collection("trips")
    .orderBy("createdAt", "desc")
    .onSnapshot(snapshot => {

      div.innerHTML = "";

      snapshot.forEach(doc => {
        const t = doc.data();

        div.innerHTML += `
          <div style="
            background:#1b2f22;
            padding:10px;
            margin:8px 0;
            border-radius:8px;
          ">
            🚗 ${t.origen} → ${t.destino}<br>
            📌 Estado: ${t.status}
            <br><br>
            <button onclick="aceptar('${doc.id}')">
              Aceptar viaje
            </button>
          </div>
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
