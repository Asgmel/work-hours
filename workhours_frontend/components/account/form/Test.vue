<template>
  <v-card flat dark class="indigo pa-8">
    <p>Press the button below to try the app with a temporary test account.</p>
    <p class="error--text">
      NB: Please note that none of the changes you do on this account will be
      saved after you leave the app. If you want to save your data, please
      create or log in to your own account.
    </p>
    <v-btn
      :disabled="btnDisabled"
      dark
      outlined
      width="100%"
      class="mr-6 mt-2"
      @click="login"
      >Log In to Test Account</v-btn
    >
    <v-overlay :value="btnDisabled" opacity="0.8">
      <div class="d-flex flex-column justify-center align-center">
        <h2 class="mb-8">Loading test data...</h2>
        <v-progress-circular indeterminate size="64"></v-progress-circular>
      </div>
    </v-overlay>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      btnDisabled: false,
    }
  },
  methods: {
    login() {
      if (!this.btnDisabled) {
        this.btnDisabled = true
        this.$store
          .dispatch('user/test')
          .then(() => {
            this.$store.dispatch('snackbar/setActive', false)
            this.btnDisabled = false
            this.$router.push('/dashboard')
          })
          .catch(() => {
            this.btnDisabled = false
          })
      }
    },
  },
}
</script>
