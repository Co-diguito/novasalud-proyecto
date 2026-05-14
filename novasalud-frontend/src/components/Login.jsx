// src/components/Login.jsx
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import api from '../services/api';
import './Login.css';

function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await api.post('/usuarios/login', { username, password });
      localStorage.setItem('token', response.data.token);
      localStorage.setItem('usuario', JSON.stringify(response.data.usuario));
      navigate('/dashboard');
    } catch (err) {
      setError('Credenciales inválidas');
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>🏥 NOVA SALUD</h1>
        <h2>Sistema de Gestión de Botica</h2>
        
        <form onSubmit={handleLogin}>
          <div className="form-group">
            <label htmlFor="username">Usuario</label>
            <input
              type="text"
              id="username"
              className="form-control"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder="Ingrese su usuario"
              required
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Contraseña</label>
            <input
              type="password"
              id="password"
              className="form-control"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Ingrese su contraseña"
              required
            />
          </div>

          {error && <div className="alert alert-danger">{error}</div>}

          <button type="submit" className="btn btn-primary btn-block">
            Iniciar Sesión
          </button>
        </form>

        <div className="login-info">
          <p><strong>Usuario demo:</strong> admin</p>
          <p><strong>Contraseña:</strong> admin123</p>
        </div>
      </div>
    </div>
  );
}

export default Login;