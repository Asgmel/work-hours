<template>
  <v-form ref="addHourForm" v-model="valid">
    <v-container>
      <v-row>
        <v-col cols="12">
          <v-text-field
            v-model="description"
            :rules="descriptionRules"
            :counter="80"
            label="Work Description"
            required
          ></v-text-field>
        </v-col>

        <v-col cols="12">
          <v-select
            v-model="project"
            :rules="projectRules"
            :hint="projectHint"
            :items="projects"
            label="Project"
            persistent-hint
            :menu-props="{ offsetY: true }"
          ></v-select>
        </v-col>

        <v-col cols="6" sm="4">
          <v-text-field
            v-model="start"
            :rules="timeRules"
            label="Start"
            required
            prepend-icon="mdi-clock-time-eight-outline"
            type="time"
          ></v-text-field>
        </v-col>

        <v-col cols="6" sm="4">
          <v-text-field
            v-model="end"
            :rules="[...timeRules, endRule]"
            label="End"
            required
            prepend-icon="mdi-clock-time-four-outline"
            type="time"
          ></v-text-field>
        </v-col>

        <v-col cols="12" sm="4">
          <FormDatePicker
            label="Date"
            :date="date"
            icon="mdi-calendar-range"
            @set-date="setDate"
          />
        </v-col>
      </v-row>
    </v-container>
  </v-form>
</template>

<script>
import { format } from 'date-fns'

export default {
  data: () => ({
    projects: [],
    valid: false,
    id: null,
    description: '',
    project: {},
    start: '',
    end: '',
    date: format(new Date(), 'yyyy-MM-dd'),
    descriptionRules: [
      (v) => !!v || 'Description is required',
      (v) => v.length <= 80 || 'Description must be less than 80 characters',
    ],
    projectRules: [(v) => !!v.name || 'Project is required'],
    timeRules: [(v) => !!v || 'Time is required'],
  }),
  computed: {
    projectHint() {
      return this.project.department ? this.project.department.name : ''
    },
  },
  mounted() {
    this.formatProject()
    this.getActiveHour()
  },
  methods: {
    getActiveHour() {
      const hour = this.$store.getters['hours/getActive']

      if (Object.keys(hour).length > 0) {
        const project = this.$store.getters['projects/getAllObjects'][
          hour.project
        ]
        const department = this.$store.getters['departments/getAllObjects'][
          project.department
        ]

        this.id = hour._id
        this.description = hour.description
        this.project = {
          _id: hour.project,
          name: project.name,
          color: project.color,
          department,
        }
        this.start = hour.start
        this.end = hour.end
        this.date = hour.date
        this.$store.dispatch('hours/setActive', null)
      }
    },
    formatProject() {
      const departments = this.$store.getters['departments/getAllObjects']
      this.projects = this.$store.getters['projects/getAll'].map((project) => {
        return {
          text: project.name,
          value: {
            _id: project._id,
            name: project.name,
            department: departments[project.department],
            color: project.color,
          },
        }
      })
    },
    endRule(v) {
      return v > this.start || 'End must be after start.'
    },
    setDate(date) {
      this.date = date
    },
    submit(keepOpen) {
      if (this.$refs.addHourForm.validate()) {
        let action = 'hours/create'
        const dataObj = {
          description: this.description,
          project: this.project._id,
          start: this.start,
          end: this.end,
          date: this.date,
        }

        if (this.id) {
          action = 'hours/update'
          dataObj._id = this.id
        }

        this.$store
          .dispatch(action, dataObj)
          .then(() => {
            this.$store.dispatch(
              'snackbar/setSuccess',
              `Hour ${
                action.substring(6, 12) === 'update' ? 'Updated!' : 'Added!'
              }`
            )
          })
          .catch((err) => {
            this.$store.dispatch('snackbar/setError', err.message)
          })
        this.resetValidation()
        if (!keepOpen) {
          this.$store.dispatch('modals/setAddHour', false)
        }
      }
    },
    resetValidation() {
      this.description = ''
      this.project = {}
      this.start = ''
      this.end = ''
      this.$refs.addHourForm.resetValidation()
    },
  },
}
</script>
