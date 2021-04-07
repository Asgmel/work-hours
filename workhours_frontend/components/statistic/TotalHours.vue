<template>
  <v-card class="pa-4">
    <div class="d-flex mb-6">
      <h2 class="ml-2 indigo--text">Total Hours per Weekday</h2>
      <v-spacer></v-spacer>
      <v-switch
        v-model="bars"
        label="Show bars"
        color="indigo"
        class="ma-0 pt-2"
        hide-details=""
      ></v-switch>
      <v-tooltip bottom>
        <template #activator="{ on, attrs }">
          <v-icon class="ml-2 indigo--text" v-bind="attrs" v-on="on"
            >mdi-help-rhombus</v-icon
          >
        </template>
        <span>Shows the total hours you have logged per weekday</span>
      </v-tooltip>
    </div>
    <div class="d-flex">
      <div :class="`d-flex flex-column justify-space-between ${yPadding}`">
        <p class="indigo--text mb-0">{{ +Math.max(...value).toFixed(1) }}</p>
        <p class="indigo--text mb-0">
          {{ getY(0.66) }}
        </p>
        <p class="indigo--text mb-0">
          {{ getY(0.33) }}
        </p>
        <p class="indigo--text mb-0">{{ getY(0) }}</p>
      </div>
      <v-sparkline
        auto-draw
        :type="bars ? 'bar' : 'trend'"
        :value="value"
        :labels="labels"
        auto-line-width
        class="indigo--text"
        smooth="2"
        label-size="8"
        color="indigo"
        :height="bars ? 158 : 162"
        padding="20"
        stroke-linecap="round"
      >
      </v-sparkline>
    </div>
  </v-card>
</template>

<script>
import { getDay } from 'date-fns'

export default {
  data() {
    return {
      labels: [
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
        'Sunday',
      ],
      bars: false,
    }
  },
  computed: {
    value() {
      const hours = this.$store.getters['hours/getInterval']
      const days = [0, 0, 0, 0, 0, 0, 0]

      for (const hour of hours) {
        const startHours = parseInt(hour.start.substring(0, 2))
        const startMinutes = parseInt(hour.start.substring(3))
        const endHours = parseInt(hour.end.substring(0, 2))
        const endMinutes = parseInt(hour.end.substring(3))

        const minutes =
          endHours * 60 + endMinutes - startHours * 60 - startMinutes
        const totalHours = minutes / 60
        let day = getDay(new Date(hour.date))
        day = day === 0 ? 6 : day - 1
        days[day] += totalHours
      }
      return days
    },
    yPadding() {
      if (this.bars && this.$vuetify.breakpoint.smAndUp) {
        return 'pb-7'
      }
      if (this.bars && this.$vuetify.breakpoint.xs) {
        return 'pb-3'
      }
      if (this.$vuetify.breakpoint.xl || this.$vuetify.breakpoint.md) {
        return 'pt-11 pb-16'
      }
      if (this.$vuetify.breakpoint.lg || this.$vuetify.breakpoint.sm) {
        return 'pt-7 pb-11'
      }
      return 'pt-4 pb-7'
    },
  },
  methods: {
    getY(scale) {
      return this.bars
        ? +(Math.max(...this.value) * scale).toFixed(1)
        : +(
            (Math.max(...this.value) - Math.min(...this.value)) * scale +
            Math.min(...this.value)
          ).toFixed(1)
    },
  },
}
</script>
