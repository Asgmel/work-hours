<template>
  <v-snackbar
    v-model="snackbar"
    :timeout="timeout"
    top
    app
    :color="color"
    content-class="d-flex"
    :class="overlapToolbar ? 'overlapToolbar' : ''"
  >
    <v-icon>{{ icon }}</v-icon>
    <p class="mb-0 ml-3 pt-1">{{ text }}</p>

    <template #action="{ attrs }">
      <v-btn dark text v-bind="attrs" @click="snackbar = false"> Close </v-btn>
    </template>
  </v-snackbar>
</template>

<script>
export default {
  props: {
    overlapToolbar: {
      type: Boolean,
      default: false,
    },
  },
  computed: {
    snackbar: {
      get() {
        return this.$store.getters['snackbar/getActive']
      },
      set(v) {
        this.$store.dispatch('snackbar/setActive', v)
      },
    },
    text() {
      return this.$store.getters['snackbar/getContent']
    },
    timeout() {
      return this.$store.getters['snackbar/getTimeout']
    },
    color() {
      return this.$store.getters['snackbar/getColor']
    },
    icon() {
      return this.$store.getters['snackbar/getIcon']
    },
  },
}
</script>

<style scoped>
.overlapToolbar {
  margin-top: -64px;
}
</style>
