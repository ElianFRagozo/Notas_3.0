
// Configuración de Firebase y SDK
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, createUserWithEmailAndPassword } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'

// Tu configuración de Firebase
const firebaseConfig = {
  apiKey: "AIzaSyDp1agRZmYWvPBXaINLILHtwlpZKgAJMVw",
  authDomain: "fb-notas.firebaseapp.com",
  projectId: "fb-notas",
  storageBucket: "fb-notas.appspot.com",
  messagingSenderId: "36933207721",
  appId: "1:36933207721:web:58705b3a46ee4949444bb8"
};

// Inicializar Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.querySelector('#signUpButton');

    signUpButton.addEventListener('click', function(e) {
        e.preventDefault();

        // Obtener el valor del email y la contraseña
        const email = document.querySelector('#emailInput').value;
        const password = document.querySelector('#passwordInput').value;

        // Crear usuario con correo y contraseña
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                // Usuario creado exitosamente
                var user = userCredential.user;
                console.log('Usuario creado:', user);

                // Aquí puedes redirigir al usuario o mostrar un mensaje de éxito
            })
            .catch((error) => {
                // Error al crear el usuario
                var errorCode = error.code;
                var errorMessage = error.message;
                console.error('Error al crear el usuario:', errorMessage);
                // Aquí puedes manejar los errores de autenticación
            });
    });
});
