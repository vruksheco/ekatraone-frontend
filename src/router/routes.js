import Vue from 'vue';
import Router from 'vue-router';

Vue.use(Router)


 const routes= [
  
  {
    path: '/',
    redirect: '/login',
    component: () => import('layouts/LoginLayout.vue'),
    children: [
      { path: '',
      component: () => import('pages/login.vue') }
    ]
  },
  {
    path:'/page', 
    redirect: '/dashboard',
    component: () => import('layouts/MainLayout.vue'),
    beforeEnter (to, from, next){
      const loggedIn = localStorage.getItem('user');
      if(!loggedIn){
        next('/')
      } else {
        next()
      }
    },
    children: [
      { path: '/builder', component: () => import('pages/courseBuilder.vue') },
      { path: '/usergroup', component: () => import('pages/usergroup.vue') },
      { path: '/dashboard', component: () => import('pages/dashboard.vue') },
      { path: '/test', component: () => import('pages/test.vue') }


    ]
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: '*',
    component: () => import('pages/Error404.vue')
  }
]

export default routes

