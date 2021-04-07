<template>
  <div
    v-if="$vuetify.breakpoint.mdAndUp"
    :class="`${
      $vuetify.breakpoint.md && columnEdit
        ? 'flex-column justify-space-between'
        : ''
    } d-flex flex-grow-0 flex-shrink-0`"
  >
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          small
          color="indigo"
          plain
          v-bind="attrs"
          v-on="on"
          @click.stop="editItem"
        >
          <v-icon>mdi-pencil</v-icon>
        </v-btn>
      </template>
      <span>Edit</span>
    </v-tooltip>
    <v-tooltip bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          small
          color="error"
          plain
          v-bind="attrs"
          v-on="on"
          @click.stop="deleteItemCheck"
        >
          <v-icon>mdi-delete</v-icon>
        </v-btn>
      </template>
      <span>Delete</span>
    </v-tooltip>
  </div>
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
    columnEdit: {
      type: Boolean,
      default: false,
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
      const itemType = this.deleteAction.split('/')[0]
      this.$store.dispatch('snackbar/setAll', {
        active: true,
        content: `${itemType.substring(0, itemType.length - 1)} deleted!`,
        timeout: 5000,
        color: 'error',
        icon: 'mdi-alert',
      })
      this.$store.dispatch('modals/setWarningData', {
        title: '',
        text: '',
        accept: () => {},
      })
    },

    editItem() {
      this.$store.dispatch(this.activeAction, this.item._id)
      this.$store.dispatch(this.modalAction, true)
    },
  },
}
</script>
