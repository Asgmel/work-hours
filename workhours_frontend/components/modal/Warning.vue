<template>
  <div class="text-center">
    <v-dialog v-model="modal" width="500">
      <v-card>
        <v-card-title class="headline error--text">
          <v-icon class="error--text">mdi-alert</v-icon>
          <v-spacer></v-spacer>
          {{ title }}
          <v-spacer></v-spacer>
          <v-icon class="error--text">mdi-alert</v-icon>
        </v-card-title>
        <v-card-text>
          {{ text }}
        </v-card-text>
        <v-divider></v-divider>
        <v-card-actions>
          <v-btn color="indigo" text @click="close"> Cancel </v-btn>
          <v-spacer></v-spacer>
          <v-btn color="error" text @click="accept"> Delete </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  data() {
    return {
      title: '',
      text: '',
      accept: () => {},
    }
  },
  computed: {
    modal: {
      get() {
        return this.$store.getters['modals/getWarningState']
      },
      set(v) {
        this.$store.dispatch('modals/setWarningState', v)
      },
    },
  },
  mounted() {
    const values = this.$store.getters['modals/getWarningData']
    this.title = values.title
    this.text = values.text
    this.accept = values.accept
  },
  methods: {
    close() {
      this.$store.dispatch('modals/setWarningState', false)
    },
  },
}
</script>
