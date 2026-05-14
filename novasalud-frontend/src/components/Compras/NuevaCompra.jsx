// src/components/Compras/NuevaCompra.jsx
import React, { useState, useEffect } from 'react';
import { Container, Form, Table, Button, Alert, Card } from 'react-bootstrap';
import api from '../../services/api';

function NuevaCompra() {
  const [proveedores, setProveedores] = useState([]);
  const [productos, setProductos] = useState([]);
  const [proveedor, setProveedor] = useState('');
  const [productoSeleccionado, setProductoSeleccionado] = useState('');
  const [cantidad, setCantidad] = useState(1);
  const [precioUnitario, setPrecioUnitario] = useState('');
  const [detalles, setDetalles] = useState([]);
  const [mensaje, setMensaje] = useState('');
  const [tipoMensaje, setTipoMensaje] = useState('info');

  useEffect(() => {
    cargarProveedores();
    cargarProductos();
  }, []);

  const cargarProveedores = async () => {
    try {
      const response = await api.get('/proveedores');
      setProveedores(response.data);
    } catch (error) {
      console.error('Error al cargar proveedores:', error);
    }
  };

  const cargarProductos = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error al cargar productos:', error);
    }
  };

  const agregarProducto = () => {
    if (!productoSeleccionado || cantidad <= 0 || !precioUnitario) {
      setMensaje('Completa todos los campos');
      setTipoMensaje('warning');
      return;
    }

    const producto = productos.find(p => p.id == productoSeleccionado);
    if (!producto) return;

    const detalleExistente = detalles.find(d => d.producto_id === producto.id);
    
    if (detalleExistente) {
      detalleExistente.cantidad += parseInt(cantidad);
      detalleExistente.subtotal = detalleExistente.cantidad * parseFloat(precioUnitario);
    } else {
      detalles.push({
        producto_id: producto.id,
        nombre: producto.nombre,
        precio_unitario: parseFloat(precioUnitario),
        cantidad: parseInt(cantidad),
        subtotal: parseInt(cantidad) * parseFloat(precioUnitario)
      });
    }

    setDetalles([...detalles]);
    setProductoSeleccionado('');
    setCantidad(1);
    setPrecioUnitario('');
    setMensaje('Producto agregado');
    setTipoMensaje('success');
  };

  const eliminarProducto = (index) => {
    detalles.splice(index, 1);
    setDetalles([...detalles]);
  };

  const calcularTotal = () => {
    return detalles.reduce((total, detalle) => total + detalle.subtotal, 0).toFixed(2);
  };

  const registrarCompra = async () => {
    if (!proveedor || detalles.length === 0) {
      setMensaje('Selecciona un proveedor y agrega productos');
      setTipoMensaje('warning');
      return;
    }

    try {
      const usuario = JSON.parse(localStorage.getItem('usuario'));
      await api.post('/compras', {
        proveedor_id: parseInt(proveedor),
        usuario_id: usuario.id,
        detalles: detalles
      });

      setMensaje('¡Compra registrada exitosamente!');
      setTipoMensaje('success');
      
      setProveedor('');
      setDetalles([]);
      
      setTimeout(() => {
        window.location.href = '/compras';
      }, 2000);
    } catch (error) {
      setMensaje('Error al registrar la compra: ' + error.response?.data?.mensaje);
      setTipoMensaje('danger');
    }
  };

  return (
    <Container className="mt-4">
      <h2>📦 Nueva Compra</h2>

      {mensaje && <Alert variant={tipoMensaje}>{mensaje}</Alert>}

      <div className="row">
        {/* Selección de Proveedor */}
        <div className="col-md-4">
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Proveedor</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group>
                <Form.Label>Selecciona Proveedor *</Form.Label>
                <Form.Select
                  value={proveedor}
                  onChange={(e) => setProveedor(e.target.value)}
                >
                  <option value="">-- Selecciona --</option>
                  {proveedores.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>
            </Card.Body>
          </Card>
        </div>

        {/* Agregar Productos */}
        <div className="col-md-8">
          <Card className="mb-4">
            <Card.Header>
              <Card.Title>Agregar Productos</Card.Title>
            </Card.Header>
            <Card.Body>
              <Form.Group className="mb-3">
                <Form.Label>Producto</Form.Label>
                <Form.Select
                  value={productoSeleccionado}
                  onChange={(e) => setProductoSeleccionado(e.target.value)}
                >
                  <option value="">-- Selecciona --</option>
                  {productos.map(p => (
                    <option key={p.id} value={p.id}>
                      {p.nombre}
                    </option>
                  ))}
                </Form.Select>
              </Form.Group>

              <div className="row">
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Cantidad</Form.Label>
                    <Form.Control
                      type="number"
                      min="1"
                      value={cantidad}
                      onChange={(e) => setCantidad(e.target.value)}
                    />
                  </Form.Group>
                </div>
                <div className="col-md-6">
                  <Form.Group className="mb-3">
                    <Form.Label>Precio Unitario</Form.Label>
                    <Form.Control
                      type="number"
                      step="0.01"
                      value={precioUnitario}
                      onChange={(e) => setPrecioUnitario(e.target.value)}
                      placeholder="0.00"
                    />
                  </Form.Group>
                </div>
              </div>

              <Button 
                variant="primary" 
                onClick={agregarProducto}
                className="w-100"
              >
                ➕ Agregar
              </Button>
            </Card.Body>
          </Card>

          {/* Tabla de Detalles */}
          <Card>
            <Card.Header>
              <Card.Title>Productos en la Compra</Card.Title>
            </Card.Header>
            <Card.Body>
              {detalles.length === 0 ? (
                <p className="text-muted">Sin productos agregados</p>
              ) : (
                <>
                  <Table striped bordered hover size="sm">
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
                    onClick={registrarCompra}
                    className="w-100 mt-3"
                  >
                    ✅ Registrar Compra
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

export default NuevaCompra;