-- database/init.sql
CREATE DATABASE IF NOT EXISTS nova_salud;
USE nova_salud;

-- Tabla de usuario
CREATE TABLE usuario (
  id INT AUTO_INCREMENT PRIMARY KEY,
  username VARCHAR(50) UNIQUE NOT NULL,
  password VARCHAR(255) NOT NULL,
  nombre VARCHAR(100) NOT NULL,
  rol ENUM('admin', 'vendedor', 'encargado_inventario') NOT NULL,
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de categoría
CREATE TABLE categoria (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  descripcion TEXT,
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de producto
CREATE TABLE producto (
  id INT AUTO_INCREMENT PRIMARY KEY,
  codigo_barras VARCHAR(50) UNIQUE,
  nombre VARCHAR(200) NOT NULL,
  descripcion TEXT,
  categoria_id INT,
  precio_compra DECIMAL(10, 2),
  precio_venta DECIMAL(10, 2) NOT NULL,
  stock_actual INT DEFAULT 0,
  stock_minimo INT DEFAULT 5,
  lote VARCHAR(50),
  fecha_vencimiento DATE,
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (categoria_id) REFERENCES categoria(id)
);

-- Tabla de proveedor
CREATE TABLE proveedor (
  id INT AUTO_INCREMENT PRIMARY KEY,
  nombre VARCHAR(100) NOT NULL,
  contacto VARCHAR(100),
  telefono VARCHAR(20),
  email VARCHAR(100),
  direccion TEXT,
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
);

-- Tabla de compra
CREATE TABLE compra (
  id INT AUTO_INCREMENT PRIMARY KEY,
  proveedor_id INT,
  usuario_id INT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  estado ENUM('completada', 'pendiente', 'cancelada') DEFAULT 'completada',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (proveedor_id) REFERENCES proveedor(id),
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Tabla de detalle_compra
CREATE TABLE detalle_compra (
  id INT AUTO_INCREMENT PRIMARY KEY,
  compra_id INT,
  producto_id INT,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (compra_id) REFERENCES compra(id),
  FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Tabla de venta
CREATE TABLE venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  cliente_nombre VARCHAR(100),
  cliente_dni VARCHAR(20),
  cliente_telefono VARCHAR(20),
  usuario_id INT,
  fecha DATETIME DEFAULT CURRENT_TIMESTAMP,
  total DECIMAL(10, 2) NOT NULL,
  estado ENUM('completada', 'pendiente', 'cancelada') DEFAULT 'completada',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (usuario_id) REFERENCES usuario(id)
);

-- Tabla de detalle_venta
CREATE TABLE detalle_venta (
  id INT AUTO_INCREMENT PRIMARY KEY,
  venta_id INT,
  producto_id INT,
  cantidad INT NOT NULL,
  precio_unitario DECIMAL(10, 2) NOT NULL,
  subtotal DECIMAL(10, 2) NOT NULL,
  estado ENUM('activo', 'inactivo') DEFAULT 'activo',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (venta_id) REFERENCES venta(id),
  FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Tabla de alerta_stock
CREATE TABLE alerta_stock (
  id INT AUTO_INCREMENT PRIMARY KEY,
  producto_id INT,
  tipo_alerta ENUM('bajo_stock', 'sin_stock', 'por_vencer') NOT NULL,
  mensaje TEXT,
  estado ENUM('nueva', 'vista', 'resuelta') DEFAULT 'nueva',
  createdAt DATETIME DEFAULT CURRENT_TIMESTAMP,
  updatedAt DATETIME DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  FOREIGN KEY (producto_id) REFERENCES producto(id)
);

-- Datos iniciales
INSERT INTO usuario (username, password, nombre, rol) VALUES
('admin', '$2b$10$examplehashedpassword', 'Administrador', 'admin'),
('vendedor1', '$2b$10$examplehashedpassword', 'Vendedor 1', 'vendedor');

INSERT INTO categoria (nombre, descripcion) VALUES
('Medicamentos', 'Productos farmacéuticos para tratamiento de enfermedades'),
('Cuidado Personal', 'Productos de higiene y cuidado personal'),
('Equipos Médicos', 'Dispositivos y equipos para uso médico'),
('Vitaminas', 'Suplementos vitamínicos y nutricionales');