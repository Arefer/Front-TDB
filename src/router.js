import Vue from 'vue'
import Router from 'vue-router'
import DashboardLayout from '@/layout/DashboardLayout'
import AuthLayout from '@/layout/AuthLayout'
Vue.use(Router)
export const rest_ip = "http://localhost:4567/";
export default new Router({
  linkExactActiveClass: 'active',
  routes: [
    {
      path: '/',
      redirect: 'e-dashboard',
      component: DashboardLayout,
      children: [
        {
          path: '/dashboard',
          name: 'dashboard',
          // route level code-splitting
          // this generates a separate chunk (about.[hash].js) for this route
          // which is lazy-loaded when the route is visited.
          component: () => import(/* webpackChunkName: "demo" */ './views/Dashboard.vue')
        },
        {
          path: '/e-dashboard',
          name: 'Tablero Emergencias',
          component: () => import('./views/EmergenciesDashboard.vue')
        },
        {
          path: '/icons',
          name: 'icons',
          component: () => import(/* webpackChunkName: "demo" */ './views/Icons.vue')
        },
        {
          path: '/profile',
          name: 'profile',
          component: () => import(/* webpackChunkName: "demo" */ './views/UserProfile.vue')
        },
        {
          path: '/maps',
          name: 'Coordenadas ubicaciones',
          component: () => import(/* webpackChunkName: "demo" */ './views/Maps.vue')
        },
        {
          path: '/tables',
          name: 'tables',
          component: () => import(/* webpackChunkName: "demo" */ './views/Tables.vue')
        },
        {
          path: 'create-emergency',
          name: 'create-emergency',
          component: () => import('./views/CreateEmergency.vue')
        },
        {
          path: 'emergency-details',
          name: 'emergency-details',
          component: () => import('./views/EmergencyDetail.vue')
        },
        {
          path: 'create-task',
          name: 'create-task',
          component: () => import('./views/CreateTask.vue')
        },
        {
          path: 'volunteer-task',
          name: 'volunteer-task',
          component: () => import('./views/Volunteer-task.vue')
        },
        {
          path: 'task-details',
          name: 'task-details',
          component: () => import('./views/TaskDetail.vue')
        },
        {
          path: '/volunteers-dashboard',
          name: 'Tablero Voluntarios',
          component: () => import(/* webpackChunkName: "demo" */ './views/VolunteerDashboard.vue')
        },
      ]

    },
    {
      path: '/',
      redirect: 'login',
      component: AuthLayout,
      children: [
        {
          path: '/login',
          name: 'login',
          component: () => import(/* webpackChunkName: "demo" */ './views/Login.vue')
        },
        {
          path: '/register',
          name: 'register',
          component: () => import(/* webpackChunkName: "demo" */ './views/Register.vue')
        }
      ]
    }
  ]
})
