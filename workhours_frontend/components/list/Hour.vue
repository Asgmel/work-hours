<template>
  <div v-if="getHours.length > 0">
    <div v-for="hours in getHours" :key="hours[0].date" class="mb-10">
      <ListHourHeader :hours="hours" />
      <ListHourItem
        v-for="(hour, index) in hours"
        :ref="`hourListItem${hours[0].date}`"
        :key="hour.id"
        :hour="hour"
        @click.native="hourClick(index, hours[0].date)"
      />
    </div>
  </div>
  <div v-else>
    <h1 class="mt-5 text--disabled text-center">
      No work hours added for this week
    </h1>
  </div>
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
    getHours() {
      const departments = this.$store.getters['departments/getAllObjects']
      const projects = this.$store.getters['projects/getAllObjects']
      let hours = this.$store.getters['hours/getWeek']

      hours = hours.map((hour) => {
        const project = projects[hour.project]
        const department = departments[project.department]
        return {
          _id: hour._id,
          description: hour.description,
          project: {
            name: project.name,
            color: project.color,
            department,
          },
          start: hour.start,
          end: hour.end,
          date: hour.date,
        }
      })

      hours = this.sortHours(hours)
      hours = this.splitDays(hours)
      return hours
    },
  },
  methods: {
    hourClick(index, date) {
      if (this.$vuetify.breakpoint.smAndDown) {
        this.clickCount = index === this.index ? this.clickCount + 1 : 1
        this.index = index

        if (this.clickCount === 1) {
          this.clickTimer = setTimeout(() => {
            this.clickCount = 0
            this.clickIndex = null
          }, 300)
        } else {
          this.$refs[`hourListItem${date}`][index].openOverlay()
        }
      }
    },
    sortHours(hours) {
      return hours.sort((a, b) => {
        if (new Date(a.date) > new Date(b.date)) {
          return 1 // sort by date
        }
        if (new Date(a.date) < new Date(b.date)) {
          return -1
        }
        if (a.start < b.start) {
          return -1 // sort by start time
        }
        if (a.start > b.start) {
          return 1
        }
        if (a.end < b.end) {
          return -1 // sort by end time
        }
        if (a.end > b.end) {
          return 1
        }
        return 0
      })
    },
    splitDays(hours) {
      const splitHours = []

      let compareDate = null
      let counter = -1

      hours.forEach((hour) => {
        if (hour.date !== compareDate) {
          counter++
          compareDate = hour.date
          splitHours[counter] = [hour]
        } else {
          splitHours[counter].push(hour)
        }
      })

      return splitHours
    },
  },
}
</script>

<style scoped></style>
