// src/components/Ventas/NuevaVenta.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Table, Button, Alert, Card } from 'react-bootstrap';
import api from '../../services/api';

function NuevaVenta() {
  const [cliente, setCliente] = useState({
    nombre: '',
    dni: '',
    telefono: ''
  });
  const [productos, setProductos] = useState([]);
  const [detalles, setDetalles] = useState([]);
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data.filter(p => p.estado === 'activo' && p.stock_actual > 0));
    } catch (error) {
      setMensaje('Error al cargar productos');
      setTipoMensaje('danger');
    }
  };

  const agregarProducto = () => {
    if (!productoSeleccionado || cantidad <= 0) {
      setMensaje('Selecciona un producto y una cantidad válida');
      setTipoMensaje('warning');
      return;
    }

    const producto = productos.find(p => p.id == productoSeleccionado);
    if (!producto) return;

    if (cantidad > producto.stock_actual) {
      setMensaje(`Stock insuficiente. Disponible: ${producto.stock_actual}`);
      setTipoMensaje('danger');
      return;
    }

    const detalleExistente = detalles.find(d => d.producto_id === producto.id);
    
    if (detalleExistente) {
      detalleExistente.cantidad += parseInt(cantidad);
      detalleExistente.subtotal = detalleExistente.cantidad * detalleExistente.precio_unitario;
    } else {
      detalles.push({
        producto_id: producto.id,
        nombre: producto.nombre,
        precio_unitario: parseFloat(producto.precio_venta),
        cantidad: parseInt(cantidad),
        subtotal: parseInt(cantidad) * parseFloat(producto.precio_venta)
      });
    }

    setDetalles([...detalles]);
    setProductoSeleccionado('');
    setCantidad(1);
    setMensaje('Producto agregado a la venta');
    setTipoMensaje('success');
  };

  const eliminarProducto = (index) => {
    detalles.splice(index, 1);
    setDetalles([...detalles]);
  };

  const calcularTotal = () => {
    return detalles.reduce((total, detalle) => total + detalle.subtotal, 0).toFixed(2);
  };

  const registrarVenta = async () => {
    if (!cliente.nombre || detalles.length === 0) {
      setMensaje('Completa los datos del cliente y agrega productos');
      setTipoMensaje('warning');
      return;
    }

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      await api.post('/ventas', {
        cliente_nombre: cliente.nombre,
        cliente_dni: cliente.dni,
        cliente_telefono: cliente.telefono,
        usuario_id: usuario.id,
        detalles: detalles
      });

      setMensaje('¡Venta registrada exitosamente!');
      setTipoMensaje('success');
      
      // Limpiar formulario
      setCliente({ nombre: '', dni: '', telefono: '' });
      setDetalles([]);
      
      setTimeout(() => {
        window.location.href = '/ventas';
      }, 2000);
    } catch (error) {
      setMensaje('Error al registrar la venta: ' + error.response?.data?.mensaje);
      setTipoMensaje('danger');
    }
  };

  return (
    <Container className="mt-4">
      <h2>💳 Nueva Venta</h2>

      {mensaje && <Alert variant={tipoMensaje}>{mensaje}</Alert>}

      <div className="row">
        {/* Datos del Cliente */}
        <div className="col-md-4">
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Datos del Cliente</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Nombre del Cliente *</Form.Label>
                <Form.Control
                  type="text"
                  value={cliente.nombre}
                  onChange={(e) => setCliente({...cliente, nombre: e.target.value})}
                  placeholder="Ingresa el nombre"
                  required
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>DNI</Form.Label>
                <Form.Control
                  type="text"
                  value={cliente.dni}
                  onChange={(e) => setCliente({...cliente, dni: e.target.value})}
                  placeholder="Ingresa el DNI"
                />
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Teléfono</Form.Label>
                <Form.Control
                  type="tel"
                  value={cliente.telefono}
                  onChange={(e) => setCliente({...cliente, telefono: e.target.value})}
                  placeholder="Ingresa el teléfono"
                />
              </Form.Group>
            </Card.Body>
          </Card>
        </div>

        {/* Selección de Productos */}
        <div className="col-md-8">
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Agregar Productos</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Selecciona un Producto</Form.Label>
                <Form.Select
                  value={productoSeleccionado}
                  onChange={(e) => setProductoSeleccionado(e.target.value)}
                >
                  <option value="">-- Selecciona un producto --</option>
                  {productos.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre} - S/. {p.precio_venta} (Stock: {p.stock_actual})
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <Form.Group className="mb-3">
                <Form.Label>Cantidad</Form.Label>
                <Form.Control
                  type="number"
                  min="1"
                  value={cantidad}
                  onChange={(e) => setCantidad(e.target.value)}
                />
              </Form.Group>

              <Button 
                variant="primary" 
                onClick={agregarProducto}
                className="w-100"
              >
                ➕ Agregar Producto
              </Button>
            </Card.Body>
          </Card>

          {/* Tabla de Detalles */}
          <Card>
            <Card.Header>
              <Card.Title>Productos en la Venta</Card.Title>
            </Card.Header>
            <Card.Body>
              {detalles.length === 0 ? (
                <p className="text-muted">No hay productos agregados</p>
              ) : (
                <>
                  <Table striped bordered hover>
                    <thead>
                      <tr>
                        <th>Producto</th>
                        <th>Cantidad</th>
                        <th>Precio Unit.</th>
                        <th>Subtotal</th>
                        <th>Acción</th>
                      </tr>
                    </thead>
                    <tbody>
                      {detalles.map((detalle, index) => (
                        <tr key={index}>
                          <td>{detalle.nombre}</td>
                          <td>{detalle.cantidad}</td>
                          <td>S/. {detalle.precio_unitario.toFixed(2)}</td>
                          <td>S/. {detalle.subtotal.toFixed(2)}</td>
                          <td>
                            <Button 
                              variant="danger" 
                              size="sm"
                              onClick={() => eliminarProducto(index)}
                            >
                              🗑️
                            </Button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </Table>

                  <div className="text-end mt-3">
                    <h5>Total: <span className="text-success">S/. {calcularTotal()}</span></h5>
                  </div>

                  <Button 
                    variant="success" 
                    size="lg"
                    onClick={registrarVenta}
                    className="w-100 mt-3"
                  >
                    ✅ Registrar Venta
                  </Button>
                </>
              )}
            </Card.Body>
          </Card>
        </div>
      </div>
    </Container>
  );
}

export default NuevaVenta;