// src/components/Alertas/Alertas.jsx
import React, { useState, useEffect } from 'react';
import { Container, Alert, Table, Button, Badge } from 'react-bootstrap';
import api from '../../services/api';

function Alertas() {
  const [alertas, setAlertas] = useState([]);
  const [resumen, setResumen] = useState({});

  useEffect(() => {
    cargarAlertas();
    cargarResumen();
  }, []);

  const cargarAlertas = async () => {
    try {
      const response = await api.get('/alertas');
      setAlertas(response.data);
    } catch (error) {
      console.error('Error al cargar alertas:', error);
    }
  };

  const cargarResumen = async () => {
    try {
      const response = await api.get('/alertas/resumen');
      setResumen(response.data);
    } catch (error) {
      console.error('Error al cargar resumen:', error);
    }
  };

  const marcarVista = async (id) => {
    try {
      await api.put(`/alertas/${id}/vista`);
      cargarAlertas();
      cargarResumen();
    } catch (error) {
      console.error('Error al marcar alerta como vista:', error);
    }
  };

  const marcarResuelta = async (id) => {
    try {
      await api.put(`/alertas/${id}/resuelta`);
      cargarAlertas();
      cargarResumen();
    } catch (error) {
      console.error('Error al marcar alerta como resuelta:', error);
    }
  };

  const obtenerBadge = (tipo) => {
    switch(tipo) {
      case 'bajo_stock':
        return <Badge bg="warning">⚠️ Bajo Stock</Badge>;
      case 'sin_stock':
        return <Badge bg="danger">❌ Sin Stock</Badge>;
      case 'por_vencer':
        return <Badge bg="info">⏰ Por Vencer</Badge>;
      default:
        return <Badge bg="secondary">Desconocido</Badge>;
    }
  };

  return (
    <Container className="mt-4">
      <h2>⚠️ Centro de Alertas</h2>

      {/* Resumen de Alertas */}
      <div className="row mt-4 mb-4">
        <div className="col-md-3">
          <Alert variant="primary">
            <h5>{resumen.totalAlertas || 0}</h5>
            <p>Total de Alertas</p>
          </Alert>
        </div>
        <div className="col-md-3">
          <Alert variant="warning">
            <h5>{resumen.alertasNuevas || 0}</h5>
            <p>Alertas Nuevas</p>
          </Alert>
        </div>
        <div className="col-md-3">
          <Alert variant="danger">
            <h5>{resumen.sinStock || 0}</h5>
            <p>Sin Stock</p>
          </Alert>
        </div>
        <div className="col-md-3">
          <Alert variant="info">
            <h5>{resumen.porVencer || 0}</h5>
            <p>Por Vencer</p>
          </Alert>
        </div>
      </div>

      {/* Tabla de Alertas */}
      <h4 className="mt-4">Alertas Activas</h4>
      {alertas.length === 0 ? (
        <Alert variant="success">✅ No hay alertas activas</Alert>
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Producto</th>
              <th>Tipo</th>
              <th>Mensaje</th>
              <th>Estado</th>
              <th>Acciones</th>
            </tr>
          </thead>
          <tbody>
            {alertas.map(alerta => (
              <tr key={alerta.id}>
                <td>{alerta.producto?.nombre}</td>
                <td>{obtenerBadge(alerta.tipo_alerta)}</td>
                <td>{alerta.mensaje}</td>
                <td>
                  <Badge bg="warning">{alerta.estado}</Badge>
                </td>
                <td>
                  <Button 
                    variant="info" 
                    size="sm"
                    onClick={() => marcarVista(alerta.id)}
                    className="me-2"
                  >
                    👁️ Visto
                  </Button>
                  <Button 
                    variant="success" 
                    size="sm"
                    onClick={() => marcarResuelta(alerta.id)}
                  >
                    ✅ Resuelto
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
}

export default Alertas;