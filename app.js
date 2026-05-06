
// ===============================
// FIREBASE SDK (modo navegador)
// ===============================

// IMPORTANTE: esto requiere que en HTML agregues scripts de Firebase (te lo pongo abajo)

// Config Firebase
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_SENDER_ID",
  appId: "TU_APP_ID"
};

// Inicializar Firebase
firebase.initializeApp(firebaseConfig);
const auth = firebase.auth();


// ===============================
// REGISTRO
// ===============================
document.getElementById("registerBtn")?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Usuario creado: " + userCredential.user.email);
    })
    .catch((error) => {
      alert(error.message);
    });
});


// ===============================
// LOGIN
// ===============================
document.getElementById("loginBtn")?.addEventListener("click", () => {
  const email = document.getElementById("email").value;
  const password = document.getElementById("password").value;

  auth.signInWithEmailAndPassword(email, password)
    .then((userCredential) => {
      alert("Bienvenido " + userCredential.user.email);
      window.location.href = "dashboard.html";
    })
    .catch((error) => {
      alert(error.message);
    });
});
