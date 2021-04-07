<template>
  <v-card class="pa-4 projectCard">
    <div class="d-flex">
      <h2 class="ml-2 indigo--text">Total Per Project</h2>
      <v-spacer></v-spacer>
      <v-btn dark class="indigo--text" text>
        <v-icon>mdi-cloud-download</v-icon>
      </v-btn>
    </div>
    <v-data-table
      :headers="headers"
      :items="data"
      item-key="name"
      :items-per-page="5"
      :footer-props="footerProps"
      :height="$vuetify.breakpoint.xs ? '' : '288'"
    >
      <template #[`item.project`]="props">
        <p :class="`ma-0 ${props.item.color}--text`">
          {{ props.item.project }}
        </p>
      </template>
      <template #[`item.department`]="props">
        <p :class="`ma-0 ${props.item.color}--text`">
          {{ props.item.department }}
        </p>
      </template>
      <template #[`item.time`]="props">
        <p class="ma-0 pr-4 text-right">{{ props.item.time }}</p>
      </template>
      <template #[`footer.page-text`]="props">
        <p class="mb-0">
          {{
            `Projects ${props.pageStart} - ${props.pageStop} of ${props.itemsLength}`
          }}
        </p>
      </template>
    </v-data-table>
  </v-card>
</template>

<script>
export default {
  data() {
    return {
      headers: [
        { text: 'Project', value: 'project' },
        { text: 'Department', value: 'department' },
        { text: 'Time', value: 'time', align: 'right' },
      ],
      footerProps: {
        disableItemsPerPage: true,
      },
    }
  },
  computed: {
    data() {
      const departments = this.$store.getters['departments/getAllObjects']
      const projects = this.$store.getters['projects/getAll']
      const hours = this.$store.getters['hours/getInterval']
      const counter = {}

      for (const hour of hours) {
        const startHours = parseInt(hour.start.substring(0, 2))
        const startMinutes = parseInt(hour.start.substring(3))
        const endHours = parseInt(hour.end.substring(0, 2))
        const endMinutes = parseInt(hour.end.substring(3))

        if (counter[hour.project]) {
          counter[hour.project] +=
            endHours * 60 + endMinutes - startHours * 60 - startMinutes
        } else {
          counter[hour.project] =
            endHours * 60 + endMinutes - startHours * 60 - startMinutes
        }
      }
      return projects.map((project) => {
        const totalHours = counter[project._id]
          ? Math.floor(counter[project._id] / 60).toString()
          : '0'
        const totalMinutes = counter[project._id]
          ? (counter[project._id] % 60).toString()
          : '00'
        return {
          project: project.name,
          department: departments[project.department].name,
          color: project.color,
          time:
            totalMinutes.length > 1
              ? totalHours + ':' + totalMinutes
              : totalHours + ':0' + totalMinutes,
        }
      })
    },
  },
}
</script>

<style scoped>
.projectCard {
  min-height: 400px;
}
.projectCard >>> .v-data-footer__select {
  display: none;
}
.projectCard >>> .v-data-table__mobile-row {
  height: 30px;
  min-height: 30px;
}
</style>
