<template>
  <div>
    <StatisticFilter />
    <div v-if="$vuetify.breakpoint.xs">
      <StatisticDropdown />
    </div>
    <v-row v-else>
      <v-col cols="12" lg="6" xl="6">
        <StatisticProject />
      </v-col>
      <v-col cols="12" lg="6" xl="6">
        <StatisticDepartment />
      </v-col>
      <v-col cols="12" lg="6" xl="6">
        <StatisticTotalHours />
      </v-col>
      <v-col cols="12" lg="6" xl="6">
        <StatisticTotalProjects />
      </v-col>
    </v-row>
  </div>
</template>

<script></script>
