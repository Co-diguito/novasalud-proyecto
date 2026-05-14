// src/components/Ventas/ListaVentas.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Badge } from 'react-bootstrap';
import api from '../../services/api';

function ListaVentas() {
  const [ventas, setVentas] = useState([]);
  const [ventaSeleccionada, setVentaSeleccionada] = useState(null);
  const [showModal, setShowModal] = useState(false);

  useEffect(() => {
    cargarVentas();
  }, []);

  const cargarVentas = async () => {
    try {
      const response = await api.get('/ventas');
      setVentas(response.data);
    } catch (error) {
      console.error('Error al cargar ventas:', error);
    }
  };

  const verDetalles = (venta) => {
    setVentaSeleccionada(venta);
    setShowModal(true);
  };

  const anularVenta = async (id) => {
    if (window.confirm('¿Estás seguro de que deseas anular esta venta?')) {
      try {
        await api.put(`/ventas/${id}/anular`);
        alert('Venta anulada exitosamente');
        cargarVentas();
      } catch (error) {
        alert('Error al anular la venta');
      }
    }
  };

  const formatearFecha = (fecha) => {
    return new Date(fecha).toLocaleDateString('es-PE', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  return (
    <Container className="mt-4">
      <h2>📋 Historial de Ventas</h2>

      <Table striped bordered hover className="mt-4">
        <thead>
          <tr>
            <th>ID</th>
            <th>Cliente</th>
            <th>DNI</th>
            <th>Total</th>
            <th>Fecha</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {ventas.map(venta => (
            <tr key={venta.id}>
              <td>#{venta.id}</td>
              <td>{venta.cliente_nombre}</td>
              <td>{venta.cliente_dni || '-'}</td>
              <td>S/. {parseFloat(venta.total).toFixed(2)}</td>
              <td>{formatearFecha(venta.fecha)}</td>
              <td>
                <Badge bg={venta.estado === 'completada' ? 'success' : 'danger'}>
                  {venta.estado}
                </Badge>
              </td>
              <td>
                <Button 
                  variant="info" 
                  size="sm"
                  onClick={() => verDetalles(venta)}
                  className="me-2"
                >
                  👁️ Ver
                </Button>
                {venta.estado === 'completada' && (
                  <Button 
                    variant="danger" 
                    size="sm"
                    onClick={() => anularVenta(venta.id)}
                  >
                    ❌ Anular
                  </Button>
                )}
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      {/* Modal de Detalles */}
      <Modal show={showModal} onHide={() => setShowModal(false)} size="lg">
        <Modal.Header closeButton>
          <Modal.Title>Detalles de la Venta #{ventaSeleccionada?.id}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {ventaSeleccionada && (
            <>
              <h6>Información del Cliente</h6>
              <p>
                <strong>Nombre:</strong> {ventaSeleccionada.cliente_nombre}<br />
                <strong>DNI:</strong> {ventaSeleccionada.cliente_dni || '-'}<br />
                <strong>Teléfono:</strong> {ventaSeleccionada.cliente_telefono || '-'}
              </p>

              <h6 className="mt-3">Productos</h6>
              <Table striped bordered size="sm">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio</th>
                    <th>Subtotal</th>
                  </tr>
                </thead>
                <tbody>
                  {ventaSeleccionada.detalle_ventas?.map((detalle, idx) => (
                    <tr key={idx}>
                      <td>{detalle.producto?.nombre}</td>
                      <td>{detalle.cantidad}</td>
                      <td>S/. {parseFloat(detalle.precio_unitario).toFixed(2)}</td>
                      <td>S/. {parseFloat(detalle.subtotal).toFixed(2)}</td>
                    </tr>
                  ))}
                </tbody>
              </Table>

              <h5 className="text-end mt-3">
                Total: <span className="text-success">S/. {parseFloat(ventaSeleccionada.total).toFixed(2)}</span>
              </h5>
            </>
          )}
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default ListaVentas;