# 🏥 Nova Salud - Sistema de Gestión de Inventarios y Ventas para una Botica

Sistema web completo para gestionar inventario, ventas y atención al cliente en farmacias. Desarrollado con **React**, **Node.js**, **Express** y **MySQL**.

## 📋 Tabla de Contenidos

- [Descripción General](#descripción-general)
- [Backend](#backend)
- [Frontend](#frontend)
- [Instalación](#instalación)
- [Uso](#uso)
- [Estructura del Proyecto](#estructura-del-proyecto)
- [Endpoints API](#endpoints-api)
- [Flujo de Datos](#flujo-de-datos)
- [Solución de Problemas](#solución-de-problemas)

---

## 📖 Descripción General

**Nova Salud** es una solución integral para farmacias que necesitan:

✅ Gestionar inventario en tiempo real  
✅ Registrar ventas con detalles de productos  
✅ Controlar compras a proveedores  
✅ Recibir alertas automáticas de bajo stock  
✅ Acceder desde cualquier dispositivo web  
✅ Mantener seguridad de datos con autenticación JWT  

### Características Principales

- **Autenticación segura** con JWT
- **Control de roles** (Admin, Vendedor, Encargado de Inventario)
- **Eliminación lógica** en todas las tablas
- **Alertas automáticas** de bajo stock y vencimiento
- **Transacciones en BD** para integridad de datos
- **Interfaz responsive** adaptable a cualquier dispositivo

---

# 🔧 BACKEND

## Descripción General del Backend

El backend es una **API REST** construida con Node.js y Express que maneja toda la lógica de negocio, autenticación y acceso a datos.

### Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL2** - Driver de MySQL
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **dotenv** - Variables de entorno

---

# 🔧 BACKEND

## Descripción General del Backend

El backend es una **API REST** construida con Node.js y Express que maneja toda la lógica de negocio, autenticación y acceso a datos.

### Tecnologías Utilizadas

- **Node.js** - Runtime de JavaScript
- **Express** - Framework web
- **Sequelize** - ORM para MySQL
- **MySQL2** - Driver de MySQL
- **JWT** - Autenticación
- **bcryptjs** - Encriptación de contraseñas
- **dotenv** - Variables de entorno

---

## 📁 Estructura del Backend

```
novasalud-api/
│
├── 📄 index.js                 # Archivo principal del servidor
├── 📄 package.json             # Dependencias del proyecto
├── 📄 .env                     # Variables de entorno
├── 📄 .gitignore               # Archivos ignorados en Git
│
├── 📁 config/
│   └── db.js             # Configuración de Sequelize y MySQL
│
├── 📁 database/
│   └── init.sql                # Script de creación de BD
│
├── 📁 models/                  # Modelos de Sequelize
│   ├── usuario.js              # Modelo de Usuario
│   ├── categoria.js            # Modelo de Categoría
│   ├── producto.js             # Modelo de Producto
│   ├── proveedor.js            # Modelo de Proveedor
│   ├── compra.js               # Modelo de Compra
│   ├── detalleCompra.js        # Modelo de Detalle de Compra
│   ├── venta.js                # Modelo de Venta
│   ├── detalleVenta.js         # Modelo de Detalle de Venta
│   └── alertaStock.js          # Modelo de Alerta de Stock
│
├── 📁 controllers/             # Lógica de negocio
│   ├── usuarioController.js    # Manejo de usuarios
│   ├── productoController.js   # Manejo de productos
│   ├── ventaController.js      # Manejo de ventas
│   ├── compraController.js     # Manejo de compras
│   ├── categoriaController.js  # Manejo de categorías
│   ├── proveedorController.js  # Manejo de proveedores
│   └── alertaController.js     # Manejo de alertas
│
├── 📁 routes/                  # Definición de rutas
│   ├── usuarios.js             # Rutas de usuarios
│   ├── productos.js            # Rutas de productos
│   ├── ventas.js               # Rutas de ventas
│   ├── compras.js              # Rutas de compras
│   ├── categorias.js           # Rutas de categorías
│   ├── proveedores.js          # Rutas de proveedores
│   └── alertas.js              # Rutas de alertas
│
└── 📁 middleware/              # Funciones intermedias
    ├── autenticacion.js        # Validación de JWT
    └── validacion.js           # Validación de datos
```

---

## 📝 Descripción de Carpetas y Archivos del Backend

### **config/db.js**

Configura la conexión con MySQL usando Sequelize.

```javascript
// Carga variables del .env
// Crea instancia de Sequelize
// Define opciones de conexión
```

**Uso:** Se importa en todos los modelos para conectar con la BD.

### **database/init.sql**

Script SQL que:
- Crea la base de datos `farma_plus`
- Crea todas las tablas con relaciones
- Inserta datos iniciales (usuarios, categorías)

**Uso:** Ejecutar una sola vez al instalar el proyecto.

### **models/**

Cada archivo define un modelo de Sequelize que representa una tabla en la BD.

**Ejemplo - producto.js:**
```javascript
// Define campos de la tabla producto
// Establece validaciones
// Define relaciones con otras tablas
```

### **controllers/**

Contienen la lógica de negocio. Cada controlador tiene funciones como:
- `crear()` - Crear registros
- `obtenerTodos()` - Listar registros
- `obtenerPorId()` - Obtener un registro específico
- `actualizar()` - Modificar registros
- `eliminar()` - Eliminar lógicamente

**Ejemplo - ventaController.js:**
```javascript
// crear() - Registra venta y actualiza stock
// obtenerTodos() - Lista todas las ventas
// anular() - Cancela venta y restaura stock
```

### **routes/**

Define los endpoints (URLs) de la API.

**Ejemplo - ventas.js:**
```javascript
router.post('/', autenticacion, crear_venta)      // POST /api/ventas
router.get('/', autenticacion, listar_ventas)     // GET /api/ventas
router.get('/:id', autenticacion, obtener_venta)  // GET /api/ventas/1
```

### **middleware/**

Funciones que se ejecutan antes de los controladores.

**autenticacion.js:**
- Verifica que el token JWT sea válido
- Extrae datos del usuario
- Valida permisos según rol

**validacion.js:**
- Valida que los datos del formulario sean correctos
- Verifica campos obligatorios
- Valida tipos de datos

---

## 🔌 Conexión a los Endpoints

### Flujo de una Petición HTTP

```
Cliente (React)
    ↓
[Petición HTTP: GET /api/productos]
    ↓
Express (index.js)
    ↓
Middleware de Autenticación
    ↓ (Si token es válido)
Route (routes/productos.js)
    ↓
Controller (productoController.js)
    ↓
Model (producto.js)
    ↓
Base de Datos (MySQL)
    ↓
Response JSON
    ↓
Cliente (React) recibe datos
```

### Ejemplo Real: Crear un Producto

**1. Frontend envía petición:**
```javascript
// src/components/Productos/ListaProductos.jsx
await api.post('/productos', {
  nombre: 'Paracetamol',
  precio_venta: 5.00,
  categoria_id: 1
});
```

**2. Llega a la ruta:**
```javascript
// routes/productos.js
router.post('/', autenticacion, validarProducto, productoController.crear);
```

**3. Se ejecuta el controlador:**
```javascript
// controllers/productoController.js
exports.crear = async (req, res) => {
  const { nombre, precio_venta } = req.body;
  const nuevoProducto = await Producto.create({...});
  res.status(201).json({ producto: nuevoProducto });
};
```

**4. El modelo interactúa con BD:**
```javascript
// models/producto.js
const nuevoProducto = await Producto.create({
  nombre: 'Paracetamol',
  precio_venta: 5.00,
  categoria_id: 1
});
```

**5. BD retorna el registro creado**

**6. Frontend recibe respuesta y actualiza interfaz**

---

## 🔄 Flujo de Datos del Backend

### Flujo de Venta (Ejemplo Completo)

```
┌─────────────────────────────────────────────────────┐
│ 1. USUARIO INICIA SESIÓN                            │
├─────────────────────────────────────────────────────┤
│ POST /api/usuarios/login                            │
│ {username: "vendedor1", password: "123456"}         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 2. BACKEND VERIFICA CREDENCIALES                    │
├─────────────────────────────────────────────────────┤
│ - Busca usuario en BD                               │
│ - Compara contraseña encriptada                     │
│ - Genera JWT token                                  │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 3. RESPUESTA: JWT TOKEN                             │
├─────────────────────────────────────────────────────┤
│ {                                                   │
│   "token": "eyJhbGc...",                            │
│   "usuario": {"id": 1, "rol": "vendedor"}          │
│ }                                                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 4. FRONTEND ALMACENA TOKEN EN localStorage          │
├─────────────────────────────────────────────────────┤
│ localStorage.setItem('token', token)                │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 5. USUARIO CREA NUEVA VENTA                         │
├─────────────────────────────────────────────────────┤
│ POST /api/ventas                                    │
│ Header: Authorization: Bearer {token}              │
│ Body: {cliente_nombre, detalles: [...]}            │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 6. MIDDLEWARE VALIDA TOKEN                          │
├─────────────────────────────────────────────────────┤
│ - Extrae token del header                           │
│ - Verifica firma JWT                                │
│ - Obtiene datos del usuario                         │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 7. CONTROLLER PROCESA LA VENTA                      │
├─────────────────────────────────────────────────────┤
│ - Valida stock de productos                         │
│ - Inicia transacción en BD                          │
│ - Crea registro de venta                            │
│ - Crea detalles de venta                            │
│ - Actualiza stock de productos                      │
│ - Genera alertas si stock bajo                      │
│ - Confirma transacción                              │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 8. RESPUESTA EXITOSA                                │
├─────────────────────────────────────────────────────┤
│ {                                                   │
│   "mensaje": "Venta registrada",                    │
│   "venta": {id: 5, total: 150.00, ...}             │
│ }                                                   │
└─────────────────────────────────────────────────────┘
                        ↓
┌─────────────────────────────────────────────────────┐
│ 9. FRONTEND ACTUALIZA INTERFAZ                      │
├─────────────────────────────────────────────────────┤
│ - Muestra mensaje de éxito                          │
│ - Limpia formulario                                 │
│ - Redirige a historial de ventas                    │
└─────────────────────────────────────────────────────┘
```

---

# ⚛️ FRONTEND

## Descripción General del Frontend

El frontend es una aplicación **React** que proporciona la interfaz de usuario para interactuar con el backend.

### Tecnologías Utilizadas

- **React** - Librería de UI
- **React Router** - Navegación entre páginas
- **Bootstrap** - Estilos CSS
- **React Bootstrap** - Componentes Bootstrap en React
- **Axios** - Cliente HTTP para peticiones
- **JWT Decode** - Decodificar tokens JWT

---

## 📁 Estructura del Frontend

```
novasalud-frontend/
│
├── 📄 package.json             # Dependencias del proyecto
├── 📄 .env                     # Variables de entorno
├── 📄 .gitignore               # Archivos ignorados en Git
│
├── 📁 public/
│   ├── index.html              # HTML principal
│   └── favicon.ico             # Icono de la app
│
├── 📁 src/
│   ├── 📄 index.js             # Punto de entrada
│   ├── 📄 App.jsx              # Componente raíz
│   ├── 📄 App.css              # Estilos globales
│   │
│   ├── 📁 components/          # Componentes reutilizables
│   │   ├── Login.jsx           # Página de login
│   │   ├── Navbar.jsx          # Barra de navegación
│   │   ├── Dashboard.jsx       # Panel principal
│   │   │
│   │   ├── 📁 Productos/
│   │   │   └── ListaProductos.jsx
│   │   │
│   │   ├── 📁 Ventas/
│   │   │   ├── NuevaVenta.jsx
│   │   │   └── ListaVentas.jsx
│   │   │
│   │   ├── 📁 Compras/
│   │   │   └── NuevaCompra.jsx
│   │   │
│   │   └── 📁 Alertas/
│   │       └── Alertas.jsx
│   │
│   └── 📁 services/            # Servicios de API
│       └── api.js              # Cliente HTTP configurado
```

---

## 📝 Descripción de Carpetas y Archivos del Frontend

### **public/index.html**

Archivo HTML principal donde se monta la aplicación React.

```html
<!DOCTYPE html>
<html>
  <head>
    <title>Nova Salud</title>
  </head>
  <body>
    <div id="root"></div>  <!-- React se renderiza aquí -->
  </body>
</html>
```

### **src/index.js**

Punto de entrada de React. Renderiza el componente `App` en el DOM.

```javascript
import App from './App';
ReactDOM.createRoot(document.getElementById('root')).render(<App />);
```

### **src/App.jsx**

Componente raíz que define todas las rutas de la aplicación.

```javascript
// Define rutas protegidas
// Maneja redirecciones
// Estructura general de la app
```

### **src/services/api.js**

Cliente HTTP configurado para hacer peticiones al backend.

```javascript
// Crea instancia de Axios
// Agrega interceptores para token JWT
// Maneja errores globales
```

**Uso en componentes:**
```javascript
import api from '../services/api';

const response = await api.get('/productos');
```

### **src/components/**

Cada componente es una página o sección de la aplicación.

**Login.jsx** - Página de inicio de sesión
- Formulario de usuario y contraseña
- Validación de credenciales
- Almacena token en localStorage

**Navbar.jsx** - Barra de navegación superior
- Menú de navegación
- Información del usuario
- Botón de cerrar sesión

**Dashboard.jsx** - Panel de control
- Estadísticas del sistema
- Accesos rápidos
- Resumen de alertas

**Productos/ListaProductos.jsx** - Gestión de productos
- Lista de productos
- Crear nuevo producto
- Editar producto
- Eliminar producto

**Ventas/NuevaVenta.jsx** - Registrar nueva venta
- Datos del cliente
- Seleccionar productos
- Agregar cantidades
- Calcular total
- Registrar venta

**Ventas/ListaVentas.jsx** - Historial de ventas
- Lista de todas las ventas
- Ver detalles de venta
- Anular venta

**Compras/NuevaCompra.jsx** - Registrar nueva compra
- Seleccionar proveedor
- Agregar productos
- Establecer precios
- Registrar compra

**Alertas/Alertas.jsx** - Centro de alertas
- Resumen de alertas
- Listar alertas activas
- Marcar como visto/resuelto

---

## 🔌 Conexión a los Endpoints

### Flujo de una Petición desde Frontend

```
Usuario interactúa con componente React
    ↓
Componente llama a api.js
    ↓
api.js agrega token JWT al header
    ↓
Axios envía petición HTTP al backend
    ↓
Backend procesa petición
    ↓
Backend retorna respuesta JSON
    ↓
Componente recibe datos
    ↓
Componente actualiza estado (useState)
    ↓
React re-renderiza interfaz
    ↓
Usuario ve cambios
```

### Ejemplo Real: Listar Productos

**Componente (ListaProductos.jsx):**
```jsx
function ListaProductos() {
  const [productos, setProductos] = useState([]);

  useEffect(() => {
    cargarProductos();
  }, []);

  const cargarProductos = async () => {
    try {
      const response = await api.get('/productos');
      setProductos(response.data);
    } catch (error) {
      console.error('Error:', error);
    }
  };

  return (
    <table>
      {productos.map(p => (
        <tr key={p.id}>
          <td>{p.nombre}</td>
          <td>{p.precio_venta}</td>
        </tr>
      ))}
    </table>
  );
}
```

**Servicio (api.js):**
```javascript
const api = axios.create({
  baseURL: 'http://localhost:4000/api'
});

// Interceptor para agregar token
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});
```

**Backend recibe:**
```
GET /api/productos
Header: Authorization: Bearer eyJhbGc...
```

---

## 🔄 Flujo de Datos del Frontend

### Flujo Completo: Crear una Venta

```
┌──────────────────────────────────────────┐
│ 1. USUARIO HACE CLIC EN "NUEVA VENTA"    │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 2. REACT NAVEGA A /ventas/nueva          │
│    (NuevaVenta.jsx se renderiza)         │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 3. useEffect() CARGA PRODUCTOS           │
│    await api.get('/productos')           │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 4. BACKEND RETORNA LISTA DE PRODUCTOS   │
│    [{id: 1, nombre: "Paracetamol", ...}]│
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 5. COMPONENTE ACTUALIZA ESTADO           │
│    setProductos(response.data)           │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 6. INTERFAZ SE RENDERIZA                 │
│    - Formulario de cliente               │
│    - Dropdown de productos               │
│    - Tabla de detalles                   │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 7. USUARIO INGRESA DATOS DEL CLIENTE     │
│    - Nombre: "Juan Pérez"                │
│    - DNI: "12345678"                     │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 8. USUARIO SELECCIONA PRODUCTOS          │
│    - Selecciona Paracetamol              │
│    - Ingresa cantidad: 2                 │
│    - Hace clic en "Agregar"              │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 9. COMPONENTE ACTUALIZA DETALLES         │
│    setDetalles([...detalles, nuevo])     │
│    Calcula subtotal: 2 × 5.00 = 10.00   │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 10. TABLA DE DETALLES SE RE-RENDERIZA   │
│     Muestra producto agregado            │
│     Muestra total actualizado            │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 11. USUARIO HACE CLIC EN "REGISTRAR"    │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 12. COMPONENTE VALIDA DATOS              │
│     - Cliente no vacío ✓                 │
│     - Detalles no vacío ✓                │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 13. ENVÍA PETICIÓN AL BACKEND            │
│     POST /api/ventas                     │
│     Body: {cliente_nombre, detalles}     │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 14. BACKEND PROCESA                      │
│     - Valida stock                       │
│     - Crea venta                         │
│     - Crea detalles                      │
│     - Actualiza stock                    │
│     - Genera alertas                     │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 15. BACKEND RETORNA RESPUESTA            │
│     {mensaje: "Venta registrada", ...}   │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 16. COMPONENTE MUESTRA MENSAJE           │
│     <Alert>Venta registrada</Alert>      │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 17. COMPONENTE SE LIMPIA                 │
│     - Limpia formulario                  │
│     - Limpia detalles                    │
└──────────────────────────────────────────┘
                    ↓
┌──────────────────────────────────────────┐
│ 18. REDIRIGE A HISTORIAL DE VENTAS       │
│     navigate('/ventas')                  │
└──────────────────────────────────────────┘
```

---

# 🚀 INSTALACIÓN

## Requisitos Previos

- **Node.js** v14+ (Descargar desde https://nodejs.org/)
- **MySQL** 5.7+ (Descargar desde https://www.mysql.com/)
- **Git** (Descargar desde https://git-scm.com/)
- **Editor de código** (VS Code recomendado)

## Pasos de Instalación

### 1. Clonar o Descargar el Proyecto

```bash
# Opción A: Clonar desde Git
git clone https://github.com/Co-diguito/novasalud-proyecto.git
cd novasalud-proyecto

# Opción B: Descargar ZIP y extraer
# Luego abrir la carpeta en terminal
```

### 2. Instalar Backend

```bash
cd novasalud-api
npm install
```

### 3. Configurar Variables de Entorno del Backend

Crear archivo `.env`:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=nova_salud
DB_PORT=3306
PORT=4000
NODE_ENV=development
JWT_SECRET=nova_salud_2024_clave_super_segura_min_32_caracteres
```

### 4. Crear Base de Datos

```bash
# Opción A: Desde terminal
mysql -u root -p < database/init.sql

# Opción B: Desde MySQL Workbench
# Abrir archivo database/init.sql y ejecutar
```

### 5. Instalar Frontend

```bash
# En otra terminal
cd novasalud-frontend
npm install
```

### 6. Configurar Variables de Entorno del Frontend

Crear archivo `.env`:

```env
REACT_APP_API_URL=http://localhost:4000/api
```

---

# 📱 USO

## Iniciar la Aplicación

### Terminal 1: Backend

```bash
cd novasalud-api
npm run dev
```

Deberías ver:
```
Base de datos sincronizada
Servidor ejecutándose en puerto 4000
http://localhost:4000
```

### Terminal 2: Frontend

```bash
cd novasalud-frontend
npm start
```

Se abrirá automáticamente en `http://localhost:3000`

## Login Inicial

**Usuario:** `admin`  
**Contraseña:** `admin123`

---

# 🗂️ ESTRUCTURA DEL PROYECTO

## Árbol Completo

```
novasalud-proyecto/
│
├── 📁 novasalud-api/
│   ├── 📁 config/
│   ├── 📁 controllers/
│   ├── 📁 database/
│   ├── 📁 middleware/
│   ├── 📁 models/
│   ├── 📁 routes/
│   ├── 📄 index.js
│   ├── 📄 package.json
│   ├── 📄 .env
│   └── 📄 .gitignore
│
├── 📁 novasalud-frontend/
│   ├── 📁 public/
│   ├── 📁 src/
│   │   ├── 📁 components/
│   │   ├── 📁 services/
│   │   ├── 📄 App.jsx
│   │   ├── 📄 App.css
│   │   └── 📄 index.js
│   ├── 📄 package.json
│   ├── 📄 .env
│   └── 📄 .gitignore
│
└── 📄 README.md
```

---

# 🔌 ENDPOINTS API

## Autenticación

| Método | Endpoint | Descripción |
|--------|----------|-------------|
| POST | `/api/usuarios/login` | Iniciar sesión |
| POST | `/api/usuarios/registro` | Registrar usuario |

## Usuarios

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/api/usuarios` | Listar usuarios | Admin |
| GET | `/api/usuarios/:id` | Obtener usuario | Autenticado |
| PUT | `/api/usuarios/:id` | Actualizar usuario | Admin |
| DELETE | `/api/usuarios/:id` | Eliminar usuario | Admin |

## Productos

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | `/api/productos` | Crear producto | Admin/Encargado |
| GET | `/api/productos` | Listar productos | Autenticado |
| GET | `/api/productos/:id` | Obtener producto | Autenticado |
| GET | `/api/productos/bajo-stock` | Productos bajo stock | Autenticado |
| PUT | `/api/productos/:id` | Actualizar producto | Admin/Encargado |
| DELETE | `/api/productos/:id` | Eliminar producto | Admin |

## Ventas

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | `/api/ventas` | Crear venta | Vendedor |
| GET | `/api/ventas` | Listar ventas | Autenticado |
| GET | `/api/ventas/:id` | Obtener venta | Autenticado |
| GET | `/api/ventas/fecha` | Ventas por fecha | Autenticado |
| PUT | `/api/ventas/:id/anular` | Anular venta | Admin/Vendedor |

## Compras

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | `/api/compras` | Crear compra | Encargado |
| GET | `/api/compras` | Listar compras | Autenticado |
| GET | `/api/compras/:id` | Obtener compra | Autenticado |
| PUT | `/api/compras/:id/anular` | Anular compra | Admin |

## Categorías

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | `/api/categorias` | Crear categoría | Admin |
| GET | `/api/categorias` | Listar categorías | Autenticado |
| GET | `/api/categorias/:id` | Obtener categoría | Autenticado |
| PUT | `/api/categorias/:id` | Actualizar categoría | Admin |
| DELETE | `/api/categorias/:id` | Eliminar categoría | Admin |

## Proveedores

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| POST | `/api/proveedores` | Crear proveedor | Admin/Encargado |
| GET | `/api/proveedores` | Listar proveedores | Autenticado |
| GET | `/api/proveedores/:id` | Obtener proveedor | Autenticado |
| PUT | `/api/proveedores/:id` | Actualizar proveedor | Admin/Encargado |
| DELETE | `/api/proveedores/:id` | Eliminar proveedor | Admin |

## Alertas

| Método | Endpoint | Descripción | Rol |
|--------|----------|-------------|-----|
| GET | `/api/alertas` | Listar alertas nuevas | Autenticado |
| GET | `/api/alertas/resumen` | Resumen de alertas | Autenticado |
| PUT | `/api/alertas/:id/vista` | Marcar como vista | Autenticado |
| PUT | `/api/alertas/:id/resuelta` | Marcar como resuelta | Autenticado |

---

# 🔄 FLUJO DE DATOS

## Flujo General de la Aplicación

```
┌─────────────────┐
│   Usuario       │
└────────┬────────┘
         │
         ↓
┌─────────────────┐
│   Frontend      │ (React)
│   Login.jsx     │
└────────┬────────┘
         │ Envía credenciales
         ↓
┌─────────────────────────────┐
│   Backend                   │
│   POST /api/usuarios/login  │
└────────┬────────────────────┘
         │ Verifica credenciales
         ↓
┌─────────────────┐
│   MySQL         │
│   Tabla usuario │
└────────┬────────┘
         │ Retorna usuario
         ↓
┌─────────────────────────────┐
│   Backend                   │
│   Genera JWT token          │
└────────┬────────────────────┘
         │ Retorna token
         ↓
┌─────────────────┐
│   Frontend      │
│   localStorage  │
│   .setItem()    │
└────────┬────────┘
         │ Almacena token
         ↓
┌─────────────────┐
│   Frontend      │
│   Dashboard.jsx │
└────────┬────────┘
         │ Peticiones con token
         ↓
┌─────────────────────────────┐
│   Backend                   │
│   Middleware autenticación  │
│   Valida JWT                │
└────────┬────────────────────┘
         │ Token válido
         ↓
┌─────────────────────────────┐
│   Backend                   │
│   Controller                │
│   Procesa lógica            │
└────────┬────────────────────┘
         │ Consulta BD
         ↓
┌─────────────────┐
│   MySQL         │
│   Ejecuta query │
└────────┬────────┘
         │ Retorna datos
         ↓
┌─────────────────────────────┐
│   Backend                   │
│   Retorna JSON              │
└────────┬────────────────────┘
         │ Respuesta HTTP
         ↓
┌─────────────────┐
│   Frontend      │
│   Recibe datos  │
│   setState()    │
└────────┬────────┘
         │ Re-renderiza
         ↓
┌─────────────────┐
│   Usuario       │
│   Ve interfaz   │
│   actualizada   │
└─────────────────┘
```

---

# 🐛 SOLUCIÓN DE PROBLEMAS

## Error: "Cannot find module 'dotenv'"

**Solución:**
```bash
npm install dotenv
```

## Error: "Access denied for user 'root'@'localhost'"

**Solución:**
- Verifica tu contraseña en `.env`
- Si no tienes contraseña, déjalo vacío: `DB_PASSWORD=`

## Error: "Unknown database 'nova_salud'"

**Solución:**
```bash
mysql -u root -p < database/init.sql
```

## Error: "Port 4000 already in use"

**Solución Windows:**
```powershell
netstat -ano | findstr :4000
taskkill /PID <PID> /F
```

**Solución Mac/Linux:**
```bash
lsof -ti:4000 | xargs kill -9
```

## Error: "CORS error in frontend"

**Solución:** El backend ya tiene CORS configurado. Si persiste:

```javascript
// En index.js del backend
app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));
```

## Error: "Token expired"

**Solución:**
```javascript
// En consola del navegador
localStorage.clear();
// Luego recarga la página y vuelve a iniciar sesión
```

---

# 📚 RECURSOS ADICIONALES

- **Documentación React:** https://react.dev
- **Documentación Express:** https://expressjs.com
- **Documentación Sequelize:** https://sequelize.org
- **Documentación Bootstrap:** https://getbootstrap.com
- **Documentación JWT:** https://jwt.io

---

---
