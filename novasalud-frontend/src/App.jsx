// src/App.jsx
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import 'bootstrap/dist/css/bootstrap.min.css';

// Componentes
import Login from './components/Login';
import NavbarComponent from './components/Navbar';
import Dashboard from './components/Dashboard';
import ListaProductos from './components/Productos/ListaProductos';
import NuevaVenta from './components/Ventas/NuevaVenta';
import ListaVentas from './components/Ventas/ListaVentas';
import NuevaCompra from './components/Compras/NuevaCompra';
import Alertas from './components/Alertas/Alertas';

import './App.css';

function App() {
  const [autenticado, setAutenticado] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('token');
    setAutenticado(!!token);
  }, []);

  const RutaProtegida = ({ children }) => {
    const token = localStorage.getItem('token');
    return token ? children : <Navigate to="/login" />;
  };

  return (
    <Router>
      <Routes>
        {/* Ruta de Login */}
        <Route path="/login" element={<Login />} />

        {/* Rutas Protegidas */}
        <Route
          path="/dashboard"
          element={
            <RutaProtegida>
              <div>
                <NavbarComponent />
                <Dashboard />
              </div>
            </RutaProtegida>
          }
        />

        <Route
          path="/productos"
          element={
            <RutaProtegida>
              <div>
                <NavbarComponent />
                <ListaProductos />
              </div>
            </RutaProtegida>
          }
        />

        <Route
          path="/ventas"
          element={
            <RutaProtegida>
              <div>
                <NavbarComponent />
                <ListaVentas />
              </div>
            </RutaProtegida>
          }
        />

        <Route
          path="/ventas/nueva"
          element={
            <RutaProtegida>
              <div>
                <NavbarComponent />
                <NuevaVenta />
              </div>
            </RutaProtegida>
          }
        />

        <Route
          path="/compras"
          element={
            <RutaProtegida>
              <div>
                <NavbarComponent />
                <NuevaCompra />
              </div>
            </RutaProtegida>
          }
        />

        <Route
          path="/alertas"
          element={
            <RutaProtegida>
              <div>
                <NavbarComponent />
                <Alertas />
              </div>
            </RutaProtegida>
          }
        />

        {/* Redireccionar a dashboard por defecto */}
        <Route path="/" element={<Navigate to="/dashboard" />} />
      </Routes>
    </Router>
  );
}

export default App;