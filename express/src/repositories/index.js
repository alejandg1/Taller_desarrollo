const PostgresUserRepository = require('./postgres').UserRepository;
const MongoUserRepository = require('./mongo').UserRepository;

function getRepository(name) {
  if (!name) throw new Error('db param required');
  const n = name.toLowerCase();
  if (n === 'postgres' || n === 'pg' || n === 'postgresql') return PostgresUserRepository;
  if (n === 'mongo' || n === 'mongodb') return MongoUserRepository;
  throw new Error('unknown db');
}

module.exports = { getRepository };
