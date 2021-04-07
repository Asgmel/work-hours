<template>
  <v-app>
    <v-main class="grey lighten-4">
      <v-container>
        <DisplaySnackbar />
        <Nuxt />
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
export default {
  middleware: 'login',
}
</script>
