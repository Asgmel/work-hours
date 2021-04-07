<template>
  <div :class="`d-flex flex-column align-center loginContainer`">
    <div v-if="$vuetify.breakpoint.smAndUp" class="box-spacer"></div>
    <h1 class="text-center mt-8 mb-10 indigo--text loginHeader">
      <span class="font-weight-light">WORK</span>HOURS
    </h1>
    <v-card dark class="indigo py-2" flat width="600">
      <v-tabs
        v-model="tab"
        dark
        background-color="indigo"
        class="tabs"
        fixed-tabs
      >
        <v-tab>Login</v-tab>
        <v-tab>Register</v-tab>
        <v-tab>Test</v-tab>
        <v-tab-item>
          <AccountFormLogin />
        </v-tab-item>
        <v-tab-item>
          <AccountFormRegister @registered="tab = 0" />
        </v-tab-item>
        <v-tab-item>
          <AccountFormTest />
        </v-tab-item>
      </v-tabs>
    </v-card>
  </div>
</template>

<script>
export default {
  data() {
    return {
      tab: 0,
    }
  },
}
</script>

<style scoped>
.tabs >>> .v-window__container {
  background-color: #3f51b5;
}
.box-spacer {
  height: calc(50vh - 360px);
  width: 100%;
}
.loginHeader {
  font-size: 4rem;
}
.loginContainer {
  min-height: calc(100vh - 24px);
}
@media only screen and (max-width: 600px) {
  .loginHeader {
    font-size: 3rem;
  }
}
@media only screen and (max-width: 350px) {
  .loginHeader {
    font-size: 2.5rem;
  }
}
</style>
