<template>
  <v-card flat color="rgba(0, 0, 0, 0)">
    <v-row>
      <v-col cols="6">
        <p class="pa-2 ma-0 text--secondary">
          {{ findCurrentWeekday(hours[0].date) }}
        </p>
      </v-col>
      <v-col cols="6">
        <p class="pa-2 ma-0 text--secondary text-right">
          Total: {{ findTotal(hours) }}
        </p>
      </v-col>
    </v-row>
  </v-card>
</template>

<script>
import { getDay, parseISO } from 'date-fns'

export default {
  props: {
    hours: {
      type: Array,
      required: true,
    },
  },
  methods: {
    findCurrentWeekday(date) {
      const day = getDay(parseISO(date))
      const weekdays = [
        'Sunday',
        'Monday',
        'Tuesday',
        'Wednesday',
        'Thursday',
        'Friday',
        'Saturday',
      ]
      return weekdays[day]
    },
    findTotal(hoursArr) {
      let minutes = 0
      let hours = 0

      for (const hour of hoursArr) {
        const startHours = parseInt(hour.start.substring(0, 2))
        const startMinutes = parseInt(hour.start.substring(3))
        const endHours = parseInt(hour.end.substring(0, 2))
        const endMinutes = parseInt(hour.end.substring(3))

        minutes += endHours * 60 + endMinutes
        minutes -= startHours * 60 + startMinutes
      }

      hours = Math.floor(minutes / 60)
      minutes = minutes % 60

      return `${hours >= 10 ? hours : '0' + hours}:${
        minutes >= 10 ? minutes : '0' + minutes
      }`
    },
  },
}
</script>
