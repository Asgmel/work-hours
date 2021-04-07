<template>
  <v-card class="pa-4 departmentCard">
    <div class="d-flex">
      <h2 class="ml-2 indigo--text">Total Per Department</h2>
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
      <template #[`item.time`]="props">
        <p class="ma-0 pr-4 text-right">{{ props.item.time }}</p>
      </template>
      <template #[`footer.page-text`]="props">
        <p class="mb-0">
          {{
            `Departments ${props.pageStart} - ${props.pageStop} of ${props.itemsLength}`
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
      const departments = this.$store.getters['departments/getAll']
      const projects = this.$store.getters['projects/getAllObjects']
      const hours = this.$store.getters['hours/getInterval']
      const counter = {}

      for (const hour of hours) {
        const startHours = parseInt(hour.start.substring(0, 2))
        const startMinutes = parseInt(hour.start.substring(3))
        const endHours = parseInt(hour.end.substring(0, 2))
        const endMinutes = parseInt(hour.end.substring(3))

        if (counter[projects[hour.project].department]) {
          counter[projects[hour.project].department] +=
            endHours * 60 + endMinutes - startHours * 60 - startMinutes
        } else {
          counter[projects[hour.project].department] =
            endHours * 60 + endMinutes - startHours * 60 - startMinutes
        }
      }
      return departments.map((department) => {
        const totalHours = counter[department._id]
          ? Math.floor(counter[department._id] / 60).toString()
          : '0'
        const totalMinutes = counter[department._id]
          ? (counter[department._id] % 60).toString()
          : '00'
        return {
          department: department.name,
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
.departmentCard {
  min-height: 400px;
}
.departmentCard >>> .v-data-footer__select {
  display: none;
}
.departmentCard >>> .v-data-table__mobile-row {
  height: 30px;
  min-height: 30px;
}
</style>
