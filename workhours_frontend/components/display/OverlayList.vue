<template>
  <v-overlay class="hourListOverlay" absolute opacity="0.8" :value="overlay">
    <v-row class="overlayRow ma-0" align-content="center">
      <v-col cols="4" class="d-flex justify-center">
        <v-btn color="error" @click.stop="deleteItemCheck">
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn color="indigo" @click.stop="editItem">
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </v-col>
      <v-col cols="4" class="d-flex justify-center">
        <v-btn color="indigo" @click.stop="closeOverlay">
          <v-icon>mdi-close</v-icon>
        </v-btn>
      </v-col>
    </v-row>
  </v-overlay>
</template>

<script>
export default {
  props: {
    item: {
      type: Object,
      required: true,
    },
    deleteAction: {
      type: String,
      required: true,
    },
    activeAction: {
      type: String,
      required: true,
    },
    modalAction: {
      type: String,
      required: true,
    },
    deleteWarning: {
      type: Boolean,
      default: false,
    },
    deleteWarningTitle: {
      type: String,
      default: '',
    },
    deleteWarningText: {
      type: String,
      default: '',
    },
    preDelete: {
      type: Function,
      default: () => {},
    },
  },
  data() {
    return {
      overlay: false,
    }
  },
  methods: {
    deleteItemCheck() {
      if (this.deleteWarning) {
        this.$store.dispatch('modals/setWarningData', {
          title: this.deleteWarningTitle,
          text: this.deleteWarningText,
          accept: this.deleteItem,
        })
        this.$store.dispatch('modals/setWarningState', true)
      } else {
        this.deleteItem()
      }
    },

    deleteItem() {
      this.preDelete(this.item)
      this.$store.dispatch(this.deleteAction, this.item._id)
      this.$store.dispatch('modals/setWarningState', false)
      this.$store.dispatch('modals/setWarningData', {
        title: '',
        text: '',
        accept: () => {},
      })
      this.overlay = false
    },

    editItem() {
      this.$store.dispatch(this.activeAction, this.item._id)
      this.$store.dispatch(this.modalAction, true)
      this.overlay = false
    },
    closeOverlay() {
      this.overlay = false
    },
    openOverlay() {
      this.overlay = true
    },
  },
}
</script>

<style scoped>
.hourListOverlay >>> .v-overlay__content {
  width: 100%;
  height: 100%;
}
.overlayRow {
  height: 100%;
}
</style>
