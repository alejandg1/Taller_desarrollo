<template>
  <div class="page">
    <div class="card">
      <h2>{{ isEdit ? 'Editar Usuario' : 'Nuevo Usuario' }}</h2>
      <form @submit.prevent="submit">
        <label>DNI (10 dígitos)</label>
        <input v-model="form.dni" placeholder="DNI" required pattern="\d{10}" title="DNI debe tener exactamente 10 dígitos" maxlength="10" />
        <label>Nombre</label>
        <input v-model="form.nombre" placeholder="Nombre" required minlength="2" />
        <label>Apellido</label>
        <input v-model="form.apellido" placeholder="Apellido" required minlength="2" />
        <label>Password{{ isEdit ? ' (dejar vacío para no cambiar)' : ' (mínimo 4 caracteres)' }}</label>
        <input v-model="form.password" placeholder="Password" type="password" :required="!isEdit" :minlength="form.password ? 4 : 0" />
        <label>Fecha de Nacimiento</label>
        <input v-model="form.fecha_nacimiento" type="date" required />
        <label>Género</label>
        <select v-model="form.genero" required>
          <option value="">Selecciona</option>
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other">Other</option>
        </select>
        <label>Ciudad</label>
        <input v-model="form.ciudad" placeholder="Ciudad" required minlength="2" />
        <div class="actions">
          <button type="submit">Guardar</button>
          <button type="button" @click="$router.push('/users')">Cancelar</button>
        </div>
        <p v-if="error" class="error">{{ error }}</p>
      </form>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
export default {
  data() { return { form: { dni: '', nombre: '', apellido: '', password: '', fecha_nacimiento: '', genero: '', ciudad: '' }, error: '' } },
  computed: {
    isEdit() { return !!this.$route.params.id; }
  },
  async mounted() {
    const id = this.$route.params.id;
    if (id && id !== 'undefined') {
      try {
        const db = localStorage.getItem('db'); 
        const token = localStorage.getItem('token');
        if (!token) { this.$router.push('/'); return; }
        const res = await axios.get(`/api/${db}/users/${id}`, { headers: { Authorization: `Bearer ${token}` } });
        this.form = res.data;
        // Clear password when editing - user will enter new one if they want to change it
        this.form.password = '';
        if (this.form.fecha_nacimiento) this.form.fecha_nacimiento = this.form.fecha_nacimiento.split('T')[0];
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al cargar usuario';
        if (err.response?.status === 401) this.$router.push('/');
      }
    }
  },
  methods: {
    async submit() {
      try {
        this.error = '';
        const db = localStorage.getItem('db'); 
        const token = localStorage.getItem('token');
        if (this.$route.params.id) {
          await axios.put(`/api/${db}/users/${this.$route.params.id}`, this.form, { headers: { Authorization: `Bearer ${token}` } });
        } else {
          await axios.post(`/api/${db}/users`, this.form, { headers: { Authorization: `Bearer ${token}` } });
        }
        this.$router.push('/users');
      } catch (err) {
        this.error = err.response?.data?.error || 'Error al guardar';
      }
    }
  }
}
</script>
