// src/components/Productos/ListaProductos.jsx
import React, { useState, useEffect } from 'react';
import { Container, Table, Button, Modal, Form, Alert } from 'react-bootstrap';
import api from '../../services/api';

function ListaProductos() {
  const [productos, setProductos] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [nuevoProducto, setNuevoProducto] = useState({
    nombre: '',
    descripcion: '',
    categoria_id: '',
    precio_venta: '',
    stock_minimo: 5
  });
  const [mensaje, setMensaje] = useState('');

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (error) {
      setMensaje('Error al cargar productos');
    }
  };

  const handleAgregar = async () => {
    try {
      await api.post('/productos', nuevoProducto);
      setMensaje('Producto agregado exitosamente');
      setShowModal(false);
      setNuevoProducto({
        nombre: '',
        descripcion: '',
        categoria_id: '',
        precio_venta: '',
        stock_minimo: 5
      });
      cargarProductos();
    } catch (error) {
      setMensaje('Error al agregar producto');
    }
  };

  return (
    <Container className="mt-4">
      <h2>📦 Gestión de Productos</h2>

      {mensaje && <Alert variant="info">{mensaje}</Alert>}

      <Button 
        variant="primary" 
        className="mb-3"
        onClick={() => setShowModal(true)}
      >
        ➕ Nuevo Producto
      </Button>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Nombre</th>
            <th>Precio</th>
            <th>Stock</th>
            <th>Estado</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {productos.map(producto => (
            <tr key={producto.id}>
              <td>{producto.id}</td>
              <td>{producto.nombre}</td>
              <td>S/. {producto.precio_venta}</td>
              <td>
                <span className={producto.stock_actual <= producto.stock_minimo ? 'text-danger' : 'text-success'}>
                  {producto.stock_actual}
                </span>
              </td>
              <td>{producto.estado}</td>
              <td>
                <Button variant="warning" size="sm" className="me-2">Editar</Button>
                <Button variant="danger" size="sm">Eliminar</Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Nuevo Producto</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Nombre</Form.Label>
              <Form.Control
                value={nuevoProducto.nombre}
                onChange={(e) => setNuevoProducto({...nuevoProducto, nombre: e.target.value})}
                placeholder="Ingrese nombre del producto"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Descripción</Form.Label>
              <Form.Control
                as="textarea"
                value={nuevoProducto.descripcion}
                onChange={(e) => setNuevoProducto({...nuevoProducto, descripcion: e.target.value})}
                placeholder="Descripción del producto"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Precio de Venta</Form.Label>
              <Form.Control
                type="number"
                value={nuevoProducto.precio_venta}
                onChange={(e) => setNuevoProducto({...nuevoProducto, precio_venta: e.target.value})}
                placeholder="0.00"
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Stock Mínimo</Form.Label>
              <Form.Control
                type="number"
                value={nuevoProducto.stock_minimo}
                onChange={(e) => setNuevoProducto({...nuevoProducto, stock_minimo: e.target.value})}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Cancelar
          </Button>
          <Button variant="primary" onClick={handleAgregar}>
            Guardar
          </Button>
        </Modal.Footer>
      </Modal>
    </Container>
  );
}

export default ListaProductos;