<template>
  <v-dialog v-model="modal" app persistent max-width="800px">
    <v-card>
      <v-card-title>
        <span class="headline">{{ headline }}</span>
      </v-card-title>
      <v-card-text>
        <slot></slot>
        <v-checkbox
          v-if="$vuetify.breakpoint.xs"
          v-model="keepOpen"
          label="Keep open"
          class="ml-3"
        ></v-checkbox>
      </v-card-text>
      <v-card-actions>
        <v-checkbox
          v-if="$vuetify.breakpoint.smAndUp"
          v-model="keepOpen"
          class="ml-4"
          label="Keep open"
        ></v-checkbox>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="clear"> Clear </v-btn>
        <v-btn color="blue darken-1" text @click="close"> Close </v-btn>
        <v-btn color="success darken-1" text @click="submit"> Save </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  props: {
    headline: {
      type: String,
      required: true,
    },
    getModal: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      keepOpen: false,
    }
  },
  computed: {
    modal: {
      get() {
        return this.getModal
      },
      set(v) {
        this.$emit('set-modal', v)
      },
    },
  },
  methods: {
    submit() {
      this.$emit('submit', this.keepOpen)
    },
    close() {
      this.modal = false
      this.$emit('reset')
    },
    clear() {
      this.$emit('reset')
    },
  },
}
</script>

<style scoped></style>
