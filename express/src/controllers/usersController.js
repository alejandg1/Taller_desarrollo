const { getRepository } = require('../repositories');

const list = async (req, res) => {
  try {
    const repo = getRepository(req.params.db);
    const users = await repo.list();
    res.json(users);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const getById = async (req, res) => {
  try {
    const repo = getRepository(req.params.db);
    const user = await repo.getById(req.params.id);
    if (!user) return res.status(404).json({ error: 'not found' });
    res.json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const create = async (req, res) => {
  try {
    const repo = getRepository(req.params.db);
    const user = await repo.create(req.body);
    res.status(201).json(user);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const update = async (req, res) => {
  try {
    const repo = getRepository(req.params.db);
    const data = { ...req.body };
    // Only update password if a new one is provided
    if (!data.password || data.password.trim().length === 0) {
      delete data.password;
    }
    const updated = await repo.update(req.params.id, data);
    res.json(updated);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

const remove = async (req, res) => {
  try {
    const repo = getRepository(req.params.db);
    await repo.delete(req.params.id);
    res.status(204).end();
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
};

module.exports = { list, getById, create, update, remove };
