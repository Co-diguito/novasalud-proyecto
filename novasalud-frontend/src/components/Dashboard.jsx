// src/components/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Card } from 'react-bootstrap';
import api from '../services/api';
import './Dashboard.css';

function Dashboard() {
  const [estadisticas, setEstadisticas] = useState({
    totalProductos: 0,
    totalVentas: 0,
    productosBajoStock: 0,
    alertas: 0
  });

  useEffect(() => {
    cargarEstadisticas();
  }, []);

  const cargarEstadisticas = async () => {
    try {
      const productos = await api.get('/productos');
      const ventas = await api.get('/ventas');
      const alertas = await api.get('/alertas/resumen');

      setEstadisticas({
        totalProductos: productos.data.length,
        totalVentas: ventas.data.length,
        productosBajoStock: productos.data.filter(p => p.stock_actual <= p.stock_minimo).length,
        alertas: alertas.data.totalAlertas
      });
    } catch (error) {
      console.error('Error al cargar estadísticas:', error);
    }
  };

  return (
    <Container fluid className="dashboard">
      <h1>📊 Panel de Control</h1>
      
      <Row className="mt-4">
        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>Productos Totales</h5>
              <h2>{estadisticas.totalProductos}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card">
            <Card.Body>
              <h5>Ventas Realizadas</h5>
              <h2>{estadisticas.totalVentas}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card warning">
            <Card.Body>
              <h5>Bajo Stock</h5>
              <h2>{estadisticas.productosBajoStock}</h2>
            </Card.Body>
          </Card>
        </Col>

        <Col md={3}>
          <Card className="stat-card danger">
            <Card.Body>
              <h5>Alertas Activas</h5>
              <h2>{estadisticas.alertas}</h2>
            </Card.Body>
          </Card>
        </Col>
      </Row>

      <Row className="mt-4">
        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Acciones Rápidas</Card.Title>
            </Card.Header>
            <Card.Body>
              <button className="btn btn-primary btn-block mb-2">➕ Nueva Venta</button>
              <button className="btn btn-success btn-block mb-2">📦 Nueva Compra</button>
              <button className="btn btn-info btn-block mb-2">🏷️ Nuevo Producto</button>
              <button className="btn btn-warning btn-block">⚠️ Ver Alertas</button>
            </Card.Body>
          </Card>
        </Col>

        <Col md={6}>
          <Card>
            <Card.Header>
              <Card.Title>Información del Sistema</Card.Title>
            </Card.Header>
            <Card.Body>
              <p><strong>Sistema:</strong> Nova Salud v1.0</p>
              <p><strong>Base de Datos:</strong> MySQL</p>
              <p><strong>Estado:</strong> <span className="badge badge-success">Activo</span></p>
              <p><strong>Última sincronización:</strong> {new Date().toLocaleString()}</p>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}

export default Dashboard;