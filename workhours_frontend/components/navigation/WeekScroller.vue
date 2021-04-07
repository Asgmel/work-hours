<template>
  <v-row>
    <v-col
      cols="12"
      sm="8"
      md="8"
      lg="8"
      xl="10"
      class="indigo--text"
      order="2"
    >
      <h2>Week {{ getWeek }}</h2>
      <h2>{{ getFormattedStartDate }} - {{ getFormattedEndDate }}</h2>
    </v-col>
    <v-col
      cols="6"
      sm="2"
      md="2"
      lg="2"
      xl="1"
      order="3"
      order-sm="1"
      order-md="1"
      order-lg="1"
      order-xl="1"
      class="d-flex align-center"
    >
      <v-btn x-large text @click="subWeek">
        <v-icon class="indigo--text" size="40">mdi-arrow-left</v-icon>
      </v-btn>
    </v-col>
    <v-col
      cols="6"
      sm="2"
      md="2"
      lg="2"
      xl="1"
      order="4"
      class="d-flex justify-end align-center"
    >
      <v-btn x-large text @click="addWeek">
        <v-icon class="indigo--text" size="40">mdi-arrow-right</v-icon>
      </v-btn>
    </v-col>
  </v-row>
</template>

<script>
import { format } from 'date-fns'

export default {
  computed: {
    getFormattedStartDate() {
      return format(this.$store.getters['weeks/getStartDate'], 'dd/MM/yyyy')
    },
    getFormattedEndDate() {
      return format(this.$store.getters['weeks/getEndDate'], 'dd/MM/yyyy')
    },
    getWeek() {
      return this.$store.getters['weeks/getWeek']
    },
  },
  methods: {
    addWeek() {
      this.$store.dispatch('weeks/addWeek')
    },
    subWeek() {
      this.$store.dispatch('weeks/subWeek')
    },
  },
}
</script>

<style scoped>
h2 {
  text-align: center;
}
</style>
