class Login {
  constructor() {  
    this.doLogin = this.doLogin.bind(this);
    this.doRegister = this.doRegister.bind(this);
    this.showRegister = this.showRegister.bind(this);
    this.showLogin = this.showLogin.bind(this); // Asegúrate de bindear el método showLogin

    const loginForm = document.querySelector('#login-form');
    loginForm.addEventListener('submit', this.doLogin);

    const registerForm = document.querySelector('#register-form');
    registerForm.addEventListener('submit', this.doRegister);

    const registerButton = document.querySelector('#register_button');
    registerButton.addEventListener('click', this.showRegister);  
    
    const volverButton = document.querySelector('#volver_button');
    volverButton.addEventListener('click', this.showLogin); 
  }

  doLogin(event) {
    event.preventDefault();
    const loginUsername = document.querySelector("#username").value;
    const loginPassword = document.querySelector("#password").value;
    
    if (!loginUsername || !loginPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }
    
    if (!this.validateEmail(loginUsername)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    }

    const key = "ProgramacionIII -AWI"; 
    const encryptedLoginUsername = CryptoJS.AES.encrypt(loginUsername, key).toString(); 
    const encryptedLoginPassword = CryptoJS.AES.encrypt(loginPassword, key).toString();

    const loginBody = {
      username: encryptedLoginUsername,
      password: encryptedLoginPassword
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(loginBody)
    };
        
    return fetch('/login/', fetchOptions)
      .then(response => {
        if (!response.ok) {
          return response.json().then(data => { throw new Error(data.message); });
        }
        return response.json();
      })
      .then(user => {
        alert('Bienvenido de nuevo!');
        window.location.href = '/';
      })
      .catch(error => {
        alert('Ingreso inválido. Email o contraseña incorrectos.');
        const registerButton = document.querySelector('#register_button');
        console.log('Agregando clase highlighted al botón de registro');
        registerButton.classList.add('highlighted');
      });
  }

  validateEmail(email) {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return re.test(email);
  }

  doRegister(event) {
    event.preventDefault();
    const registerUsername = document.querySelector("#reg-username").value;
    const registerPassword = document.querySelector("#reg-password").value;
    
    if (!this.validateEmail(registerUsername)) {
      alert('Por favor, ingrese un correo electrónico válido.');
      return;
    } 
    
    if (!registerUsername || !registerPassword) {
      alert('Por favor, complete todos los campos.');
      return;
    }

    if (registerPassword.length < 7) {
      alert('La contraseña debe tener al menos 7 caracteres.');
      return;
    }
    
    const key = "ProgramacionIII -AWI"; 
    const encryptedRegisterUsername = CryptoJS.AES.encrypt(registerUsername, key).toString(); 
    const encryptedRegisterPassword = CryptoJS.AES.encrypt(registerPassword, key).toString();

    const registerBody = {
      username: encryptedRegisterUsername,
      password: encryptedRegisterPassword
    };

    const fetchOptions = {
      method: 'POST',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(registerBody)
    };

    fetch('/register/', fetchOptions)
      .then(response => {
        if (!response.ok) {
          throw new Error('Error al registrar usuario');
        }
        alert('Registrado con éxito!');
        window.location.href = 'login.html';
        return response.json();
      })
      .catch(error => {
        alert(error.message);
      });
  }
  
  showRegister() {
    const container = document.querySelector("#register_section");
    container.classList.remove('register'); 
    const registerButton = document.querySelector('.boton_registro');
    registerButton.classList.add('register'); 
    
    const loginContainer = document.querySelector(".contenedor");
    const loginForm = document.querySelector(".login-form");
    
    loginForm.classList.add('slide-out-left');
    
    setTimeout(() => {
      loginForm.classList.add('hidden');
      container.classList.remove('register');
      container.classList.add('slide-in-right');
      registerButton.classList.add('hidden');
      registerButton.classList.add('hidden-button');
    }, 500);
  }

  showLogin() {
    const container = document.querySelector("#register_section");
    container.classList.add('register');
    const registerButton = document.querySelector('.boton_registro');
    registerButton.classList.remove('register');
    
    const loginContainer = document.querySelector(".contenedor");
    const loginForm = document.querySelector(".login-form");

    loginForm.classList.remove('hidden');
    loginForm.classList.remove('slide-out-left');
    loginForm.classList.add('slide-in-right');

    setTimeout(() => {
      container.classList.add('hidden');
      registerButton.classList.remove('hidden');
    }, 500);
  }
}

new Login();
