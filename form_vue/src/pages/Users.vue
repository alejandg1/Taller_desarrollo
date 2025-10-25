<template>
  <div class="page">
    <div class="card">
      <h2>Lista de Usuarios</h2>
      <div class="actions">
        <button @click="$router.push('/users/new')">Nuevo Usuario</button>
        <button @click="logout" class="logout">Cerrar Sesión</button>
      </div>
      <table v-if="users.length">
        <thead>
          <tr>
            <th>DNI</th>
            <th>Nombre</th>
            <th>Apellido</th>
            <th>Ciudad</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          <tr v-for="u in users" :key="getUserId(u)">
            <td>{{ u.dni }}</td>
            <td>{{ u.nombre }}</td>
            <td>{{ u.apellido }}</td>
            <td>{{ u.ciudad }}</td>
            <td>
              <button @click="edit(u)" class="btn-edit">Editar</button>
              <button @click="del(u)" class="btn-del">Eliminar</button>
            </td>
          </tr>
        </tbody>
      </table>
      <p v-else>No hay usuarios</p>
      <p v-if="error" class="error">{{ error }}</p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() { return { users: [], error: '' } },
  async mounted() {
    try {
      const db = localStorage.getItem('db') || 'postgres';
      const token = localStorage.getItem('token');
      if (!token) { this.$router.push('/'); return; }
      const res = await axios.get(`/api/${db}/users`, { headers: { Authorization: `Bearer ${token}` } });
      this.users = res.data;
    } catch (err) {
      this.error = err.response?.data?.error || 'Error al cargar usuarios';
      if (err.response?.status === 401) this.$router.push('/');
    }
  },
  methods: {
    getUserId(u) { return u._id || u.id; },
    edit(u) { this.$router.push(`/users/${this.getUserId(u)}/edit`); },
    async del(u) { 
      if (!confirm('¿Eliminar usuario?')) return;
      try {
        const db = localStorage.getItem('db'); 
        const token = localStorage.getItem('token'); 
        await axios.delete(`/api/${db}/users/${this.getUserId(u)}`, { headers: { Authorization: `Bearer ${token}` } }); 
        this.users = this.users.filter(x => this.getUserId(x) !== this.getUserId(u)); 
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al eliminar';
      }
    },
    logout() {
      localStorage.removeItem('token');
      localStorage.removeItem('db');
      this.$router.push('/');
    }
  }
}
</script>
