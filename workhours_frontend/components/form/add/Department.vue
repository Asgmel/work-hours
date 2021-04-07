<template>
  <v-form ref="addDepartmentForm" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :rules="departmentRules"
            :counter="30"
            label="Department"
            required
          ></v-text-field>
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    valid: false,
    id: null,
    name: '',
    departmentRules: [
      (v) => !!v || 'Description is required',
      (v) => v.length <= 30 || 'Description must be less than 30 characters',
    ],
  }),
  mounted() {
    this.getUpdateDepartment()
  },
  methods: {
    getUpdateDepartment() {
      const department = this.$store.getters['departments/getActive']
      if (Object.keys(department).length > 0) {
        this.id = department._id
        this.name = department.name
        this.$store.dispatch('departments/setActive', null)
      }
    },
    submit(keepOpen) {
      if (this.$refs.addDepartmentForm.validate()) {
        let action = 'departments/create'
        const dataObj = {
          name: this.name,
        }

        if (this._id) {
          action = 'departments/update'
          dataObj._id = this.id
        }

        this.$store
          .dispatch(action, dataObj)
          .then(() => {
            this.$store.dispatch(
              'snackbar/setSuccess',
              `Department ${
                action.substring(12, 18) === 'update' ? 'Updated!' : 'Added!'
              }`
            )
          })
          .catch((err) => {
            this.$store.dispatch('snackbar/setError', err.message)
          })
        this.resetValidation()
        if (!keepOpen) {
          this.$store.dispatch('modals/setAddDepartment', false)
        }
      }
    },
    resetValidation() {
      this.name = ''
      this.$refs.addDepartmentForm.resetValidation()
    },
  },
}
</script>
