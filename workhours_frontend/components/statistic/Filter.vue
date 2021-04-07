<template>
  <v-row class="mt-3">
    <v-col xs="12" sm="6" md="4" lg="3" xl="2">
      <div
        :class="`d-flex ${
          $vuetify.breakpoint.smAndUp ? 'justify-start' : 'justify-center'
        }`"
      >
        <div class="dateHolder mx-2">
          <FormDatePicker
            :outlined="true"
            :dense="true"
            :filled="true"
            :hide-details="true"
            label="Start"
            :date="start"
            @set-date="setStart"
          />
        </div>
        <div class="dateHolder mx-2">
          <FormDatePicker
            :outlined="true"
            :dense="true"
            :filled="true"
            :hide-details="true"
            label="End"
            :date="end"
            @set-date="setEnd"
          />
        </div>
      </div>
    </v-col>
    <v-col>
      <div
        :class="`d-flex buttonHolder align-center ${
          $vuetify.breakpoint.smAndUp ? 'justify-end' : 'justify-center'
        }`"
      >
        <v-btn
          depressed
          dark
          class="indigo mx-1"
          @click="filterDate(startOfWeek(new Date()))"
        >
          Week
        </v-btn>
        <v-btn
          depressed
          dark
          class="indigo mx-1"
          @click="filterDate(startOfMonth(new Date()))"
        >
          Month
        </v-btn>
        <v-btn
          depressed
          dark
          class="indigo mx-1"
          @click="filterDate(startOfYear(new Date()))"
        >
          Year
        </v-btn>
      </div>
    </v-col>
  </v-row>
</template>

<script>
import { format, startOfMonth, startOfWeek, startOfYear } from 'date-fns'
export default {
  data() {
    return {
      startOfWeek,
      startOfMonth,
      startOfYear,
    }
  },
  computed: {
    start() {
      return this.$store.getters['hours/getIntervalStart']
    },
    end() {
      return this.$store.getters['hours/getIntervalEnd']
    },
  },
  methods: {
    filterDate(start) {
      this.setStart(format(start, 'yyyy-MM-dd'))
      this.setEnd(format(new Date(), 'yyyy-MM-dd'))
    },
    setStart(v) {
      this.$store.dispatch('hours/setIntervalStart', v)
    },
    setEnd(v) {
      this.$store.dispatch('hours/setIntervalEnd', v)
    },
  },
}
</script>

<style scoped>
.dateHolder {
  width: 115px;
}
.buttonHolder {
  height: 40px;
}
</style>
