<template>
  <v-app>
    <v-navigation-drawer app v-model="drawer">
      <v-list-item>
        <div>
          <v-list-item-title class="text-h6">
            MotoSalon
          </v-list-item-title>
          <v-list-item-subtitle>
            Продажа мотоциклов
          </v-list-item-subtitle>
        </div>
      </v-list-item>

      <v-divider></v-divider>

      <v-list density="compact">
        <v-list-item to="/" link>
          <template #prepend>
            <v-icon icon="mdi-home"></v-icon>
          </template>
          <v-list-item-title>Home</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          link
        >
          <template #prepend>
            <v-icon :icon="link.icon"></v-icon>
          </template>
          <v-list-item-title>{{ link.title }}</v-list-item-title>
        </v-list-item>

        <v-list-item
          v-if="isLoggedIn"
          @click="logout"
          link
        >
          <template #prepend>
            <v-icon icon="mdi-logout"></v-icon>
          </template>
          <v-list-item-title>Logout</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-navigation-drawer>

    <v-app-bar color="primary">
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title>
        <v-btn to="/" variant="text">
          Home
        </v-btn>
      </v-toolbar-title>

      <v-spacer></v-spacer>

      <v-toolbar-items class="d-none d-md-flex">
        <v-btn
          v-for="link in links"
          :key="link.title"
          :to="link.url"
          variant="text"
        >
          <v-icon start :icon="link.icon"></v-icon>
          {{ link.title }}
        </v-btn>

        <v-btn
          v-if="isLoggedIn"
          variant="text"
          @click="logout"
        >
          <v-icon start icon="mdi-logout"></v-icon>
          Logout
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
export default {
  data() {
    return {
      drawer: false,
      isLoggedIn: !!localStorage.getItem('token')
    }
  },
  computed: {
    links() {
      if (this.isLoggedIn) {
        return [
          { title: 'Orders', icon: 'mdi-bookmark-multiple-outline', url: '/orders' },
          { title: 'Add Motorcycle', icon: 'mdi-motorbike', url: '/new' },
          { title: 'My Motorcycles', icon: 'mdi-format-list-bulleted', url: '/list' }
        ]
      }

      return [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        { title: 'Registration', icon: 'mdi-account-plus', url: '/registration' }
      ]
    }
  },
  methods: {
    logout() {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.isLoggedIn = false
      window.dispatchEvent(new Event('auth-changed'))
      this.$router.push('/login')
    },
    syncAuth() {
      this.isLoggedIn = !!localStorage.getItem('token')
    }
  },
  mounted() {
    window.addEventListener('auth-changed', this.syncAuth)
  },
  beforeUnmount() {
    window.removeEventListener('auth-changed', this.syncAuth)
  }
}
</script>