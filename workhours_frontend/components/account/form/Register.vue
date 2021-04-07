<template>
  <v-card flat class="indigo py-3">
    <v-form ref="registerForm" @submit.prevent="submit">
      <v-row no-gutters>
        <v-col
          cols="12"
          :class="`mt-8 ${$vuetify.breakpoint.xs ? 'px-5' : 'px-9'}`"
        >
          <v-text-field
            v-model="name"
            :rules="nameRules"
            label="Name"
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
            v-model="email"
            :rules="emailRules"
            label="E-mail"
            required
            outlined
            dark
            filled
            dense
          ></v-text-field>
        </v-col>
        <v-col cols="12" :class="`${$vuetify.breakpoint.xs ? 'px-5' : 'px-9'}`">
          <v-text-field
            v-model="password"
            :rules="passwordRules"
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
          <v-spacer></v-spacer>
          <v-btn
            dark
            type="submit"
            outlined
            :class="`${$vuetify.breakpoint.xs ? 'mr-5' : 'mr-9'} mt-2 mb-4`"
          >
            Sign Up</v-btn
          >
        </v-col>
      </v-row>
    </v-form>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      showPass: false,
      working: false,
      nameRules: [
        (v) => !!v || 'Name is required',
        (v) => v.length <= 40 || 'Name must be less than 40 characters',
      ],
      emailRules: [
        (v) => !!v || 'E-mail is required',
        (v) => /.+@.+\..+/.test(v) || 'E-mail must be valid',
      ],
      passwordRules: [
        (v) => !!v || 'Password is required',
        (v) => v.length <= 40 || 'Password must be shorter than 40 characters',
        (v) => v.length >= 5 || 'Password must be longer than 5 characters',
      ],
    }
  },
  methods: {
    submit() {
      if (this.$refs.registerForm.validate()) {
        if (!this.working) {
          this.working = true
          this.$store
            .dispatch('user/register', {
              email: this.email,
              password: this.password,
              name: this.name,
            })
            .then(() => {
              this.working = false
              this.$emit('registered')
              this.$store.dispatch('snackbar/setAll', {
                active: true,
                content: 'Registation Complete!',
                timeout: 5000,
                icon: 'mdi-check-circle',
                color: 'success',
              })
              this.name = ''
              this.email = ''
              this.password = ''
              this.$refs.registerForm.resetValidation()
            })
            .catch((err) => {
              this.working = false
              this.$store.dispatch('snackbar/setAll', {
                active: true,
                content: err.message,
                timeout: 3000,
                color: 'error',
                icon: 'mdi-alert',
              })
            })
        }
      }
    },
  },
}
</script>
