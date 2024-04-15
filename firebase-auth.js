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
        signUpButton.addEventListener('click', async function(e) {
            e.preventDefault();
    
            // Obtener el valor del email y la contraseña
            const email = document.querySelector('#emailInput').value;
            const password = document.querySelector('#passwordInput').value;

            try {
                // Crear usuario con correo y contraseña
                const userCredential = await createUserWithEmailAndPassword(auth, email, password);
                // Usuario creado exitosamente
                var user = userCredential.user;
                console.log('Usuario creado:', user);

                // Obtener el idToken del usuario actual
                const idToken = await user.getIdToken();
                // Imprimir el idToken en la consola para depurar
                console.log('idToken:', idToken);

                // Enviar solicitud POST al API Gateway para registrar un nuevo usuario
                const response = await fetch('https://localhost:7084/api/auth/signup', {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                        'Authorization': 'Bearer ' + idToken
                    },
                    body: JSON.stringify({
                        email: email,
                        password: password
                    })
                });
                const data = await response.json();
                // Manejar la respuesta del servidor
                console.log(data);
                // Redirigir o mostrar mensajes según sea necesario
            } catch (error) {
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
            }
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
            // Iniciar sesión con Google
            const userCredential = await signInWithPopup(auth, provider);
            console.log('Google login');

            // Obtener el usuario autenticado
            const user = userCredential.user;

            // Obtener el idToken del usuario actual
            const idToken = await user.getIdToken();
            console.log('idToken:', idToken);

            // Redirigir a la página de inicio después de iniciar sesión
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
            // Iniciar sesión con GitHub
            const userCredential = await signInWithPopup(auth, provider);
            console.log('GitHub login');

            // Obtener el usuario autenticado
            const user = userCredential.user;

            // Obtener el idToken del usuario actual
            const idToken = await user.getIdToken();
            console.log('idToken:', idToken);

            // Redirigir a la página de inicio después de iniciar sesión
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
