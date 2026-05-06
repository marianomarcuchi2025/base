
// ===============================
// 1. FIREBASE IMPORTS
// ===============================
import { initializeApp } from "firebase/app";
import { getAuth, createUserWithEmailAndPassword, signInWithEmailAndPassword } from "firebase/auth";


// ===============================
// 2. CONFIG FIREBASE (REEMPLAZAR DATOS)
// ===============================
const firebaseConfig = {
  apiKey: "TU_API_KEY",
  authDomain: "TU_AUTH_DOMAIN",
  projectId: "TU_PROJECT_ID",
  storageBucket: "TU_STORAGE_BUCKET",
  messagingSenderId: "TU_MESSAGING_SENDER_ID",
  appId: "TU_APP_ID"
};


// ===============================
// 3. INICIALIZAR FIREBASE
// ===============================
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);


// ===============================
// 4. REGISTRO DE USUARIO
// ===============================
const registerBtn = document.getElementById("registerBtn");

if (registerBtn) {
  registerBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    createUserWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Usuario creado correctamente: " + userCredential.user.email);
      })
      .catch((error) => {
        alert("Error registro: " + error.message);
      });
  });
}


// ===============================
// 5. LOGIN DE USUARIO
// ===============================
const loginBtn = document.getElementById("loginBtn");

if (loginBtn) {
  loginBtn.addEventListener("click", () => {
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        alert("Bienvenido " + userCredential.user.email);

        // Redirigir a dashboard
        window.location.href = "dashboard.html";
      })
      .catch((error) => {
        alert("Error login: " + error.message);
      });
  });
}
