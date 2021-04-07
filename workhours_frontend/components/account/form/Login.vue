<template>
  <v-card flat class="indigo py-3">
    <v-form ref="loginForm" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col
          cols="12"
          :class="`mt-8 ${$vuetify.breakpoint.xs ? 'px-5' : 'px-9'}`"
        >
          <v-text-field
            v-model="email"
            :error="loginError"
            label="E-mail"
            required
            outlined
            dark
            filled
            dense
          ></v-text-field>
        </v-col>
        <v-col
          cols="12"
          :class="`my-2 ${$vuetify.breakpoint.xs ? 'px-5' : 'px-9'}`"
        >
          <v-text-field
            v-model="password"
            :error="loginError"
            label="Password"
            :append-icon="showPass ? 'mdi-eye' : 'mdi-eye-off'"
            required
            outlined
            dense
            dark
            filled
            :type="showPass ? 'text' : 'password'"
            @click:append="showPass = !showPass"
          ></v-text-field>
        </v-col>
        <v-col cols="12" class="d-flex justify-end">
          <v-btn
            text
            dark
            :class="`${
              $vuetify.breakpoint.xs ? 'ml-5' : 'ml-9'
            } px-0 mt-2 mb-4`"
            >Forgot password?</v-btn
          >
          <v-spacer></v-spacer>
          <v-btn
            dark
            type="submit"
            outlined
            :class="`${$vuetify.breakpoint.xs ? 'mr-5' : 'mr-9'} mt-2 mb-4`"
          >
            Sign In
          </v-btn>
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      email: '',
      password: '',
      showPass: false,
      loginError: false,
      working: false,
    }
  },
  methods: {
    submit() {
      if (!this.working) {
        this.working = true
        this.$store
          .dispatch('user/login', {
            email: this.email,
            password: this.password,
          })
          .then(() => {
            this.working = false
            this.$store.dispatch('snackbar/setActive', false)
            this.$router.push('/dashboard')
          })
          .catch((err) => {
            this.working = false
            this.loginError = true
            this.$store.dispatch('snackbar/setAll', {
              active: true,
              content: err.message,
              timeout: 3000,
              color: 'error',
              icon: 'mdi-alert',
            })
            setTimeout(() => {
              this.loginError = false
            }, 3000)
          })
      }
    },
  },
}
</script>

<style scoped>
.formCard {
  border-radius: 0 0 4px 4px;
}
</style>
