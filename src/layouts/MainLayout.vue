<template>
    <q-layout view="lHh Lpr lFf">
      <q-header elevated>
        <q-toolbar>
          <q-btn flat @click="drawer = !drawer" round dense icon="menu" >
          </q-btn>
          <q-toolbar-title>Ēkatra</q-toolbar-title>
        </q-toolbar>
      </q-header>

      <q-drawer
        v-model="drawer"
        show-if-above
        :width="300"
        :breakpoint="1500"
        bordered
        content-class="bg-accent"
      >
      <br>
      <div class="text-center" >
      <img src="~assets/VEF_NB_Logo-150x150.png" />
      </div>
      <br>
      <q-separator />
          <q-list v-for="(menuItem, index) in menuList" :key="index">

            <q-item exact clickable :to="menuItem.to" :active="menuItem.label === 'Outbox'" v-ripple>
              <q-item-section avatar>
                <q-icon :name="menuItem.icon" />
              </q-item-section>
              <q-item-section>
                {{ menuItem.label }}
              </q-item-section>
            </q-item>

           <q-separator v-if="menuItem.separator" />

          </q-list>
          <br>
          <q-btn flat color="primary" @click="logout" class="full-width" >Logout</q-btn>
      </q-drawer>

      <q-page-container>
        <router-view />
      </q-page-container>
    </q-layout>
</template>


<script>
import axios from "axios";
import { mapActions } from "vuex";
const menuList = [
  {
    icon: 'dashboard',
    label: 'DashBoard',
    to: '/dashboard',
    separator: true
  },
  {
    icon: 'description',
    label: 'Course Builder',
    to: '/builder',
    separator: true
  },
  {
    icon: 'supervisor_account',
    label: 'User & Groups',
    to: '/usergroup',
    separator: true
  },
    {
    icon: 'assignment_turned_in',
    label: 'Course Delivery',
    to: '/test',
    separator: true
  },
]

export default {
  data () {
    return {
      drawer: false,
      menuList
    }
  },
    methods: {
      logout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/');
    }
    },
    created: function () {
      axios.interceptors.response.use(undefined, function (err) {
        return new Promise(function (resolve, reject) {
          if (err.status === 401 && err.config && !err.config.__isRetryRequest) {
            this.$store.dispatch(logout)
          }
          throw err;
        });
      });
    }
  }
</script>
