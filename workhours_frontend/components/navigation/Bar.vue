<template>
  <v-app-bar flat app light class="grey lighten-4">
    <v-app-bar-nav-icon
      class="indigo--text"
      @click="changeDrawer"
    ></v-app-bar-nav-icon>
    <v-app-bar-title class="text-uppercase indigo--text">
      <h2 class="mainHeader">
        <span class="font-weight-light">Work</span>hours
      </h2>
    </v-app-bar-title>
    <v-spacer> </v-spacer>
    <NavigationButtons />
  </v-app-bar>
</template>

<script>
export default {
  methods: {
    changeDrawer() {
      this.$store.dispatch('navigation/invertDrawerState')
    },
  },
}
</script>

<style scoped>
@media only screen and (max-width: 599px) {
  .mainHeader {
    font-size: 1.25rem;
  }
}
</style>
