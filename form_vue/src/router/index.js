import { createRouter, createWebHistory } from 'vue-router'
import Login from '../pages/Login.vue'
import Signup from '../pages/Signup.vue'
import Users from '../pages/Users.vue'
import UserForm from '../pages/UserForm.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/signup', component: Signup },
  { path: '/users', component: Users },
  { path: '/users/new', component: UserForm },
  { path: '/users/:id/edit', component: UserForm },
]

const router = createRouter({ history: createWebHistory(), routes })
export default router
