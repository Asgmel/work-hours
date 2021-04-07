<template>
  <v-navigation-drawer
    v-model="drawer"
    dark
    color="indigo"
    disable-resize-watcher
    app
  >
    <v-row no-gutters align="center" justify="center" class="mt-5">
      <v-avatar size="100">
        <v-icon size="120">mdi-account-circle</v-icon>
      </v-avatar>
    </v-row>
    <v-row no-gutters align="center" justify="center" class="mt-2">
      <p class="white--text mt-1">{{ name }}</p>
    </v-row>

    <v-list dense nav>
      <v-list-item
        v-for="route in routes"
        :key="route.title"
        link
        :to="route.link"
      >
        <v-list-item-icon>
          <v-icon>{{ route.icon }}</v-icon>
        </v-list-item-icon>

        <v-list-item-content>
          <v-list-item-title>{{ route.title }}</v-list-item-title>
        </v-list-item-content>
      </v-list-item>
    </v-list>
    <template #append>
      <div class="pa-2">
        <v-btn outlined block @click="logout">
          Logout
          <v-icon class="ml-2">mdi-exit-to-app</v-icon>
        </v-btn>
      </div>
    </template>
  </v-navigation-drawer>
</template>

<script>
export default {
  computed: {
    drawer: {
      get() {
        return this.$store.getters['navigation/getDrawerState']
      },
      set(value) {
        this.$store.dispatch('navigation/setDrawerState', value)
      },
    },
    routes() {
      return this.$store.getters['navigation/getRoutes']
    },
    name() {
      return this.$store.getters['user/name']
    },
  },
  mounted() {
    if (this.$vuetify.breakpoint.lgAndUp) {
      this.$store.dispatch('navigation/setDrawerState', true)
    } else {
      this.$store.dispatch('navigation/setDrawerState', false)
    }
  },
  methods: {
    logout() {
      this.$store
        .dispatch('user/logout')
        .then(() => {
          this.$store.dispatch('snackbar/setActive', false)
          this.$router.push('/')
        })
        .catch((err) => {
          this.$store.dispatch('snackbar/setAll', {
            active: true,
            content: err.message,
            timeout: 3000,
            color: 'error',
            icon: 'mdi-alert',
          })
        })
    },
  },
}
</script>
