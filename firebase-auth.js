// Import the functions you need from the SDKs you need
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.10.0/firebase-app.js";
import { getAuth, signInWithEmailAndPassword, createUserWithEmailAndPassword, GoogleAuthProvider, signInWithPopup, GithubAuthProvider } from 'https://www.gstatic.com/firebasejs/10.10.0/firebase-auth.js'

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

                // Enviar solicitud POST al API Gateway para registrar un nuevo usuario
                fetch('/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                })
                .then(response => response.json())
                .then(data => {
                    // Manejar la respuesta del servidor
                    console.log(data);
                    // Redirigir o mostrar mensajes según sea necesario
                })
                .catch(error => {
                    // Manejar errores de red o del servidor
                    console.error(error);
                })
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
                    if (errorCode === 'auth/email-already-in-use') {
                        // Mostrar modal de correo ya registrado
                        var emailExistsModal = new bootstrap.Modal(document.getElementById('emailExistsModal'));
                        emailExistsModal.show();
                    } else {
                        // Otro error
                        alert('Ha ocurrido un error al crear el usuario. Por favor, inténtelo de nuevo.');
                    }
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
        googleLogin.addEventListener('click', async function(e) {
            e.preventDefault();

            const provider = new GoogleAuthProvider();
            const auth = getAuth();
            try {
                const results = await signInWithPopup(auth, provider);
                console.log('Google login');
                window.location.href = 'index.html';
            } catch (error) {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    const modal = document.getElementById('githubErrorModal');
                    const bootstrapModal = new bootstrap.Modal(modal);
                    bootstrapModal.show();
                } else {
                    console.error('Error al autenticar con Google:', error);
                    alert('ERROR DE AUTENTICACION X Google');
                }
            }
        });
    }

    const githubButton = document.querySelector('#githubButton');
    if (githubButton) {
        githubButton.addEventListener('click', async function(e) {
            e.preventDefault();
    
            const provider = new GithubAuthProvider();
            const auth = getAuth();
    
            try {
                const result = await signInWithPopup(auth, provider);
                console.log('GitHub login');
                window.location.href = 'index.html';
            } catch (error) {
                if (error.code === 'auth/account-exists-with-different-credential') {
                    const modal = document.getElementById('githubErrorModal');
                    const bootstrapModal = new bootstrap.Modal(modal);
                    bootstrapModal.show();
                } else {
                    console.error('Error al autenticar con GitHub:', error);
                    alert('ERROR DE AUTENTICACION X GITHUB');
                }
            }
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
