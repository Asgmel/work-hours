<template>
  <div class="d-flex flex-column align-center">
    <v-menu offset-y>
      <template #activator="{ on, attrs }">
        <v-btn
          color="indigo"
          width="254"
          class="my-3"
          dark
          v-bind="attrs"
          v-on="on"
        >
          Display
        </v-btn>
      </template>
      <v-list>
        <v-list-item
          v-for="(item, index) in items"
          :key="item.name"
          @click="selected = index"
        >
          <v-list-item-title>{{ item.name }}</v-list-item-title>
        </v-list-item>
      </v-list>
    </v-menu>
    <component :is="items[selected].component" />
  </div>
</template>

<script>
import Project from '@/components/statistic/Project'
import Department from '@/components/statistic/Department'
import TotalHours from '@/components/statistic/TotalHours'
import TotalProjects from '@/components/statistic/TotalProjects'

export default {
  data() {
    return {
      tab: 0,
      selected: 0,
      items: [
        { name: 'Projects', component: Project },
        { name: 'Departments', component: Department },
        { name: 'Hours Graph', component: TotalHours },
        { name: 'Actions Graph', component: TotalProjects },
      ],
    }
  },
}
</script>
