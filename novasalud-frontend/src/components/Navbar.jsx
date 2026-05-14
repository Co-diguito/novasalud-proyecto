// src/components/Navbar.jsx
import React from 'react';
import { Navbar, Nav, Container, Dropdown } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Navbar.css';

function NavbarComponent() {
  const navigate = useNavigate();
  const usuario = JSON.parse(localStorage.getItem('usuario') || '{}');

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('usuario');
    navigate('/login');
  };

  return (
    <Navbar bg="dark" expand="lg" sticky="top">
      <Container fluid>
        <Navbar.Brand href="/dashboard" className="brand">
          🏥 NOVA SALUD
        </Navbar.Brand>
        
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto">
            <Nav.Link href="/dashboard">Dashboard</Nav.Link>
            <Nav.Link href="/productos">Productos</Nav.Link>
            <Nav.Link href="/ventas">Ventas</Nav.Link>
            <Nav.Link href="/compras">Compras</Nav.Link>
            <Nav.Link href="/alertas">Alertas</Nav.Link>

            <Dropdown className="ms-3">
              <Dropdown.Toggle variant="light" id="dropdown-basic">
                👤 {usuario.nombre}
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item href="/perfil">Mi Perfil</Dropdown.Item>
                <Dropdown.Item href="/configuracion">Configuración</Dropdown.Item>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout}>
                  Cerrar Sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
}

export default NavbarComponent;