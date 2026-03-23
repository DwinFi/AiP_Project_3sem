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
      links: [
        { title: 'Login', icon: 'mdi-lock', url: '/login' },
        { title: 'Registration', icon: 'mdi-account-plus', url: '/registration' },
        { title: 'Orders', icon: 'mdi-bookmark-multiple-outline', url: '/orders' },
        { title: 'Add Motorcycle', icon: 'mdi-motorbike', url: '/new' },
        { title: 'My Motorcycles', icon: 'mdi-format-list-bulleted', url: '/list' }
      ]
    }
  }
}
</script>