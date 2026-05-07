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
    .then(user => {

      db.collection("users").doc(user.user.uid).set({
        email,
        role
      });

      alert("Usuario creado");
    })
    .catch(e => alert(e.message));
});


// ================= LOGIN =================
document.getElementById("loginBtn")?.addEventListener("click", () => {

  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then(() => {
      window.location.href = "dashboard.html";
    })
    .catch(e => alert(e.message));
});


// ================= AUTH =================
auth.onAuthStateChanged(user => {
  if (!user) return;
  currentUser = user;
});


// ================= CREAR VIAJE =================
function crearViaje() {

  const destino = document.getElementById("destino").value;

  navigator.geolocation.getCurrentPosition(pos => {

    db.collection("trips").add({
      userId: currentUser.uid,
      destino,
      origen: {
        lat: pos.coords.latitude,
        lng: pos.coords.longitude
      },
      status: "pendiente",
      createdAt: new Date()
    });

    document.getElementById("estado").innerText =
      "Viaje solicitado ✔";

  });
}


// ================= ESCUCHAR VIAJES =================
db.collection("trips").onSnapshot(snapshot => {

  snapshot.forEach(doc => {

    const t = doc.data();

    if (t.userId === currentUser?.uid) {
      document.getElementById("estado").innerText =
        "Estado: " + t.status;
    }

  });

});


// ================= LOGOUT =================
function logout() {
  auth.signOut();
  window.location.href = "index.html";
}
