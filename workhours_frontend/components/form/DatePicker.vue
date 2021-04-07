<template>
  <v-menu offset-y>
    <template #activator="{ on }">
      <v-text-field
        v-model="inputDate"
        :rules="dateRules"
        :filled="filled"
        :label="label"
        :prepend-icon="icon"
        :outlined="outlined"
        :hide-details="hideDetails"
        :dense="dense"
        v-on="on"
      ></v-text-field>
    </template>
    <v-date-picker v-model="pickerDate"></v-date-picker>
  </v-menu>
</template>

<script>
import { format, parseISO } from 'date-fns'

const dateRegex = /^(?:(?:31(\/|-|\.)(?:0?[13578]|1[02]))\1|(?:(?:29|30)(\/|-|\.)(?:0?[13-9]|1[0-2])\2))(?:(?:1[6-9]|[2-9]\d)?\d{2})$|^(?:29(\/|-|\.)0?2\3(?:(?:(?:1[6-9]|[2-9]\d)?(?:0[48]|[2468][048]|[13579][26])|(?:(?:16|[2468][048]|[3579][26])00))))$|^(?:0?[1-9]|1\d|2[0-8])(\/|-|\.)(?:(?:0?[1-9])|(?:1[0-2]))\4(?:(?:1[6-9]|[2-9]\d)?\d{2})$/

export default {
  props: {
    date: {
      type: String,
      default: () => format(new Date(), 'yyyy-MM-dd'),
    },
    label: {
      type: String,
      required: true,
    },
    outlined: {
      type: Boolean,
      default: false,
    },
    dense: {
      type: Boolean,
      default: false,
    },
    filled: {
      type: Boolean,
      default: false,
    },
    hideDetails: {
      type: Boolean,
      default: false,
    },
    icon: {
      type: String,
      default: '',
    },
  },
  data() {
    return {
      dateRules: [
        (v) => !!v || `${this.label} is required`,
        (v) =>
          (dateRegex.test(v) && v.length === 10) ||
          'Invalid date format. Should be dd/mm/yyyy',
      ],
    }
  },
  computed: {
    pickerDate: {
      get() {
        return this.date
      },
      set(v) {
        this.$emit('set-date', v)
      },
    },
    inputDate: {
      get() {
        return this.date ? format(parseISO(this.date), 'dd/MM/yyyy') : null
      },
      set(v) {
        if (dateRegex.test(v) && v.length === 10) {
          const day = v.substring(0, 2)
          const month = v.substring(3, 5)
          const year = v.substring(6, 10)
          this.$emit('set-date', `${year}-${month}-${day}`)
        }
      },
    },
  },
}
</script>
