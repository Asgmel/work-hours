<template>
  <v-app>
    <DisplaySnackbar :overlap-toolbar="true" />
    <ModalContainer />
    <NavigationBar />
    <NavigationDrawer />

    <v-main class="grey lighten-4">
      <v-container class="px-5">
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'auth',
  async mounted() {
    try {
      await this.$store.dispatch('departments/populate')
      await this.$store.dispatch('projects/populate')
      await this.$store.dispatch('hours/populate')
      await this.$store.dispatch('user/getUser')
    } catch (e) {
      throw new Error(e)
    }
  },
}
</script>
