CREATE TABLE usuarios (
    id SERIAL PRIMARY KEY,
    dni VARCHAR(10) UNIQUE NOT NULL,
    nombre VARCHAR(100) NOT NULL,
    apellido VARCHAR(100) NOT NULL,
    password VARCHAR(255) NOT NULL,
    fecha_nacimiento DATE NOT NULL,
    genero VARCHAR(20) NOT NULL CHECK (genero IN ('male', 'female', 'other')),
    ciudad VARCHAR(50) NOT NULL
);
