const jwt = require('jsonwebtoken');
const { getRepository } = require('../repositories');

const validateDNI = (dni) => /^\d{10}$/.test(dni);
const validateText = (text) => text && text.trim().length >= 2;

const signup = async (req, res) => {
  try {
    const { dni, nombre, apellido, password, fecha_nacimiento, genero, ciudad } = req.body;
    
    // Validaciones
    if (!validateDNI(dni)) return res.status(400).json({ error: 'DNI debe tener 10 dígitos' });
    if (!validateText(nombre)) return res.status(400).json({ error: 'Nombre inválido' });
    if (!validateText(apellido)) return res.status(400).json({ error: 'Apellido inválido' });
    if (!password || password.length < 4) return res.status(400).json({ error: 'Password debe tener al menos 4 caracteres' });
    if (!validateText(ciudad)) return res.status(400).json({ error: 'Ciudad inválida' });
    if (!['male', 'female', 'other'].includes(genero)) return res.status(400).json({ error: 'Género inválido' });

    const repo = getRepository(req.params.db);
    const existing = await repo.findByDni(dni);
    if (existing) return res.status(400).json({ error: 'DNI ya registrado' });

    const user = await repo.create({ dni, nombre, apellido, password, fecha_nacimiento, genero, ciudad });
    const token = jwt.sign({ id: user.id || user._id, db: req.params.db, nombre: user.nombre }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.status(201).json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const login = async (req, res) => {
  try {
    const { nombre, password } = req.body;
    const repo = getRepository(req.params.db);
    const user = await repo.findByNombre(nombre);
    if (!user) return res.status(401).json({ error: 'Credenciales inválidas' });
    if (password !== user.password) return res.status(401).json({ error: 'Credenciales inválidas' });
    const token = jwt.sign({ id: user.id || user._id, db: req.params.db, nombre: user.nombre }, process.env.JWT_SECRET, { expiresIn: '24h' });
    res.json({ token, user });
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { signup, login };
