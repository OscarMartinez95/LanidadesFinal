import React, { useState } from 'react';
import './Login.css'

const Login = (props) => {

  const [username, setUser] = useState('');
  const [pasword, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleUserChange = (event) => {
    setUser(event.target.value);
  }

  const handleLoginClick = () => {

    if (username.length === 0) {
      alert('Debe ingresar el Usuario correcto')
      return;
    }

    if (pasword.length === 0) {
      alert('Debe completar la contraseña')
      return;
    }

    fetch('http://localhost:4000/auth/login', {
      method: 'POST',
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username: username, password: pasword }),
    }).then(res => {
      return res.json();
    }).then((respuesta) => {    
      console.log(respuesta);
      if (respuesta.error) {
        setError(respuesta.error);
      } else {
        // Navegar a la ruta correspondiente
        alert('Login exitoso');
        props.onLogin(respuesta.token);
      }
    });
  }

  return (
    <div className="Login">
      
      <p>Login:</p>

      <input placeholder="Ingrese su mail" onChange={handleUserChange} />
      <input placeholder="Ingrese su contraseña" onChange={(event) => setPassword(event.target.value)} type="password" />

      <button onClick={handleLoginClick}> Ingresar! </button>

    </div>
  )
}

export default Login;