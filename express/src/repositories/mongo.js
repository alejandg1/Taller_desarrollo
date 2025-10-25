const mongoose = require('mongoose');

let UserModel;

class UserRepository {
  static async list() { return await UserModel.find(); }
  static async getById(id) { return await UserModel.findById(id); }
  static async findByDni(dni) { return await UserModel.findOne({ dni }); }
  static async findByNombre(nombre) { return await UserModel.findOne({ nombre }); }
  static async create(data) { return await UserModel.create(data); }
  static async update(id, data) { 
    // Remove undefined, null, or empty fields to prevent nullifying them
    Object.keys(data).forEach(key => {
      if (data[key] === undefined || data[key] === null || data[key] === '') {
        delete data[key];
      }
    });
    return await UserModel.findByIdAndUpdate(id, data, { new: true }); 
  }
  static async delete(id) { return await UserModel.findByIdAndDelete(id); }
}

function initMongo() {
  const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/test';
  mongoose.connect(uri).then(() => console.log('Mongo connected')).catch(err => console.error('Mongo err', err.message));
  const schema = new mongoose.Schema({
    dni: { type: String, unique: true },
    nombre: String,
    apellido: String,
    password: String,
    fecha_nacimiento: Date,
    genero: String,
    ciudad: String,
  });
  UserModel = mongoose.model('usuarios', schema);
}

module.exports = { initMongo, UserRepository };
