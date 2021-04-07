<template>
  <v-card flat class="grey lighten-4 mt-6">
    <v-card-title class="indigo--text pl-0">Projects</v-card-title>
    <div v-if="getProjects.length > 0">
      <v-card
        v-for="(project, index) in getProjects"
        :key="project._id"
        tile
        class="d-flex"
        @click.native="projectClick(index)"
      >
        <p :class="`pa-4 ma-0 ${project.color}--text`">
          {{ `${project.name} - ${project.department.name}` }}
        </p>
        <v-spacer></v-spacer>
        <div class="d-flex align-center">
          <ControllerButtonEditDelete
            :item="project"
            active-action="projects/setActive"
            delete-action="projects/delete"
            modal-action="modals/setAddProject"
            :pre-delete="preDelete"
            :delete-warning="true"
            delete-warning-title="Warning"
            :delete-warning-text="`Deleting the project '${project.name}' will also delete all hours that use this project. Are you sure you want to continue?`"
          />
          <DisplayOverlayList
            ref="projectListItem"
            :item="project"
            active-action="projects/setActive"
            delete-action="projects/delete"
            modal-action="modals/setAddProject"
            :pre-delete="preDelete"
            :delete-warning="true"
            delete-warning-title="Warning"
            :delete-warning-text="`Deleting the project '${project.name}' will also delete all hours that use this project. Are you sure you want to continue?`"
          />
        </div>
      </v-card>
    </div>
    <div v-else>
      <h2 class="mt-5 text--disabled">No projects found.</h2>
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
    getProjects() {
      const departments = this.$store.getters['departments/getAllObjects']
      return this.$store.getters['projects/getAll'].map((project) => {
        return {
          _id: project._id,
          name: project.name,
          color: project.color,
          department: departments[project.department],
        }
      })
    },
  },
  methods: {
    preDelete(project) {
      const hours = this.$store.getters['hours/getAll']
      hours.forEach((hour) => {
        if (hour.project === project._id) {
          this.$store.dispatch('hours/delete', hour._id)
        }
      })
    },
    projectClick(index) {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.clickCount = index === this.index ? this.clickCount + 1 : 1
        this.index = index

        if (this.clickCount === 1) {
          this.clickTimer = setTimeout(() => {
            this.clickCount = 0
            this.clickIndex = null
          }, 300)
        } else {
          this.$refs.projectListItem[index].openOverlay()
        }
      }
    },
  },
}
</script>
