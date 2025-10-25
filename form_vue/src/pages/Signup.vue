<template>
  <div class="page">
    <div class="card">
      <h2>Registro</h2>
      <form @submit.prevent="submit">
        <label>DNI (10 dígitos)</label>
        <input v-model="dni" placeholder="DNI" required pattern="\d{10}" title="DNI debe tener exactamente 10 dígitos" maxlength="10" />
        <label>Nombre</label>
        <input v-model="nombre" placeholder="Nombre" required minlength="2" />
        <label>Apellido</label>
        <input v-model="apellido" placeholder="Apellido" required minlength="2" />
        <label>Password (mínimo 4 caracteres)</label>
        <input v-model="password" placeholder="Password" type="password" required minlength="4" />
        <label>Fecha de Nacimiento</label>
        <input v-model="fecha_nacimiento" type="date" required />
        <label>Género</label>
        <select v-model="genero" required>
          <option value="">Selecciona</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label>Ciudad</label>
        <input v-model="ciudad" placeholder="Ciudad" required minlength="2" />
        <label>Base de datos</label>
        <select v-model="db">
          <option value="postgres">Postgres</option>
          <option value="mongo">Mongo</option>
        </select>
        <button type="submit">Registrarse</button>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
      <p class="link">¿Ya tienes cuenta? <router-link to="/">Inicia sesión aquí</router-link></p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() { return { dni: '', nombre: '', apellido: '', password: '', fecha_nacimiento: '', genero: '', ciudad: '', db: 'postgres', error: '' } },
  methods: {
    async submit() {
      try {
        this.error = '';
        await axios.post(`/api/${this.db}/auth/signup`, { 
          dni: this.dni, 
          nombre: this.nombre, 
          apellido: this.apellido, 
          password: this.password,
          fecha_nacimiento: this.fecha_nacimiento,
          genero: this.genero,
          ciudad: this.ciudad
        });
        alert('Usuario registrado correctamente');
        this.$router.push('/');
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al registrarse';
      }
    }
  }
}
</script>
