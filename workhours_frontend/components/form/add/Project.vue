<template>
  <v-form ref="addProjectForm" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="name"
            :rules="projectRules"
            :counter="30"
            label="Project Name"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <v-select
            v-model="department"
            :rules="departmentRules"
            :items="departments"
            label="Department"
            :menu-props="{ offsetY: true }"
          ></v-select>
        </v-col>

        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
          <v-select
            v-model="color"
            class="selectColor"
            :rules="colorRules"
            :items="colors"
            label="Color"
            :menu-props="{ offsetY: true }"
          ></v-select>
        </v-col>
        <p class="body-1 my-0 pl-3">Preview:</p>
        <p :class="`body-1 my-0 pl-3 ${previewColor}`">
          {{ previewText }}
        </p>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
export default {
  data: () => ({
    departments: [],
    colors: [
      { text: 'Red', value: 'red' },
      { text: 'Pink', value: 'pink' },
      { text: 'Indigo', value: 'indigo' },
      { text: 'Purple', value: 'purple' },
      { text: 'Teal', value: 'teal' },
      { text: 'Lime', value: 'lime' },
      { text: 'Green', value: 'green' },
      { text: 'Amber', value: 'amber' },
      { text: 'Orange', value: 'orange' },
      { text: 'Blue', value: 'blue' },
    ],
    valid: false,
    id: null,
    name: '',
    department: {},
    color: '',
    projectRules: [
      (v) => !!v || 'Project name is required',
      (v) => v.length <= 30 || 'Project name must be less than 30 characters',
    ],
    departmentRules: [(v) => !!v.name || 'Department is required'],
    colorRules: [(v) => !!v || 'Color is required'],
  }),
  computed: {
    previewColor() {
      if (this.color) {
        return `${this.color}--text`
      }
      return ''
    },
    previewText() {
      if (this.name && Object.keys(this.department).length > 0) {
        return `${this.name} - ${this.department.name}`
      }
      return ''
    },
  },
  mounted() {
    this.getDepartments()
    this.getActiveProject()
  },
  methods: {
    getDepartments() {
      this.departments = this.$store.getters['departments/getAll'].map(
        (department) => {
          return {
            text: department.name,
            value: department,
          }
        }
      )
    },
    getActiveProject() {
      const project = this.$store.getters['projects/getActive']
      if (Object.keys(project).length > 0) {
        const department = this.$store.getters['departments/getAllObjects'][
          project.department
        ]
        this.id = project._id
        this.name = project.name
        this.department = { _id: project.department, ...department }
        this.color = project.color
        this.$store.dispatch('projects/setActive', null)
      }
    },
    submit(keepOpen) {
      if (this.$refs.addProjectForm.validate()) {
        let action = 'projects/create'
        const dataObj = {
          name: this.name,
          department: this.department._id,
          color: this.color,
        }

        if (this._id) {
          action = 'projects/update'
          dataObj._id = this.id
        }

        this.$store
          .dispatch(action, dataObj)
          .then(() => {
            this.$store.dispatch(
              'snackbar/setSuccess',
              `Project ${
                action.substring(9, 15) === 'update' ? 'Updated!' : 'Added!'
              }`
            )
          })
          .catch((err) => {
            this.$store.dispatch('snackbar/setError', err.message)
          })
        this.resetValidation()
        if (!keepOpen) {
          this.$store.dispatch('modals/setAddProject', false)
        }
      }
    },
    resetValidation() {
      this.name = ''
      this.department = {}
      this.color = ''
      this.$refs.addProjectForm.resetValidation()
    },
  },
}
</script>
