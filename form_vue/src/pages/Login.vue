<template>
  <div class="page">
    <div class="card">
      <h2>Login</h2>
      <form @submit.prevent="submit">
        <label>Nombre</label>
        <input v-model="nombre" placeholder="Nombre" required />
        <label>Password</label>
        <input v-model="password" placeholder="Password" type="password" required minlength="4" />
        <label>Base de datos</label>
        <select v-model="db">
          <option value="postgres">Postgres</option>
          <option value="mongo">Mongo</option>
        </select>
        <button type="submit">Login</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <p class="link">¿No tienes cuenta? <router-link to="/signup">Regístrate aquí</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() { return { nombre: '', password: '', db: 'postgres', error: '' } },
  methods: {
    async submit() {
      try {
        this.error = '';
        const res = await axios.post(`/api/${this.db}/auth/login`, { nombre: this.nombre, password: this.password });
        localStorage.setItem('token', res.data.token);
        localStorage.setItem('db', this.db);
        this.$router.push('/users');
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al iniciar sesión';
      }
    }
  }
}
</script>
