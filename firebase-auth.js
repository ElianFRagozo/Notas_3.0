// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup  } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDp1agRZmYWvPBXaINLILHtwlpZKgAJMVw",
  authDomain: "fb-notas.firebaseapp.com",
  projectId: "fb-notas",
  storageBucket: "fb-notas.appspot.com",
  messagingSenderId: "36933207721",
  appId: "1:36933207721:web:58705b3a46ee4949444bb8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth();

document.addEventListener('DOMContentLoaded', function() {
    const signUpButton = document.querySelector('#signUpButton');
    if (signUpButton) {
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
    
                    // Mostrar mensaje de confirmación con modal de Bootstrap
                    var myModal = new bootstrap.Modal(document.getElementById('confirmationModal'));
                    myModal.show();
    
                    // Redirigir al usuario a la página de inicio de sesión al cerrar el modal
                    myModal._element.addEventListener('hidden.bs.modal', function () {
                        window.location.href = 'auth-cover-signin.html';
                    });
                })
                .catch((error) => {
                    // Error al crear el usuario
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error('Error al crear el usuario:', errorMessage);
                    // Aquí puedes manejar los errores de autenticación
                });
        });
    }
    
    // Usuario existente
    const signinButton = document.querySelector('#signinButton');
    if (signinButton) {
        signinButton.addEventListener('click', function(e) {
            e.preventDefault();

            // Obtener el valor del email y la contraseña
            const email = document.querySelector('#emailInput').value;
            const password = document.querySelector('#passwordInput').value;

            signInWithEmailAndPassword(auth, email, password)
                .then((userCredential) => {
                    // Usuario encontrado exitosamente
                    var user = userCredential.user;
                    console.log('Usuario encontrado:', user);
                    window.location.href = 'index.html';

                })
                .catch((error) => {
                    // Error al encontrar el usuario
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error('Error al encontrar el usuario:', errorMessage);
                    alert('Usuario no registrado');
                });
        });
    }

    // Google login
    const googleLogin = document.querySelector('#googleLogin');
    if (googleLogin) {
        googleLogin.addEventListener('click', function(e) {
            e.preventDefault();

            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            signInWithPopup(auth, provider)
            .then((result) => {
                console.log('google login');
                window.location.href = 'index.html';
            }).catch((error) => {
                    // Error al autenticar el usuario
                    var errorCode = error.code;
                    var errorMessage = error.message;
                    console.error('Error al autenticar el usuario', errorMessage);
                    alert('ERROR DE AUTENTICACION');
                    // Aquí puedes manejar los errores de autenticación
            });
        });
    }

    // Botón de correo
    const emailButton = document.querySelector('#emailButton');
    if (emailButton) {
        emailButton.addEventListener('click', function() {
            window.location.href = 'auth-cover-signup.html';
        });
    }
});
