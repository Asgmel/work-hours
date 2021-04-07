<template>
  <div v-if="$vuetify.breakpoint.smAndUp" class="d-flex">
    <v-tooltip v-for="button in buttons" :key="button.text" bottom>
      <template #activator="{ on, attrs }">
        <v-btn
          large
          text
          color="indigo"
          v-bind="attrs"
          v-on="on"
          @click="button.click"
        >
          <v-icon size="30">{{ button.icon }}</v-icon>
        </v-btn>
      </template>
      <span>{{ button.text }}</span>
    </v-tooltip>
  </div>
  <div v-else>
    <v-menu bottom left>
      <template #activator="{ on, attrs }">
        <v-btn small text fab color="indigo" v-bind="attrs" v-on="on">
          <v-icon size="30">mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="button in buttons"
          :key="button.text"
          @click="button.click"
        >
          <v-list-item-icon>
            <v-icon>{{ button.icon }}</v-icon>
          </v-list-item-icon>
          <v-list-item-content>
            <v-list-item-title>{{ button.text }}</v-list-item-title>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-menu>
  </div>
</template>

<script>
export default {
  data() {
    return {
      buttons: [
        {
          text: 'Add Hour',
          icon: 'mdi-clock',
          click: () => {
            this.$store.dispatch('modals/setAddHour', true)
          },
        },
        {
          text: 'Add Project',
          icon: 'mdi-folder',
          click: () => {
            this.$store.dispatch('modals/setAddProject', true)
          },
        },
        {
          text: 'Add Department',
          icon: 'mdi-city',
          click: () => {
            this.$store.dispatch('modals/setAddDepartment', true)
          },
        },
      ],
    }
  },
}
</script>
