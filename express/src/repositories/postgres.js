const { Sequelize, DataTypes } = require('sequelize');
let sequelize;
let UserModel;

class UserRepository {
  static async list() { return await UserModel.findAll(); }
  static async getById(id) { return await UserModel.findByPk(id); }
  static async findByDni(dni) { return await UserModel.findOne({ where: { dni } }); }
  static async findByNombre(nombre) { return await UserModel.findOne({ where: { nombre } }); }
  static async create(data) { return await UserModel.create(data); }
  static async update(id, data) { 
    const u = await UserModel.findByPk(id); 
    if (!u) throw new Error('not found'); 
    // Remove undefined fields to prevent nullifying them
    Object.keys(data).forEach(key => {
      if (data[key] === undefined || data[key] === null || data[key] === '') {
        delete data[key];
      }
    });
    return await u.update(data); 
  }
  static async delete(id) { const u = await UserModel.findByPk(id); if (!u) throw new Error('not found'); await u.destroy(); }
}

function initPostgres() {
  const host = process.env.PG_HOST || 'localhost';
  const port = process.env.PG_PORT || 5432;
  const user = process.env.PG_USER || 'postgres';
  const pass = process.env.PG_PASSWORD || '';
  const db = process.env.PG_DATABASE || 'postgres';
  sequelize = new Sequelize(`postgres://${user}:${pass}@${host}:${port}/${db}`, { logging: false });
  UserModel = sequelize.define('usuarios', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    dni: { type: DataTypes.STRING, unique: true },
    nombre: DataTypes.STRING,
    apellido: DataTypes.STRING,
    password: DataTypes.STRING,
    fecha_nacimiento: DataTypes.DATE,
    genero: DataTypes.STRING,
    ciudad: DataTypes.STRING,
  }, { timestamps: false });

  sequelize.authenticate().then(() => console.log('Postgres connected')).catch(err => console.error('PG err', err.message));
}

module.exports = { initPostgres, UserRepository };
