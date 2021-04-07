<template>
  <v-card
    tile
    class="hour px-6 py-3 d-flex"
    :style="`borderColor: ${colors[hour.project.color].base}`"
  >
    <v-row>
      <v-col cols="12" sm="6" lg="4" class="description">
        <p class="my-1">{{ hour.description }}</p>
      </v-col>
      <v-col
        v-if="!$vuetify.breakpoint.xs"
        cols="12"
        sm="6"
        lg="4"
        class="project"
      >
        <p :class="`${hour.project.color}--text my-1`">
          {{ `${hour.project.name} - ${hour.project.department.name}` }}
        </p>
      </v-col>
      <v-col cols="6" lg="2" class="time">
        <p class="my-1">{{ `${hour.start} - ${hour.end}` }}</p>
      </v-col>
      <v-col cols="6" lg="2" class="date">
        <p class="my-1">{{ formattedDate(hour.date) }}</p>
      </v-col>
    </v-row>
    <DisplayOverlayList
      ref="hourListOverlay"
      :item="hour"
      active-action="hours/setActive"
      delete-action="hours/delete"
      modal-action="modals/setAddHour"
    />
    <ControllerButtonEditDelete
      :item="hour"
      active-action="hours/setActive"
      delete-action="hours/delete"
      modal-action="modals/setAddHour"
      :column-edit="true"
    />
  </v-card>
</template>

<script>
import { parseISO, format } from 'date-fns'
import colors from 'vuetify/lib/util/colors'

export default {
  props: {
    hour: {
      type: Object,
      required: true,
    },
  },
  data() {
    return {
      colors,
    }
  },
  methods: {
    formattedDate(date) {
      return format(parseISO(date), 'dd/MM/yyyy')
    },
    openOverlay() {
      this.$refs.hourListOverlay.openOverlay()
    },
  },
}
</script>

<style scoped>
.hour {
  border-left: 10px solid;
}

@media only screen and (max-width: 599px) {
  .project {
    padding-top: 5px;
  }
}

@media only screen and (max-width: 1263px) {
  .description,
  .project {
    padding-bottom: 0;
  }
  .time,
  .date {
    padding-top: 5px;
  }
}
</style>
