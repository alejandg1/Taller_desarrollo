# Taller Desarrollo - CRUD de Usuarios con Express + Vue

Aplicación full-stack para gestión de usuarios con autenticación JWT, soporte para PostgreSQL y MongoDB, backend Express y frontend Vue 3.

## Características

- **Backend Express** con arquitectura de repositorios
- **Doble base de datos**: PostgreSQL y MongoDB (selector dinámico por petición)
- **Autenticación JWT** (signup, login)
- **CRUD completo** de usuarios protegido por token
- **Frontend Vue 3** con Vite, estilos modernos y manejo de errores
- **Docker Compose** para orquestación de servicios

## Arquitectura

```
├── express/          # Backend API REST
│   ├── src/
│   │   ├── controllers/   # Controladores auth y users
│   │   ├── repositories/  # Patrón repositorio (Postgres & Mongo)
│   │   ├── middleware/    # JWT auth middleware
│   │   ├── routes/        # Rutas de API
│   │   └── utils/         # Utilidades
│   └── Dockerfile
├── form_vue/         # Frontend Vue 3 + Vite
│   ├── src/
│   │   ├── pages/         # Login, Signup, Users, UserForm
│   │   └── router/        # Vue Router
│   └── Dockerfile
├── docker-compose.yml
├── init.sql          # Script de inicialización PostgreSQL
└── .env              # Variables de entorno
```

## Servicios

- **pgDB**: PostgreSQL 15 (puerto 5432)
- **mongodb**: MongoDB 6 (puerto 27017)
- **express**: API Express (puerto 5000)
- **vue**: Frontend Vue dev server (puerto 5173)

## Requisitos

- Docker
- Docker Compose

## Instalación y Uso

### 1. Clonar el repositorio y configurar variables de entorno

```bash
# El archivo .env ya está configurado con valores por defecto
```

### 2. Levantar los servicios

```bash
docker compose up -d --build
```

### 3. Acceder a la aplicación

- **Frontend**: http://localhost:5173
- **API Backend**: http://localhost:5000

### 4. Verificar logs

```bash
# Ver logs de todos los servicios
docker compose logs -f

# Ver logs de un servicio específico
docker compose logs -f express
docker compose logs -f vue
```

## Endpoints de la API

### Autenticación (públicos)

- `POST /api/:db/auth/signup` - Registro de usuario
- `POST /api/:db/auth/login` - Login (devuelve JWT)

### Usuarios (protegidos con JWT)

- `GET /api/:db/users` - Listar usuarios
- `GET /api/:db/users/:id` - Obtener usuario por ID
- `POST /api/:db/users` - Crear usuario
- `PUT /api/:db/users/:id` - Actualizar usuario
- `DELETE /api/:db/users/:id` - Eliminar usuario

**Nota**: `:db` puede ser `postgres`, `pg`, `postgresql`, `mongo` o `mongodb`

### Ejemplo de uso con curl

```bash
# Signup en Postgres
curl -X POST http://localhost:5000/api/postgres/auth/signup \
  -H "Content-Type: application/json" \
  -d '{
    "dni":"12345",
    "nombre":"Juan",
    "apellido":"Perez",
    "password":"test123",
    "fecha_nacimiento":"1990-01-01",
    "genero":"male",
    "ciudad":"Madrid"
  }'

# Login
curl -X POST http://localhost:5000/api/postgres/auth/login \
  -H "Content-Type: application/json" \
  -d '{"dni":"12345","password":"test123"}'

# Listar usuarios (con token)
curl -X GET http://localhost:5000/api/postgres/users \
  -H "Authorization: Bearer <TOKEN>"
```

## Estructura de Usuario

```json
{
  "dni": "string (único)",
  "nombre": "string",
  "apellido": "string",
  "password": "string (hasheado con bcrypt)",
  "fecha_nacimiento": "date",
  "genero": "male|female|other",
  "ciudad": "string"
}
```

## Flujo de la Aplicación

1. **Registro**: Usuario se registra en `/signup` eligiendo la base de datos
2. **Login**: Usuario inicia sesión y recibe un token JWT
3. **Dashboard**: Con el token, accede a la lista de usuarios
4. **CRUD**: Puede crear, editar y eliminar usuarios

## Variables de Entorno

Las variables principales están definidas en `docker-compose.yml`:

```env
# Express
PORT=5000
JWT_SECRET=supersecretjwt

# PostgreSQL
PG_HOST=pgDB
PG_PORT=5432
PG_USER=practica_user
PG_PASSWORD=practica_pass
PG_DATABASE=practica_db

# MongoDB
MONGO_URI=mongodb://mongodb:27017/practica_db
```

## Tecnologías Utilizadas

### Backend
- Node.js 20
- Express.js
- Sequelize (PostgreSQL ORM)
- Mongoose (MongoDB ODM)
- bcrypt (hash de contraseñas)
- jsonwebtoken (JWT)

### Frontend
- Vue 3
- Vue Router
- Axios
- Vite

### Infraestructura
- Docker & Docker Compose
- PostgreSQL 15
- MongoDB 6

## Desarrollo

Para desarrollo local sin Docker:

### Backend
```bash
cd express
npm install
# Configurar .env local
npm run dev
```

### Frontend
```bash
cd form_vue
npm install
npm run dev
```

## Detener los servicios

```bash
docker compose down

# Eliminar también los volúmenes (datos)
docker compose down -v
```

## Notas

- Los datos persisten en volúmenes Docker (`db_data` para Postgres, `mongo_data` para Mongo)
- El frontend usa proxy de Vite para redirigir `/api/*` al backend en desarrollo
- La autenticación JWT expira en 1 hora
- Las contraseñas se hashean con bcrypt (10 rounds)

## Autor

Proyecto de taller de desarrollo - 2025
