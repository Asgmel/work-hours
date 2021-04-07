<template>
  <v-card flat class="grey lighten-4 mt-6">
    <v-card-title class="indigo--text pl-0">Departments</v-card-title>
    <div v-if="getDepartments.length > 0">
      <v-card
        v-for="(department, index) in getDepartments"
        :key="department._id"
        tile
        class="d-flex"
        @click.native="departmentClick(index)"
      >
        <p class="pa-4 ma-0">
          {{ department.name }}
        </p>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <ControllerButtonEditDelete
            :item="department"
            active-action="departments/setActive"
            delete-action="departments/delete"
            modal-action="modals/setAddDepartment"
            :pre-delete="preDelete"
            :delete-warning="true"
            delete-warning-title="Warning"
            :delete-warning-text="`Deleting the department '${department.name}' will also delete all projects and hours that use this department. Are you sure you want to continue?`"
          />
          <DisplayOverlayList
            ref="departmentsListItem"
            :item="department"
            active-action="departments/setActive"
            delete-action="departments/delete"
            modal-action="modals/setAddDepartment"
            :pre-delete="preDelete"
            :delete-warning="true"
            delete-warning-title="Warning"
            :delete-warning-text="`Deleting the department '${department.name}' will also delete all projects and hours that use this department. Are you sure you want to continue?`"
          />
        </div>
      </v-card>
    </div>
    <div v-else>
      <h2 class="mt-5 text--disabled">No departments found.</h2>
    </div>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      clickCount: 0,
      clickIndex: null,
      clickTimer: null,
    }
  },
  computed: {
    getDepartments() {
      return this.$store.getters['departments/getAll']
    },
  },
  methods: {
    preDelete(department) {
      const projects = this.$store.getters['projects/getAll']

      projects.forEach((project) => {
        if (project.department === department._id) {
          const hours = this.$store.getters['hours/getAll']
          hours.forEach((hour) => {
            if (hour.project === project._id) {
              this.$store.dispatch('hours/delete', hour._id)
            }
          })
          this.$store.dispatch('projects/delete', project._id)
        }
      })
    },
    departmentClick(index) {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.clickCount = index === this.index ? this.clickCount + 1 : 1
        this.index = index

        if (this.clickCount === 1) {
          this.clickTimer = setTimeout(() => {
            this.clickCount = 0
            this.clickIndex = null
          }, 300)
        } else {
          this.$refs.departmentsListItem[index].openOverlay()
        }
      }
    },
  },
}
</script>
